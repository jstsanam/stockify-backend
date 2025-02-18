import { TransactionStatus, TransactionType } from "../constants/enums.js";
import {
  UserProfileDTO,
  UserWatchlistDTO,
  UserTransactionsDTO,
} from "../dtos/res/userDTO.js";
import { UserModel } from "../models/userModel.js";

export const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error(`No user found with email: ${email}`);
  }
  return user;
};

export const createUser = async (
  name,
  email,
  gender,
  password,
  current_balance
) => {
  try {
    const newUser = await UserModel.create({
      name,
      email,
      gender,
      password,
      current_balance,
    });
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: ", error);
  }
};

export const getUserProfile = async (userEmail) => {
  const user = await getUserByEmail(userEmail);
  return new UserProfileDTO(user);
};

export const updateUserProfile = async (userEmail, userData) => {
  try {
    const updateFields = {};
    if (userData.name) updateFields.name = userData.name;
    if (userData.email) updateFields.email = userData.email;
    if (userData.gender) updateFields.gender = userData.gender;
    if (userData.current_balance)
      updateFields.current_balance = userData.current_balance;

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userEmail },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) throw new Error("User not found!");
    return new UserProfileDTO(updatedUser);
  } catch (error) {
    throw new Error("Error updating user profile!");
  }
};

export const getUserWatchlist = async (userEmail) => {
  const user = await getUserByEmail(userEmail);
  return new UserWatchlistDTO(user);
};

export const addStockToUserWatchlist = async (userEmail, stockData) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userEmail },
      [
        {
          $set: {
            watchlist: {
              $concatArrays: [
                "$watchlist",
                {
                  $cond: {
                    if: {
                      $not: {
                        $in: [stockData.stock_name, "$watchlist.stock_name"],
                      },
                    },
                    then: [stockData],
                    else: [],
                  },
                },
              ],
            },
          },
        },
      ],
      { new: true, runValidators: true }
    );

    if (!updatedUser) throw new Error("User not found!");
    return updatedUser.watchlist;
  } catch (error) {
    throw new Error("Error adding stock to user watchlist!");
  }
};

export const removeStockFromUserWatchlist = async (userEmail, stockData) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userEmail },
      {
        $pull: {
          watchlist: { stock_name: stockData.stock_name },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) throw new Error("User not found!");
    return updatedUser.watchlist;
  } catch (error) {
    throw new Error("Error removing stock from user watchlist!");
  }
};

export const getUserTransactions = async (userEmail) => {
  const user = await getUserByEmail(userEmail);
  return new UserTransactionsDTO(user);
};

export const addUserTransaction = async (userEmail, transactionData) => {
  const requiredFields = [
    "stock_id",
    "stock_name",
    "stock_quantity",
    "timestamp",
    "transaction_price",
    "type",
    "status",
  ];

  for (let field of requiredFields) {
    if (!transactionData[field]) {
      throw new Error(`${field} is not provided in the transaction!`);
    }
  }

  if (!Object.values(TransactionType).includes(transactionData.type)) {
    throw new Error(
      "Type field is not correct! It should be either 'Buy' or 'Sell'!"
    );
  }

  if (!Object.values(TransactionStatus).includes(transactionData.status)) {
    throw new Error(
      "Status field is not correct! It should be either 'Passed' or 'Failed'!"
    );
  }

  if (transactionData.stock_quantity <= 0) {
    throw new Error("Stock quantity should be more than or equal to 1!");
  }

  try {
    const user = await getUserByEmail(userEmail);
    const stockIndex = user.stockHoldings.findIndex(
      (stock) => stock.stock_id === transactionData.stock_id
    );

    if (transactionData.type === TransactionType.SELL && stockIndex === -1) {
      throw new Error(
        `Invalid transaction: You cannot sell "${transactionData.stock_name}" as you never bought it!`
      );
    }

    if (transactionData.status !== TransactionStatus.FAILED) {
      if (transactionData.type === TransactionType.BUY) {
        if (stockIndex !== -1) {
          await UserModel.findOneAndUpdate(
            {
              email: userEmail,
              "stockHoldings.stock_id": transactionData.stock_id,
            },
            {
              $inc: {
                "stockHoldings.$.quantity": transactionData.stock_quantity,
              },
            }
          );
        } else {
          await UserModel.findOneAndUpdate(
            { email: userEmail },
            {
              $push: {
                stockHoldings: {
                  stock_id: transactionData.stock_id,
                  stock_name: transactionData.stock_name,
                  quantity: transactionData.stock_quantity,
                },
              },
            }
          );
        }
      } else if (
        transactionData.type === TransactionType.SELL &&
        stockIndex !== -1
      ) {
        const stockHolding = user.stockHoldings[stockIndex];

        if (stockHolding.quantity < Number(transactionData.stock_quantity)) {
          throw new Error(
            `Insufficient quantity: You have ${stockHolding.quantity} stocks 
            but tried to sell ${transactionData.stock_quantity}!.`
          );
        }

        if (stockHolding.quantity === Number(transactionData.stock_quantity)) {
          await UserModel.findOneAndUpdate(
            {
              email: userEmail,
            },
            {
              $pull: {
                stockHoldings: { stock_id: transactionData.stock_id },
              },
            }
          );
        } else {
          await UserModel.updateOne(
            {
              email: userEmail,
              "stockHoldings.stock_id": transactionData.stock_id,
            },
            {
              $inc: {
                "stockHoldings.$.quantity": -transactionData.stock_quantity,
              },
            }
          );
        }
      }
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userEmail },
      {
        $push: { transactions: transactionData },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) throw new Error("User not found!");
    return new UserTransactionsDTO(updatedUser);
  } catch (error) {
    throw new Error("Error in making transaction!");
  }
};

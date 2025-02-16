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

    const updatedUserProfile = await UserModel.findOneAndUpdate(
      { email: userEmail },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUserProfile) throw new Error("User not found!");
    return new UserProfileDTO(updatedUserProfile);
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

export const getUserTransactions = async (email) => {
  const user = await getUserByEmail(email);
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
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userEmail },
      {
        $push: { transactions: transactionData },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) throw new Error("User not found!");
    return updatedUser.transactions;
  } catch (error) {
    throw new Error("Error in making transaction!");
  }
};

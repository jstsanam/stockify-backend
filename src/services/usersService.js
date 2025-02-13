import { UserProfileDTO, UserWatchlistDTO } from "../dtos/res/userDTO.js";
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
    throw new Error("Error creating user!");
  }
};

export const getUserProfile = async (email) => {
  const user = await getUserByEmail(email);
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

export const getUserWatchlist = async (email) => {
  const user = await getUserByEmail(email);
  return new UserWatchlistDTO(user);
};

export const addStockToUserWatchlist = async (userEmail, watchlistData) => {
  try {
    const updatedUserWatchlist = await UserModel.findOneAndUpdate(
      { email: userEmail },
      [
        {
          $set: {
            watchlist: {
              $concatArrays: [
                "$watchlist",
                {
                  $filter: {
                    input: watchlistData.watchlist,
                    as: "newStock",
                    cond: {
                      $not: {
                        $in: ["$$newStock.stock_name", "$watchlist.stock_name"],
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      ],
      { new: true, runValidators: true }
    );

    if (!updatedUserWatchlist) throw new Error("User not found!");
    return new UserWatchlistDTO(updatedUserWatchlist);
  } catch (error) {
    throw new Error("Error adding stock to user watchlist!");
  }
};

export const removeStockFromUserWatchlist = async (
  userEmail,
  watchlistData
) => {
  try {
    const updatedUserWatchlist = await UserModel.findOneAndUpdate(
      { email: userEmail },
      {
        $pull: {
          watchlist: {
            stock_name: {
              $in: watchlistData.watchlist.map((stock) => stock.stock_name),
            },
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUserWatchlist) throw new Error("User not found!");
    return new UserWatchlistDTO(updatedUserWatchlist);
  } catch (error) {
    throw new Error("Error removing stock from user watchlist!");
  }
};

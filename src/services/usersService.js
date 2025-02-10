import { UserProfileDTO } from "../dtos/res/userDTO.js";
import { UserModel } from "../models/userModel.js";

export const getUserDTOByEmail = async (email) => {
  const user = await getUserByEmail(email);
  return new UserProfileDTO(user);
};

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
    throw new Error("User already exists!");
  }
};

export const updateUser = async (userEmail, userData) => {
  try {
    const updateFields = {};
    if (userData.name) updateFields.name = userData.name;
    if (userData.email) updateFields.email = userData.email;
    if (userData.gender) updateFields.gender = userData.gender;

    if (Object.keys(updateFields).length < 3) {
      throw new Error("No valid fields provided to be updated.");
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userEmail },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) throw new Error("User not found!");
    return new UserProfileDTO(updatedUser);
  } catch (error) {
    throw new Error("Error updating user data!");
  }
};

import { UserDTO } from "../dtos/res/userDTO.js";
import { UserModel } from "../models/userModel.js";

export const getUserDTOByEmail = async (email) => {
  const user = await getUserByEmail(email);
  return new UserDTO(user);
}

export const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error(`No user found with email: ${email}`);
  }
  return user;
}

export const createUser = async (name, email, password, current_balance) => {
  try {
    const newUser = await UserModel.create({
      name,
      email,
      password,
      current_balance,
    });

    return newUser;
  } catch (error) {
    throw new Error("User already exists!");
  }
}

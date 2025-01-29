import { UserModel } from "../models/userModel.js";

// Service to get all users
export const getUsersService = async () => {
  try {
    const users = await UserModel.find();
    return { users };
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

// Service to sign up a new user
export const userSignUpService = async (userData) => {
  const { name, email, password, currentBalance } = userData;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists!");
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
      currentBalance,
    });

    return { newUser };
  } catch (error) {
    throw new Error(error.message || "Failed to create user");
  }
};

// Service to sign in an existing user
export const userSignInService = async (userData) => {
  const { email, password } = userData;

  try {
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      throw new Error("Incorrect email or password!");
    }

    return { message: "User logged in successfully!" };
  } catch (error) {
    throw new Error(error.message || "Failed to sign user in");
  }
};

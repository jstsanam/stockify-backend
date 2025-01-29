import { createUser, getUserByEmail } from "./usersService.js";
import { generateToken } from "../utils/jwtUtil.js";
import { compareData, hashData } from "../utils/hashUtil.js";

// Service to sign up a new user
export const userSignup = async (userData) => {
  const { name, email, password, current_balance } = userData;
  const hashedPassword = await hashData(password);
  const newUser = await createUser(name, email, hashedPassword, current_balance);
  return generateToken(newUser);
};

// Service to sign in an existing user
export const userSignin = async (userData) => {
  const { email, password } = userData;

  try {
    const user = await getUserByEmail(email);

    if (await compareData(password, user.password)) {
      return generateToken(user);
    } else {
      throw new Error("Incorrect user email or password!");
    }
  } catch (error) {
    throw new Error("Incorrect user email or password!");
  }
};

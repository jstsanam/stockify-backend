import {
  userSignup,
  userSignin,
} from "../services/authService.js";

// Controller to sign up a new user
export const signupController = async (req, res) => {
  const userData = req.body;

  try {
    const token = await userSignup(userData);
    res
      .status(201)
      .json({ message: "User created successfully!", token: token });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

// Controller to sign in an existing user
export const signinController = async (req, res) => {
  const userData = req.body;

  try {
    const token = await userSignin(userData);
    res
      .status(201)
      .json({ message: "User logged in successfully!", token: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

import {
  getUsersService,
  userSignUpService,
  userSignInService,
} from "../services/usersService.js";

// Controller to get all users
export const getUsersController = async (req, res) => {
  try {
    const { users } = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to sign up a new user
export const userSignUpController = async (req, res) => {
  const userData = req.body;

  try {
    const { newUser } = await userSignUpService(userData);
    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

// Controller to sign in an existing user
export const userSignInController = async (req, res) => {
  const userData = req.body;

  try {
    const { message } = await userSignInService(userData);
    res.status(200).json({ message });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

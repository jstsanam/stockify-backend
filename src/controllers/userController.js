import { getUserDTOByEmail, updateUser } from "../services/usersService.js";

export const getUserController = async (req, res) => {
    try {
      if (!req.userEmail) {
        return res.status(400).json({ error: "User data not found." });
      }
      const user = await getUserDTOByEmail(req.userEmail);
      return res.status(200).json({ user: user });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error." });
    }
};

export const putUserController = async (req, res) => {
  try {
    if (!req.userEmail) {
      return res.status(400).json({ error: "User data not found." });
    }
    const user = await updateUser(req.userEmail, req.body);
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
import * as userServices from "../services/usersService.js";

export const getUserProfileController = async (req, res) => {
  try {
    if (!req.userEmail) {
      return res.status(400).json({ error: "User data not found." });
    }
    const userProfile = await userServices.getUserProfile(req.userEmail);
    return res
      .status(200)
      .json({ message: "User profile fetched successfully", userProfile });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const updateUserProfileController = async (req, res) => {
  try {
    if (!req.userEmail) {
      return res.status(400).json({ error: "User data not found." });
    }
    const userProfile = await userServices.updateUserProfile(
      req.userEmail,
      req.body
    );
    return res
      .status(200)
      .json({ message: "User profile updated successfully", userProfile });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const getUserWatchlistController = async (req, res) => {
  try {
    if (!req.userEmail) {
      return res.status(400).json({ error: "User data not found." });
    }
    const userWatchlist = await userServices.getUserWatchlist(req.userEmail);
    return res
      .status(200)
      .json({ message: "User watchlist fetched successfully", userWatchlist });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const addStockToUserWatchlistController = async (req, res) => {
  try {
    if (!req.userEmail) {
      return res.status(400).json({ error: "User data not found." });
    }
    const userWatchlist = await userServices.addStockToUserWatchlist(
      req.userEmail,
      req.body
    );
    return res.status(200).json({
      message: "Stock added to user watchlist successfully",
      userWatchlist,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const removeStockFromUserWatchlistController = async (req, res) => {
  try {
    if (!req.userEmail) {
      return res.status(400).json({ error: "User data not found." });
    }
    const userWatchlist = await userServices.removeStockFromUserWatchlist(
      req.userEmail,
      req.body
    );
    return res.status(200).json({
      message: "Stock removed from user watchlist successfully",
      userWatchlist,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const getUserTransactionsController = async (req, res) => {
  try {
    if (!req.userEmail) {
      return res.status(400).json({ error: "User data not found." });
    }
    const userData = await userServices.getUserTransactions(
      req.userEmail
    );
    return res.status(200).json({
      message: "User transactions fetched successfully",
      userData,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const addUserTransactionController = async (req, res) => {
  try {
    if (!req.userEmail) {
      return res.status(400).json({ error: "User data not found." });
    }
    const userData = await userServices.addUserTransaction(
      req.userEmail,
      req.body
    );
    return res.status(200).json({
      message: "User transaction done successfully",
      userData
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
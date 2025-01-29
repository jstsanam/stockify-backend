import bcrypt from "bcrypt";

// Number of salt rounds
const SALT_ROUNDS = 10;

/**
 * Hashes the given data using bcrypt.
 * @param {string} data - The data (e.g., password) to encrypt.
 * @returns {Promise<string>} - The hashed data.
 */
export const hashData = async (data) => {
  if (!data) {
    throw new Error("Data is required for encryption.");
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(data, salt);
};

/**
 * Compares the given data with an encrypted hash.
 * @param {string} data - The raw data (e.g., password).
 * @param {string} encryptedData - The hashed data to compare against.
 * @returns {Promise<boolean>} - True if matches, false otherwise.
 */
export const compareData = async (data, encryptedData) => {
  if (!data || !encryptedData) {
    throw new Error("Both data and encryptedData are required for comparison.");
  }

  return bcrypt.compare(data, encryptedData);
};

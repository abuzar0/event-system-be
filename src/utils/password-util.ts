import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  try {
    if (password) {
      return await bcrypt.hash(password, saltRounds);
    }
  } catch (error) {
    throw new Error("undefined Password");
  }
};
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
      return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
      throw new Error('Error verifying password');
  }
};



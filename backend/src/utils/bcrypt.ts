import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
@param password
@returns
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 
  @param password
  @param hash 
  @returns
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

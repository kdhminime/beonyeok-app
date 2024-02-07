
/**
 * Interface for the sign up parameters
 */
interface SignUpInputModel {
  username: string;
  password: string;
  email: string;
};

/**
 * Interface for the sign up response
 */
interface SignUpOutputModel {
  isSignUpComplete: boolean;
  userId: string | undefined;
  nextStep: string | undefined;};

export { SignUpInputModel, SignUpOutputModel };
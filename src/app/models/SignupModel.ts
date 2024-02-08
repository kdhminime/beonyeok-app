import {
  type SignUpOutput,
  type SignInInput,
  type SignUpInput,
  type SignInOutput,
  type SignOutInput,
} from 'aws-amplify/auth';

/**
 * Interface for the sign up parameters
 */
export interface SignUpInputModel extends SignUpInput {
  email: string;
}

/**
 * Interface for the sign up response
 */
export interface SignUpOutputModel extends SignUpOutput {}

/**
 * Interface for the sign in parameters
 */
export interface SignInInputModel extends SignInInput {}

/**
 * Interface for the sign in response
 */
export interface SignInOutputModel extends SignInOutput {}

export interface signUpOutputModel extends SignOutInput {}

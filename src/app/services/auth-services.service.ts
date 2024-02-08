// Import the necessary modules
import { Injectable } from '@angular/core';

// Import Amplify modules
import { signUp, type SignUpOutput } from 'aws-amplify/auth';
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';
import { autoSignIn } from 'aws-amplify/auth';
import { signIn } from 'aws-amplify/auth';
import { signOut } from 'aws-amplify/auth';

// Import models
import {
  SignUpInputModel,
  SignUpOutputModel,
  SignInInputModel,
  SignInOutputModel,
} from '../models/SignupModel';

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  constructor() {}

  /**
   * @param signUpInfo the sign up information
   * @returns a promise of the sign up result
   */
  public async handleSignUp(
    signUpInput: SignUpInputModel
  ): Promise<SignUpOutput | null> {
    {
      try {
        const SignUpOutput: SignUpOutputModel = await signUp({
          username: signUpInput.username,
          password: signUpInput.password,
          options: {
            userAttributes: {
              email: signUpInput.email,
            },
            // optional
            autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
          },
        });
        console.log(
          'sign up complete: userId:',
          SignUpOutput.userId,
          'next step:',
          SignUpOutput.nextStep
        );
        return SignUpOutput;
      } catch (error) {
        console.log('error signing up:', error);
        return null;
      }
    }
  }

  /**
   * @param username the username of the user
   * @param confirmationCode the confirmation code sent to the user
   */
  async handleSignUpConfirmation({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  async handleAutoSignIn(): Promise<void> {
    try {
      const signInOutput = await autoSignIn();
      // handle sign-in steps
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Sign in the user
   * @param username the username of the user
   * @param password the password of the user
   * @returns a promise of the sign in result
   */
  async handleSignIn({
    username,
    password,
  }: SignInInputModel): Promise<SignInOutputModel | null> {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      return { isSignedIn, nextStep };
    } catch (error) {
      console.log('error signing in', error);
      return null;
    }
  }
  /**
   * Sign out the user
   */
  async handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}

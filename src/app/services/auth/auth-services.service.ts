// Import the necessary modules
import { Injectable } from '@angular/core';

// Import Amplify modules
import { signUp, type SignUpOutput } from 'aws-amplify/auth';
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';
import { autoSignIn } from 'aws-amplify/auth';
import { signIn } from 'aws-amplify/auth';
import { signOut } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';

// Import models
import {
  SignUpInputModel,
  SignUpOutputModel,
  SignInInputModel,
  SignInOutputModel,
} from '../../models/SignupModel';

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  constructor() {}
  
  public email: string = '';

  /**
   * @param signUpInfo the sign up information
   * @returns a promise of the sign up result
   */
  public async handleSignUp(
    signUpInput: SignUpInputModel
  ): Promise<SignUpOutput> {
    {
      let signUpOutput: SignUpOutputModel = {} as SignUpOutputModel;
      try {
        signUpOutput = await signUp(signUpInput);
        console.log(
          'sign up complete: userId:',
          signUpOutput.userId,
          'next step:',
          signUpOutput.nextStep
        );
      } catch (error) {
        console.log('error signing up:', error);
      } finally {
      }
      return signUpOutput;
    }
  }

  /**
   * @param username the username of the user
   * @param confirmationCode the confirmation code sent to the user
   */
  async handleSignUpConfirmation({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) : Promise<boolean> {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });
      // handle sign-up confirmation steps
      console.log('sign up complete:', isSignUpComplete, 'next step:', nextStep);
      return isSignUpComplete;
    } catch (error) {
      console.log('error confirming sign up', error);
      return false;
    }
  }

  async handleAutoSignIn(): Promise<void> {
    try {
      const signInOutput = await autoSignIn();
      console.log('auto sign in complete:', signInOutput);
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
      await this.handleSignOut();
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

  /**
   * Get the current user
   * @returns a promise of the boolean value of the user's sign in status
   */
  async isSignedIn() : Promise<boolean> {
    try {
      const user = await getCurrentUser();
      console.log('current user:', user);
      return true;
    } catch (error) {
      console.log('error getting current user:', error);
      return false;
    }
  }
  
}

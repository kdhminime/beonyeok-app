import { Injectable } from '@angular/core';
import { signUp } from 'aws-amplify/auth';
import { SignUpInputModel, SignUpOutputModel } from '../models/SignupModel';
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  constructor() {}

  /**
   *
   * @param signUpInfo the sign up information
   */
  async signUp({
    username,
    password,
    email,
  }: SignUpInputModel): Promise<boolean> {
    {
      try {
        const { isSignUpComplete, userId, nextStep } = await signUp({
          username,
          password,
          options: {
            userAttributes: {
              email,
            },
            // optional
            autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
          },
        });
        return isSignUpComplete;
      } catch (error) {
        console.log('error signing up:', error);
        return false;
      }
    }
  }
}

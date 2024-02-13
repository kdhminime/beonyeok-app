import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

// Import services
import { AuthServicesService } from '../../services/auth/auth-services.service';
import { DialogService } from '../../services/dialog/dialog.service';

// Import components
import { LogoImageComponent } from '../logo-image/logo-image.component';
import { LoaderComponent } from '../loader/loader.component';

// Import models
import { SignUpInputModel, SignUpOutputModel } from '../../models/SignupModel';

// Import constants
import { dialogNames } from '../../constants/dialog-names';

@Component({
  selector: 'app-sign-up-dialog',
  standalone: true,
  imports: [LogoImageComponent, FormsModule, LoaderComponent],
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        })
      ),
      transition('in => out', animate('500ms ease-out')),
    ]),
    trigger('shrinkHeight', [
      state(
        'out',
        style({
          height: '628px',
        })
      ),
      state(
        'shrinked',
        style({
          height: '458px',
        })
      ),
      transition('out => shrinked', animate('500ms ease-out')),
    ]),
  ],
})
export class SignUpDialogComponent {

  // authentication variables
  public email: string = '';
  public password: string = '';

  // animation variables
  public animationState: string = 'in';
  public containerAnimationState: string = 'out';

  constructor(
    private authServiceHelper: AuthServicesService,
    private DialogService: DialogService
  ) {}

  /**
   * handle the sign up process
   * @returns void
   */
  public async signUp(): Promise<void> {
    // build the sign up input
    const signUpInput: SignUpInputModel = {
      username: this.email,
      password: this.password,
      options:{
        userAttributes:{
          email: this.email
        },
        autoSignIn: true
      }
    };

    try{
      // call the sign up helper
      const response: SignUpOutputModel | null =
        await this.authServiceHelper.handleSignUp(signUpInput);
        
        // if the sign up is complete, close the dialog and open the confirmation dialog
        if (response.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        this.animationState = 'out';
        this.authServiceHelper.email = this.email;
        this.closeDialog();
      }
    }
    catch(error){
      console.log('error signing up:', error);
    }
  }

  /**
   * close the current dialog
   * @returns void
   */
  private async closeDialog(): Promise<void> {
    // close after animation
    return new Promise((resolve) => {
      setTimeout(() => {
        this.containerAnimationState = 'shrinked';
      }, 550);

      setTimeout(() => {
        this.DialogService.openDialog('signUpConfirmDialog');
        this.DialogService.closeDialog(dialogNames.signUpDialog, null);
        resolve();
      }, 1100);
    });
  }
}

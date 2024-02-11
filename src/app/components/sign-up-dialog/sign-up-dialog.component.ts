import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import AuthNextSignUpStep from 'aws-amplify/auth';

// Import services
import { AuthServicesService } from '../../services/auth/auth-services.service';
import { DialogService } from '../../services/dialog/dialog.service';

// Import components
import { LogoImageComponent } from '../logo-image/logo-image.component';
import { LoaderComponent } from '../loader/loader.component';

// Import models
import { SignUpInputModel } from '../../models/SignupModel';
import { SignUpOutput } from 'aws-amplify/auth';

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

  private signUpNextStep : any = AuthNextSignUpStep;


  // dialog key
  public dialogKey: string = 'signUpDialog';

  // authentication variables
  public email: string = '';
  public password: string = '';

  // animation variables
  public animationState: string = 'in';
  public containerAnimationState: string = 'out';

  constructor(
    private authServiceHelper: AuthServicesService,
    private DialogService: DialogService
  ) {
    authServiceHelper = new AuthServicesService();
  }

  /**
   * handle the sign up process
   * @returns void
   */
  public async signUp(): Promise<void> {

    // build the sign up input
    const signUpInput: SignUpInputModel = {
      email: this.email,
      password: this.password,
      username: this.email,
    };

    // call the sign up helper
    const response : SignUpOutput | null =  await this.authServiceHelper.handleSignUp(signUpInput);
    this.animationState = 'out';

    // if the sign up is complete, close the dialog and open the confirmation dialog
    if(response.nextStep === this.signUpNextStep.confirmSignUp){
      this.closeDialog().then(() => {
        this.openConfirmationDialog();
      });
    }
  }

  /**
   * open the confirmation dialog
   * @returns void
   */
  private openConfirmationDialog(): void {
    this.DialogService.openDialog('signUpConfirmDialog');
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
      }, 600);

      setTimeout(() => {
        this.DialogService.openDialog('signUpConfirmDialog');
        this.DialogService.closeDialog(this.dialogKey, null);
        resolve();
      }, 1100);
    });
  }
}

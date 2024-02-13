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
        'right',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      state(
        'middle',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'left',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        })
      ),
      transition('right => middle', animate('500ms ease-in')),
      transition('middle => left', animate('500ms ease-out')),
    ]),
    trigger('shrinkHeight', [
      state(
        'left',
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
      transition('left => shrinked', animate('500ms ease-out')),
    ]),
  ],
})
export class SignUpDialogComponent {

  // authentication variables
  public email: string = '';
  public password: string = '';

  // animation variables
  public animationState: string = 'right';
  public containerAnimationState: string = 'left';

  constructor(
    private authServiceHelper: AuthServicesService,
    private DialogService: DialogService
  ) {}


  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = 'middle';
    }, 100);
  }

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
        this.animationState = 'left';
        this.authServiceHelper.email = this.email;
        this.openSignUpConfirmDialog();
      }
    }
    catch(error){
      console.log('error signing up:', error);
    }
  }

  /**
   * open the sign middle dialog
   */
  public openSignInDialog(): void {
    this.animationState = 'left';
    setTimeout(() => {
    this.DialogService.openDialog(dialogNames.signInDialog);
    this.DialogService.closeDialog(dialogNames.signUpDialog);
    }, 600);
  }

  /**
   * close the current dialog
   * @returns void
   */
  private async openSignUpConfirmDialog(): Promise<void> {
    // close after animation
    return new Promise((resolve) => {
      setTimeout(() => {
        this.containerAnimationState = 'shrinked';
      }, 550);

      setTimeout(() => {
          this.DialogService.openDialog(dialogNames.signUpConfirmDialog);
        
        this.DialogService.closeDialog(dialogNames.signUpDialog, null);
        resolve();
      }, 1100);
    });
  }
}

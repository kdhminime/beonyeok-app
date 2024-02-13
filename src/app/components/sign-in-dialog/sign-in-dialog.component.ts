import { Component } from '@angular/core';
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
import { SignInInputModel, SignInOutputModel } from '../../models/SignupModel';

// Import components
import { LogoImageComponent } from '../logo-image/logo-image.component';

// Import constants
import { dialogNames } from '../../constants/dialog-names';

@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [FormsModule, LogoImageComponent],
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
  ],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.scss',
})
export class LogInDialogComponent {
  // authentication variables
  public email: string = '';
  public password: string = '';
  public animationState: string = 'right';

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
  public async signIn(): Promise<void> {
    // build the sign up input
    const signInInpt: SignInInputModel = {
      password: this.password,
      username: this.email,
    };

    try {
      // call the sign up helper
      const response: SignInOutputModel | null =
        await this.authServiceHelper.handleSignIn(signInInpt);

      // if the sign up is complete, close the dialog and open the confirmation dialog
      if (response?.isSignedIn) {
        this.DialogService.closeDialog(dialogNames.signInDialog, null);
        this.DialogService.openDialog(dialogNames.projectSelection);
      }
      console.log('sign in complete:', response);
    } catch (error) {
      console.log('error signing in:', error);
    }
  }

  /**
   * public openSignUpDialog
   */
  public openSignUpDialog(): void {
    this.animationState = 'left';
    setTimeout(() => {
      this.DialogService.openDialog(dialogNames.signUpDialog);
      this.DialogService.closeDialog(dialogNames.signInDialog, null);
    }, 600);
  }
}

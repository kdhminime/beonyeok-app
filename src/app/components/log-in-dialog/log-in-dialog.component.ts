import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Import services
import { AuthServicesService } from '../../services/auth/auth-services.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { SignInInputModel, SignInOutputModel } from '../../models/SignupModel';

// Import components
import { LogoImageComponent } from '../logo-image/logo-image.component';

// Import constants
import { dialogNames } from '../../constants/dialog-names';

@Component({
  selector: 'app-log-in-dialog',
  standalone: true,
  imports: [FormsModule, LogoImageComponent],
  templateUrl: './log-in-dialog.component.html',
  styleUrl: './log-in-dialog.component.scss',
})
export class LogInDialogComponent {
  // authentication variables
  public email: string = '';
  public password: string = '';

  constructor(
    private authServiceHelper: AuthServicesService,
    private DialogService: DialogService
  ) {}

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
      }
      console.log('sign in complete:', response);
    } catch (error) {
      console.log('error signing in:', error);
    }
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Import services
import { AuthServicesService } from '../../services/auth-services.service';

// Import components
import { LogoImageComponent } from '../logo-image/logo-image.component';

// Import models
import { SignUpInputModel } from '../../models/SignupModel';

@Component({
  selector: 'app-sign-up-dialog',
  standalone: true,
  imports: [LogoImageComponent, FormsModule],
  templateUrl: './sign-up-dialog.component.html',
  styleUrl: './sign-up-dialog.component.scss',
})
export class SignUpDialogComponent {
  email: string = '';
  password: string = '';

  constructor(private authServiceHelper: AuthServicesService) {
    authServiceHelper = new AuthServicesService();
  }

  signUp(): void {
    const signUpInput: SignUpInputModel = {
      email: this.email,
      password: this.password,
      username: this.email,
    };
    this.authServiceHelper.handleSignUp(signUpInput).then((result) => {
      console.log('Sign up result:', result);
    });
  }
}

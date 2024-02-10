import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

// Import services
import { AuthServicesService } from '../../services/auth-services.service';

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
  styleUrls: ['./sign-up-dialog.component.scss',],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1,
      })),
      state('out', style({
        transform: 'translateX(-100%)',
        opacity: 0,
      })),
      transition('in => out', animate('600ms ease-out')),
      transition('out => in', animate('600ms ease-in'))
    ])
  ],
})
export class SignUpDialogComponent {
  @Input() public isLoading: boolean = false;
  @Output() public isLoadingChange : EventEmitter<boolean> = new EventEmitter<boolean>();

  updateIsLoading(): void {
    this.isLoading = !this.isLoading;
    this.isLoadingChange.emit(this.isLoading);
  }
  
  // authentication variables
  public email: string = '';
  public password: string = '';

  // animation variables
  public animationState: string = 'in';

  constructor(private authServiceHelper: AuthServicesService) {
    authServiceHelper = new AuthServicesService();
  }

  public async signUp(): Promise<void> {
    // this.updateIsLoading();
    // const signUpInput: SignUpInputModel = {
    //   email: this.email,
    //   password: this.password,
    //   username: this.email,
    // };
    // const response : SignUpOutput | null =  await this.authServiceHelper.handleSignUp(signUpInput);
    this.animationState = this.animationState === 'in' ? 'out' : 'in';
  }
}

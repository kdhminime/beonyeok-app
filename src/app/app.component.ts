import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Import components
import { SignUpDialogComponent } from './components/sign-up-dialog/sign-up-dialog.component';
import { SignUpConfirmDialogComponent } from './components/sign-up-confirm-dialog/sign-up-confirm-dialog.component';
import { LogInDialogComponent } from './components/sign-in-dialog/sign-in-dialog.component';
import { ProjectSelectionComponent } from './components/project-selection/project-selection.component';

// Import services
import { AuthServicesService } from './services/auth/auth-services.service';
import { DialogService } from './services/dialog/dialog.service';

// Import constants
import { dialogNames } from './constants/dialog-names';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SignUpDialogComponent,
    SignUpConfirmDialogComponent,
    LogInDialogComponent,
    ProjectSelectionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  constructor(
    public dialogService: DialogService,
    public authService: AuthServicesService,
  ) {
    
  }

  public async ngOnInit(): Promise<void> {
    // check if the user is signed in
    const isSignedIn = await this.authService.isSignedIn();
    if (isSignedIn) {
      console.log('user is signed in');
    }
    else{
      this.dialogService.openDialog(dialogNames.signInDialog);
    }
  }
}

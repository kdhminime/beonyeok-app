import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Import components
import { SignUpDialogComponent } from './components/sign-up-dialog/sign-up-dialog.component';
import { SignUpConfirmDialogComponent } from './components/sign-up-confirm-dialog/sign-up-confirm-dialog.component';
import { LogInDialogComponent } from './components/log-in-dialog/log-in-dialog.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  constructor(
    public dialogService: DialogService,
    public authService: AuthServicesService
  ) {}

  ngOnInit(): void {
    this.dialogService.openDialog(dialogNames.signInDialog);
  }

  isLoading: boolean = false;
}

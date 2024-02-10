import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DialogService } from './services/dialog/dialog.service';

// Import components
import { SignUpDialogComponent } from './components/sign-up-dialog/sign-up-dialog.component';
import { SignUpConfirmDialogComponent } from './components/sign-up-confirm-dialog/sign-up-confirm-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SignUpDialogComponent, SignUpConfirmDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    this.dialogService.openDialog('signUpDialog');
  }

  isLoading: boolean = false;
}

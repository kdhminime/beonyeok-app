import { Component } from '@angular/core';

// Import components
import { LogoImageComponent } from '../logo-image/logo-image.component';

@Component({
  selector: 'app-sign-up-dialog',
  standalone: true,
  imports: [LogoImageComponent],
  templateUrl: './sign-up-dialog.component.html',
  styleUrl: './sign-up-dialog.component.scss',
})
export class SignUpDialogComponent {}

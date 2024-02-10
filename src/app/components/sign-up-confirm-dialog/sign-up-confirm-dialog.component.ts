import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up-confirm-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up-confirm-dialog.component.html',
  styleUrl: './sign-up-confirm-dialog.component.scss'
})
export class SignUpConfirmDialogComponent {
  public confirmationCode: string = '';
}

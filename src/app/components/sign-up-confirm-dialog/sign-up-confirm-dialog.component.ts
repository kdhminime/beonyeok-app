import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

// import components
import { LogoImageComponent } from '../logo-image/logo-image.component';

@Component({
  selector: 'app-sign-up-confirm-dialog',
  standalone: true,
  imports: [LogoImageComponent, FormsModule],
  templateUrl: './sign-up-confirm-dialog.component.html',
  styleUrl: './sign-up-confirm-dialog.component.scss',
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      transition('in => out', animate('700ms ease-in')),
      transition('out => in', animate('700ms ease-out')),
    ]),
  ],
})
export class SignUpConfirmDialogComponent {
  public input1 = '';
  public input2 = '';
  public input3 = '';
  public input4 = '';
  public input5 = '';
  public input6 = '';

  public animationState: string = 'out';

  public ngOnInit(): void {
    setTimeout(() => {
      this.animationState = 'in';
    } , 100);
  }

  public onInput(event: any, nextInput: number): void {
    const inputElement = event.target;
    const currentInputValue = inputElement.value;


    // Move to the next input if the current input is filled
    if (currentInputValue.length === 1) {
      const nextInputId = `input${nextInput + 1}`;
      const nextInputElement = document.getElementById(nextInputId) as HTMLInputElement;

      if (nextInputElement) {
        nextInputElement.focus();
      }
    }
  }
}

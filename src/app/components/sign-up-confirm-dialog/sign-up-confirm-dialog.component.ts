import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';

// import components
import { LogoImageComponent } from '../logo-image/logo-image.component';

@Component({
  selector: 'app-sign-up-confirm-dialog',
  standalone: true,
  imports: [LogoImageComponent, FormsModule, CommonModule],
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
      transition('out => in', animate('700ms ease-out')),
    ]),
  ],
})
export class SignUpConfirmDialogComponent {
  public confirmCode: string[] = ['', '', '', '', '', ''];

  public animationState: string = 'out';


  /**
   * on init handle the animation state
   */
  public ngOnInit(): void {
    setTimeout(() => {
      this.animationState = 'in';
    }, 100);
  }

  /**
   * handle the input event and move to the next input or previous input
   * @param event event object
   * @param nextInput current input index
   */
  public onInput(event: Event, nextInput: number): void {
    // Get the current input value
    const inputElement : EventTarget | null = event.target;
    
    if(inputElement instanceof HTMLInputElement) {
    const currentInputValue = inputElement.value;
  
    let nextInputId: string = '';
    let nextInputElement: HTMLInputElement;

    // Move to the next input if the current input is filled
    if (currentInputValue.length === 1) {
      nextInputId = `input${nextInput + 1}`;
      nextInputElement = document.getElementById(
        nextInputId
      ) as HTMLInputElement;
    } else {
      nextInputId = `input${nextInput - 1}`;
      nextInputElement = document.getElementById(
        nextInputId
      ) as HTMLInputElement;
    }

    if (nextInputElement) {
      nextInputElement.focus();
    }
  }
}

  /**
   * check if the confirm code is filled
   * @returns true if the confirm code is filled
   */
  public isFilled(): boolean {
    if (this.confirmCode.join('').length === 6) {
      return true;
    } else {
      return false;
    }
  }
}

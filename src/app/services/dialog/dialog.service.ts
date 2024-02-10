import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogStatesSubject = new BehaviorSubject<{ [key: string]: boolean }>({});
  public dialogStates$: Observable<{ [key: string]: boolean }> = this.dialogStatesSubject.asObservable();

  openDialog(dialogKey: string): void {
    const updatedStates = { ...this.dialogStatesSubject.value, [dialogKey]: true };
    this.dialogStatesSubject.next(updatedStates);
  }

  closeDialog(dialogKey: string, result?: any): void {
    const updatedStates = { ...this.dialogStatesSubject.value, [dialogKey]: false };
    this.dialogStatesSubject.next(updatedStates);
    // Optionally, you can pass the result back to the component that opened the dialog.
    // For simplicity, you can use another BehaviorSubject to handle the result.
  }
}

import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ConfirmDialogueComponent } from './confirm-dialogue/confirm-dialogue.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openConfirmDialog(msg) {
   return  this.dialog.open(ConfirmDialogueComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg
      }
    }
    );

  }
}

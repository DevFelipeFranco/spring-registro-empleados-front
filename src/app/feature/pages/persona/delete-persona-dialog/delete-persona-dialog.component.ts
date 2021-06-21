import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogWarningComponent } from '../../perfil/dialog-warning/dialog-warning.component';

@Component({
  selector: 'app-delete-persona-dialog',
  templateUrl: './delete-persona-dialog.component.html',
  styleUrls: ['./delete-persona-dialog.component.css']
})
export class DeletePersonaDialogComponent implements OnInit {

  public tituloModel = 'Motivo de eliminación';
  motivo = new FormControl();

  constructor(public dialogRef: MatDialogRef<DialogWarningComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

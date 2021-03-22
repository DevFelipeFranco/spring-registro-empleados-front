import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-detail-information-profile',
  templateUrl: './detail-information-profile.component.html',
  styleUrls: ['./detail-information-profile.component.css']
})
export class DetailInformationProfileComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailInformationProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Usuario) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}

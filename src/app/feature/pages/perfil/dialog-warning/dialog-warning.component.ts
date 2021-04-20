import { Usuario } from 'src/app/core/models/usuario.model';
import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-dialog-warning',
  templateUrl: './dialog-warning.component.html',
  styleUrls: ['./dialog-warning.component.css']
})
export class DialogWarningComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  usuarios: Usuario[];
  filteredOptions: Observable<Usuario[]>;

  constructor(public dialogRef: MatDialogRef<DialogWarningComponent>,
              private readonly authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.consultarUsuario();
  }

  private _filter(value: any): Usuario[] {
    console.log(value);
    const filterValue = value.toLowerCase();

    return this.usuarios.filter((usuario: Usuario) => usuario.nombres.toLowerCase().includes(filterValue) &&
      usuario.usuario !== this.data.usuarioActual.usuario);
  }

  consultarUsuario(): void {
    this.authService.consulatUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

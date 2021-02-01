import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {


  registroUsuarioForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  private iniciarFormulario(): void {
    this.registroUsuarioForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    });
  }

  registrarUsuario(): void {
    console.log('Saved:', this.registroUsuarioForm.value);

    this.authService.registrarUsuario(this.registroUsuarioForm.value).subscribe(data => console.log(data));
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.registroUsuarioForm.controls[controlName].hasError(errorName);
  }
}

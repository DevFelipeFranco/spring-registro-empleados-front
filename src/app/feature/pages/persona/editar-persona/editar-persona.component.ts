import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/core/models/persona.model';
import { PersonaService } from '../../../../core/services/persona/persona.service';
import { TipoDocumento } from '../../../../core/models/tipoDocumento.model';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

  personaFormulario: FormGroup;
  persona: Persona;
  tipoDocumentos: TipoDocumento[];

  constructor(private readonly fb: FormBuilder,
              private readonly persoaService: PersonaService,
              private readonly router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.persona = navigation?.extras?.state?.value;

    this.iniciarFormulario();
  }

  ngOnInit(): void {
    this.personaFormulario.patchValue(this.persona);
    this.tipoDocumento();
  }

  iniciarFormulario(): void {
    this.personaFormulario = this.fb.group({
      tipoDocumento: ['', Validators.required],
      identificacion: ['', [Validators.required]],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      edad: [{value: '', disabled: true}, Validators.required]
    });
  }

  tipoDocumento(): void {
    this.persoaService.tipoDocumentos().subscribe(tipoDocumentos => this.tipoDocumentos = tipoDocumentos);
  }

  onEditarPersona(): void {

  }

  compararTipoDocumento(td1: TipoDocumento, td2: TipoDocumento): boolean {
    return td1 && td2 ? td1.idTipoDocumento === td2.idTipoDocumento : td1 === td2;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.personaFormulario.controls[controlName].hasError(errorName);
  }
}

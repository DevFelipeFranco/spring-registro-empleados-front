import { Cliente } from './../../../../core/models/cliente.model';
import { Usuario } from './../../../../core/models/usuario.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/core/models/persona.model';
import { PersonaService } from '../../../../core/services/persona/persona.service';
import { TipoDocumento } from '../../../../core/models/tipoDocumento.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Genero } from '../../../../core/models/genero.model';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-crear-persona.component.html',
  styleUrls: ['./editar-crear-persona.component.css']
})
export class EditarCrearPersonaComponent implements OnInit {

  personaFormulario: FormGroup;
  persona: Persona;
  tipoDocumentos: TipoDocumento[];
  generos: Genero[];
  proyectos: Cliente[];
  titulo: string;
  crear: boolean;
  clienteSeleccionado: Cliente | undefined;
  public isFormProyecto = false;
  public maxDate = new Date();

  constructor(private readonly fb: FormBuilder,
              private readonly persoaService: PersonaService,
              private readonly authService: AuthService,
              private readonly clienteService: ClienteService,
              private readonly router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.persona = navigation?.extras?.state?.value;

    console.log('Si tiene informacion a pesar de que recargue la pagina', this.persona);
    this.iniciarFormulario();
  }

  ngOnInit(): void {
    // this.personaFormulario.patchValue(this.persona);
    this.editarOCrearPersona(this.persona);
    this.tipoDocumento();
    this.consultarGenero();
    this.consultarProyecto();
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
      edad: [{ value: '', disabled: true }, Validators.required],
      genero: ['', Validators.required],
      proyecto: ['']
    });
  }

  tipoDocumento(): void {
    this.persoaService.tipoDocumentos().subscribe(tipoDocumentos => this.tipoDocumentos = tipoDocumentos);
  }

  consultarGenero(): void {
    this.persoaService.generos().subscribe(generos => this.generos = generos);
  }

  consultarProyecto(): void {
    this.clienteService.consultarClientes().subscribe((proyectos: Cliente[]) => this.proyectos = proyectos);
  }

  onEditarPersona(): void {
    this.persona = {
      idPersona: this.persona.idPersona,
      tipoDocumento: this.personaFormulario.get('tipoDocumento').value,
      identificacion: this.personaFormulario.get('identificacion').value,
      primerNombre: this.personaFormulario.get('primerNombre').value,
      segundoNombre: this.personaFormulario.get('segundoNombre').value,
      primerApellido: this.personaFormulario.get('primerApellido').value,
      segundoApellido: this.personaFormulario.get('segundoApellido').value,
      fechaNacimiento: new Date(this.personaFormulario.get('fechaNacimiento').value),
      direccion: this.personaFormulario.get('direccion').value,
      email: this.personaFormulario.get('email').value,
      edad: this.personaFormulario.get('edad').value,
      usuario: this.persona.usuario,
      genero: this.personaFormulario.get('genero').value,
      fechaIngreso: new Date(this.persona.fechaIngreso),
      proyecto: this.clienteSeleccionado
    };
    this.persoaService.actualizarPersona(this.persona).subscribe(personaActualizada => console.log(personaActualizada));
  }

  onCrearPersona(): void {
    console.log('Se va a crear la persona');
    const usuario: Usuario = {
      nombres: undefined,
      apellidos: undefined,
      usuario: this.authService.getJwtUsername(),
      email: undefined,
      clave: undefined,
      estado: undefined,
      fechaCreacion: undefined,
      roles: undefined
    };

    this.persona = {
      tipoDocumento: this.personaFormulario.get('tipoDocumento').value,
      identificacion: this.personaFormulario.get('identificacion').value,
      primerNombre: this.personaFormulario.get('primerNombre').value,
      segundoNombre: this.personaFormulario.get('segundoNombre').value,
      primerApellido: this.personaFormulario.get('primerApellido').value,
      segundoApellido: this.personaFormulario.get('segundoApellido').value,
      fechaNacimiento: new Date(this.personaFormulario.get('fechaNacimiento').value),
      direccion: this.personaFormulario.get('direccion').value,
      email: this.personaFormulario.get('email').value,
      edad: this.personaFormulario.get('edad').value,
      usuario,
      genero: this.personaFormulario.get('genero').value
    };

    this.persoaService.crearPersona(this.persona).subscribe(personaCreada =>
      console.log('Se creo a la persona', this.persona.primerNombre));
  }

  editarOCrearPersona(persona: Persona): void {
    if (persona) {
      console.log('Se va a editar la informacion de la persona');
      this.crear = false;
      this.titulo = 'Editar Persona';
      this.personaFormulario.patchValue(this.persona);
    } else {
      console.log('Se creara una nueva persona');
      this.crear = true;
      this.titulo = 'Crear Persona';

    }
  }

  compararTipoDocumento(td1: TipoDocumento, td2: TipoDocumento): boolean {
    return td1 && td2 ? td1.idTipoDocumento === td2.idTipoDocumento : td1 === td2;
  }

  compararGenero(td1: Genero): boolean {
    if (this.persona) {
      return td1 ? td1.idGenero === this.persona.genero.idGenero : td1 === this.persona.genero;
    } else {
      return false;
    }
  }

  compararProyecto(td1: Cliente, td2: Cliente): boolean {
    return td1 && td2 ? td1.idCliente === td2.idCliente : td1 === td2;
  }

  onChangeSelect(event: any): void {
    console.log(event);
    this.isFormProyecto = true;
    this.clienteSeleccionado = event.value;
  }

  showFormProyecto(): void {
    if (!this.isFormProyecto) {
      this.consultarProyecto();
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.personaFormulario.controls[controlName].hasError(errorName);
  }
}

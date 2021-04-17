import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/core/models/cliente.model';

@Component({
  selector: 'app-editar-crear-cliente',
  templateUrl: './editar-crear-cliente.component.html',
  styleUrls: ['./editar-crear-cliente.component.css']
})
export class EditarCrearClienteComponent implements OnInit {

  clienteFormulario: FormGroup;
  cliente: Cliente;
  titulo: string;
  crear: boolean;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.cliente = navigation?.extras?.state?.value;

    console.log('Si tiene informacion a pesar de que recargue la pagina', this.cliente);
    this.iniciarFormulario();
  }

  ngOnInit(): void {
    this.editarOCrearCliente(this.cliente);
  }

  iniciarFormulario(): void {
    this.clienteFormulario = this.fb.group({
      nombreProyecto: ['', Validators.required],
      nombreCliente: ['', [Validators.required]],
      estadoProyecto: ['', Validators.required],
      descripcion: [''],
      cantidadTrabajadores: ['', Validators.required],
      avanceProyecto: ['']
    });
  }

  editarOCrearCliente(cliente: Cliente): void {
    if (cliente) {
      console.log('Se va a editar la informacion de la persona');
      this.crear = false;
      this.titulo = 'Editar Cliente';
      this.clienteFormulario.patchValue(this.cliente);
    } else {
      console.log('Se creara una nueva persona');
      this.crear = true;
      this.titulo = 'Crear Persona';

    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.clienteFormulario.controls[controlName].hasError(errorName);
  }
}

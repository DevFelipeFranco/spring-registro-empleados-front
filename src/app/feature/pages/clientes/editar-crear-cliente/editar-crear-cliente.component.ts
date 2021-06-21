import { Cliente } from './../../../../core/models/cliente.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../../core/services/cliente/cliente.service';
import { NotificationService } from 'src/app/shared/notification/services/notification.service';
import { throwError } from 'rxjs';
import { NotificationType } from 'src/app/core/enum/notification-type.enum';

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
              private readonly clienteService: ClienteService,
              private readonly notificationService: NotificationService,
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
      cantidadTrabajadores: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      avanceProyecto: [''],
      cantidadSprint: ['', [Validators.required, Validators.pattern('[0-9]*')]],
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
      this.titulo = 'Crear Cliente';

    }
  }

  onCrearCliente(): void {
    console.log('Se va a crear la persona');
    this.cliente = this.clienteFormulario.value;
    console.log(this.cliente);

    this.clienteService.crearCliente(this.cliente).subscribe((clienteCreado: Cliente) => {
      console.log('Se creo el cliente', clienteCreado.nombreCliente);
      this.notificationService.notify(NotificationType.SUCCESS, 'Se creo el cliente con exito!');
    }, error => {
      this.notificationService.notify(NotificationType.ERROR, error.error.message.toUpperCase());
      console.log(error);
      throwError(error);
    });
  }

  onEditarCliente(): void {
    this.cliente = {
      idCliente: this.cliente.idCliente,
      avanceProyecto: this.clienteFormulario.get('avanceProyecto').value,
      cantidadTrabajadores: this.clienteFormulario.get('cantidadTrabajadores').value,
      descripcion: this.clienteFormulario.get('descripcion').value,
      estadoProyecto: this.clienteFormulario.get('estadoProyecto').value,
      nombreCliente: this.clienteFormulario.get('nombreCliente').value,
      nombreProyecto: this.clienteFormulario.get('nombreProyecto').value,
      cantidadSprint: this.clienteFormulario.get('cantidadSprint').value
    };
    console.log(this.cliente);
    this.clienteService.actualizarCliente(this.cliente).subscribe(clienteActualizada => {
      console.log(clienteActualizada);
      this.notificationService.notify(NotificationType.SUCCESS, 'Se actualizo el cliente: ' + this.cliente.nombreCliente + ' con exito!');
    }, error => {
      this.notificationService.notify(NotificationType.ERROR, error.error.message.toUpperCase());
      console.log(error);
      throwError(error);
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.clienteFormulario.controls[controlName].hasError(errorName);
  }
}

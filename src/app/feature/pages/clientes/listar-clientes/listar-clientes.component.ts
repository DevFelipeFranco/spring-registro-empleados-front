import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/core/models/cliente.model';
import { ClienteService } from '../../../../core/services/cliente/cliente.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  @Input() esActivo: boolean;
  public clientes: Cliente[];
  displayedColumns: string[] = ['nombreCliente', 'nombreProyecto', 'avanceProyecto', 'cantidadTrabajadores', 'editar', 'eliminar'];
  dataSource;
  @Output() editarCliente = new EventEmitter<Cliente>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly clienteService: ClienteService) { }

  ngOnInit(): void {
    this.consultarCliente();
  }

  consultarCliente(): void {
    console.log(this.esActivo);
    this.clienteService.consultarClientes(this.esActivo).subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
      this.cargarTabla(this.clientes);
    });
  }

  cargarTabla(cliente: Cliente[]): void {
    this.dataSource = new MatTableDataSource(cliente);
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }

  onEditarCliente(cliente: Cliente): void {
    console.log('Esta es la persona seleccionada:', cliente);
    this.editarCliente.emit(cliente);
  }

  onEliminarCliente(cliente: Cliente): void {
    console.log('Eliminara al cliente', cliente.idCliente);
    this.clienteService.eliminarCliente(cliente.idCliente).subscribe(info => {
      console.log(info);
      const listaClientesActualizada = this.dataSource.data.filter(client => cliente.idCliente !== client.idCliente);
      this.cargarTabla(listaClientesActualizada);
      console.log('Asi quedo la tabla', this.dataSource);
    });
  }
}

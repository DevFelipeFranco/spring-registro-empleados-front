import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { InicialesMes } from 'src/app/core/enum/inicialesMes.enum';
import { PersonaService } from 'src/app/core/services/persona/persona.service';
import { EmpleadosContratados } from '../../../core/models/empleados-contratados.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  contratrosEnero: number;
  contratrosFebrero: number;
  contratrosMarzo: number;
  contratrosAbril: number;
  contratrosMayo: number;
  contratrosJunio: number;
  contratrosJulio: number;
  contratrosAgosto: number;
  contratrosSeptiembre: number;
  contratrosOctubre: number;
  contratrosNoviembre: number;
  contratrosDiciembre: number;

  constructor(private readonly personaService: PersonaService) { }

  ngOnInit(): void {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    this.consultarCantidadPersonasContratadas();
  }

  startAnimationForLineChart(chart): void {
    let seq: any;
    let delays: any;
    let durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  }

  startAnimationForBarChart(chart): void {
    let seq2: any;
    let delays2: any;
    let durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }

  consultarCantidadPersonasContratadas(): void {
    this.personaService.consultarCantidadPersonasContratadas().subscribe(empleadosContratados => this.cargarGraficos(empleadosContratados));
  }

  cargarGraficos(empleadosContratados: EmpleadosContratados[]): void {
    console.log(empleadosContratados);
    this.procesarCantidadPersonasContratadas(empleadosContratados);
    const dataDailySalesChart: any = {
      labels: [InicialesMes.ENERO, InicialesMes.FEBREO, InicialesMes.MARZO, InicialesMes.ABRIL,
      InicialesMes.MAYO, InicialesMes.JUNIO, InicialesMes.JULIO, InicialesMes.AGOSTO,
      InicialesMes.SEPTIEMBRE, InicialesMes.OCTUBRE, InicialesMes.NOVIEMBRE, InicialesMes.DICIMEBRE],
      series: [
        [this.contratrosEnero, this.contratrosFebrero, this.contratrosMarzo, this.contratrosAbril,
          this.contratrosMayo, this.contratrosJunio, this.contratrosJulio, this.contratrosAgosto,
          this.contratrosSeptiembre, this.contratrosOctubre, this.contratrosNoviembre, this.contratrosDiciembre]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);
  }

  procesarCantidadPersonasContratadas(empleadosContratados: EmpleadosContratados[]): void {
    this.inicializarValoresEmpleadosContratados();
    empleadosContratados.map(empleadoContratado => {
      const formatter = new Intl.DateTimeFormat('es', { month: 'short' });
      console.log(formatter.format(new Date(empleadoContratado.fechaIngreso)));
      switch (formatter.format(new Date(empleadoContratado.fechaIngreso))) {
        case 'ene':
          this.contratrosEnero = empleadoContratado.cantidad;
          break;
        case 'feb':
          this.contratrosFebrero = empleadoContratado.cantidad;
          break;
        case 'mar':
          this.contratrosMarzo = empleadoContratado.cantidad;
          break;
        case 'abr':
          this.contratrosAbril = empleadoContratado.cantidad;
          break;
        case 'may':
          this.contratrosMayo = empleadoContratado.cantidad;
          break;
        case 'jun':
          this.contratrosJunio = empleadoContratado.cantidad;
          break;
        case 'jul':
          this.contratrosJulio = empleadoContratado.cantidad;
          break;
        case 'ago':
          this.contratrosAgosto = empleadoContratado.cantidad;
          break;
        case 'sept':
          this.contratrosSeptiembre = empleadoContratado.cantidad;
          break;
        case 'oct':
          this.contratrosOctubre = empleadoContratado.cantidad;
          break;
        case 'nov':
          this.contratrosNoviembre = empleadoContratado.cantidad;
          break;
        case 'dic':
          this.contratrosDiciembre = empleadoContratado.cantidad;
          break;
        default:
          break;
      }
    });

    console.log(this.contratrosAbril);
  }

  inicializarValoresEmpleadosContratados(): void {
    this.contratrosEnero = 0;
    this.contratrosFebrero = 0;
    this.contratrosMarzo = 0;
    this.contratrosAbril = 0;
    this.contratrosMayo = 0;
    this.contratrosJunio = 0;
    this.contratrosJulio = 0;
    this.contratrosAgosto = 0;
    this.contratrosSeptiembre = 0;
    this.contratrosOctubre = 0;
    this.contratrosNoviembre = 0;
    this.contratrosDiciembre = 0;
  }
}

import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts';
import { BackendService } from '../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../services/error/error.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
  publicaciones!: {
    series: number[];
    chart: ApexChart;
    title: ApexTitleSubtitle;
    labels: any;
  };

  usuarios!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  };

  accesos!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    title: ApexTitleSubtitle;
    xaxis: ApexXAxis;
  };

  constructor(private location: Location, private backendService: BackendService, private errorService: ErrorService) {
    this.backendService.getStatisticsUser().subscribe(
      response => {
        this.Publicaciones(response.estadisticas.publicaciones);
        this.Usuarios(response.estadisticas.bestReputacion);
        this.Accesos(response.estadisticas.accesos);
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * Crea el gráfico de publicaciones
   * @param data Datos de las publicaciones
   * @returns void
   */ 
  private Publicaciones(data: any) {
    var parsedObject = JSON.parse(JSON.stringify(data));
    var keys = Object.keys(parsedObject);
    var values: number[] = Object.values(parsedObject);
    console.log("Values:", values) // LOG:

    this.publicaciones = {
      series: values,
      chart: {
        type: 'pie',
        height: 350
      },
      labels: ["Compañero de piso", "Recetas", "Economía doméstica", "Limpieza", "Otros"],
      title: {
        text: 'Porcentaje de publicaciones en cada foro'
      }
    }
  }

  /**
   * Crea el gráfico de usuarios con mejor reputación
   * @param data Datos de los usuarios con mejor reputación
   */
  private Usuarios(data: any) {
    var keys: any[] = [];
    var values: number[] = [];

    keys.push(data[0].usuario);
    keys.push(data[1].usuario);
    keys.push(data[2].usuario);
    values.push(data[0].reputacion);
    values.push(data[1].reputacion);
    values.push(data[2].reputacion);

    this.usuarios = {
      series: [
        {
          name: "Usuarios",
          data: values
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: keys
      },
      title: {
        text: "Ranking de usuarios:"
      }
    };
  }

  /**
   * Crea el gráfico de accesos
   * @param data Datos de los accesos
   */
  private Accesos(data: any) {
    var parsedObject = JSON.parse(JSON.stringify(data));
    var keys = Object.keys(parsedObject);
    var values: number[] = Object.values(parsedObject);

    this.accesos = {
      series: [{
        name: 'Accesos',
        data: values
      }],
      chart: {
        type: 'area',
        height: 350
      },
      xaxis: {
        categories: keys
      },
      title: {
        text: 'accesos'
      }
    };
  }

  /**
   * La función `goBack` en TypeScript se utiliza para regresar a la ubicación anterior en el historial
   * del navegador.
   */
  goBack(): void {
    this.location.back();
  }
}

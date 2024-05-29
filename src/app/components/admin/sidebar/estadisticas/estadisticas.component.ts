import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ApexAxisChartSeries, ApexChart, ApexOptions, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
  public horapunta!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  };

  public busquedas!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  };

  public ciudades!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  };

  public usuarios!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  };

  public inicios!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  };

  public registros!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  };

  constructor(private location: Location, private backendService: BackendService, private errorService: ErrorService) {
    this.backendService.getStatisticsAdmin().subscribe(
      response => {
        this.HoraPunta(response.hora_punta);
        this.Busquedas(response.busquedas);
        this.Ciudades(response.ciudades);
        this.Inicios(response.inicios);
        this.Registros(response.registros);
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

    this.backendService.getStatisticsUser().subscribe(
      response => {
        console.log(response.estadisticas.bestReputacion);
        this.Usuarios(response.estadisticas.bestReputacion);
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
  
  private HoraPunta(data: any) {
    var parsedObject = JSON.parse(JSON.stringify(data));
    var keys = Object.keys(parsedObject);
    var values: number[] = Object.values(parsedObject);

    this.horapunta = {
      series: [
        {
          name: "Horas",
          data: values
        }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: keys
      },
      title: {
        text: "Horas puntas:"
      }
    };
  }

  private Busquedas(data: any) {
    var parsedObject = JSON.parse(JSON.stringify(data));
    var keys = Object.keys(parsedObject);
    var values: number[] = Object.values(parsedObject);

    this.busquedas = {
      series: [
        {
          name: "Número de búsquedas",
          data: values
        }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: keys
      },
      title: {
        text: "Búsquedas:"
      }
    };
  }

  private Ciudades(data: any) {
    var parsedObject = JSON.parse(JSON.stringify(data));
    var keys = Object.keys(parsedObject);
    var values: number[] = Object.values(parsedObject);

    this.ciudades = {
      series: [
        {
          name: "Ciudades",
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
        text: "Ranking de ciudades:"
      }
    };
  }

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

  private Inicios(data: any) {
    var parsedObject = JSON.parse(JSON.stringify(data));
    var keys = Object.keys(parsedObject);
    var values: number[] = Object.values(parsedObject);

    this.inicios = {
      series: [
        {
          name: "Número de inicios",
          data: values
        }
      ],
      chart: {
        type: 'area',
        height: 350
      },
      xaxis: {
        categories: keys
      },
      title: {
        text: "Inicios:"
      }
    };
  }

  private Registros(data: any) {
    var parsedObject = JSON.parse(JSON.stringify(data));
    var keys = Object.keys(parsedObject);
    var values: number[] = Object.values(parsedObject);

    this.registros = {
      series: [
        {
          name: 'Número de registros',
          data: values
        }
      ],
      chart: {
        type: 'area',
        height: 350
      },
      xaxis: {
        categories: keys
      },
      title: {
        text: 'Registros:'
      }
    };
  }

  goBack(): void {
    this.location.back();
  }
}

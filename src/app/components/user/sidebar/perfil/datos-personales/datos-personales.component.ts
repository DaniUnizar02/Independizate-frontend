import { Component } from '@angular/core';
import { BackendService } from '../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../services/error/error.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.css'
})
export class DatosPersonalesComponent {
  editar: boolean = false;
  piso: boolean = false;
  sexo: string = '';
  situacion = '';

  private misStamps: any[] = [];
  private misFavs: any[] = [];

  infoUsuario = {
    img: '',
    usuario: '',
    nombre: '',
    apellidos: '',
    edad: '',
    reputacion: '',
    correo: '',
    sexo: '',
    piso: '',
    ciudad: '',
    situacion: '',
    estampas: [{
      id: '',
      titulo: '',
      descripcion: '',
      foto: '',
      publicable: '',
      favorita: false,
      color: ''
    }]
  };

  constructor(private backendService: BackendService, private errorService: ErrorService) { }

  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 5;

    this.getInfo();
    this.getMisStamps();
    this.getAllStamps();
  }

  private getInfo() {
    this.backendService.getProfilesId(this.backendService.cookie.usuario).subscribe(
      response => {
        console.log(response); //LOG:
        this.infoUsuario = {
          img: response.fotoPerfil,
          usuario: response.usuario,
          nombre: response.nombre,
          apellidos: response.apellidos,
          edad: response.edad,
          reputacion: response.reputacion,
          correo: response.correo,
          sexo: response.sexo,
          piso: response.piso ? 'Sí' : 'No',
          ciudad: response.ciudad,
          situacion: response.situacion,
          estampas: []
        }
        this.piso = response.piso;
        this.sexo = response.sexo;
        this.situacion = response.situacion;
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
        } else if (error.status === 403) {
          this.errorService.openDialogError("Forbidden.");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron posts.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  private getMisStamps() {
    this.misStamps = [];
    this.backendService.getProfilesIdStamps(this.backendService.cookie.usuario).subscribe(
      response => {
        // console.log(response); //LOG:
        for (const item of response.listaEstampas) {
          this.misStamps.push(item);
        }
        for (const item of response.estampasFavoritas) {
          this.misFavs.push(item);
        }
        // console.log(this.misStamps);//LOG:
        // console.log(this.misFavs);//LOG:        
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
        } else if (error.status === 403) {
          this.errorService.openDialogError("Forbidden.");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron posts.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  private getAllStamps() {
    this.infoUsuario.estampas = [];
    this.backendService.getStamps().subscribe(
      response => {
        console.log(response);
        this.formatearAllStamps(response.stamps);
        console.log(this.infoUsuario.estampas); // LOG:
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
        } else if (error.status === 403) {
          this.errorService.openDialogError("Forbidden.");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron posts.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  private formatearAllStamps(stamps: any) {
    for (const item of stamps) {
      var data = {
        id: item._id,
        titulo: item.titulo,
        descripcion: item.descripcion,
        foto: item.foto,
        publicable: item.publicable ? "✅ Estampa equipable" : "❌ Estampa no equipable",
        favorita: false,
        color: '#3F3F4F'
      };

      if (this.misStamps.includes(item._id)) { data.color = ''; }
      if (this.misFavs.includes(item._id)) { data.favorita = true; }

      this.infoUsuario.estampas.push(data);
    }
  }

  guardar() {
    var data = {
      usuario: this.infoUsuario.usuario,
      contrasegna: 'usuario',
      nombre: this.infoUsuario.nombre,
      apellidos: this.infoUsuario.apellidos,
      correo: this.infoUsuario.correo,
      edad: parseInt(this.infoUsuario.edad),
      sexo: this.infoUsuario.sexo,
      piso: this.piso,
      ciudad: this.infoUsuario.ciudad,
      situacion: this.infoUsuario.situacion,
      fotoPerfil: this.infoUsuario.img
    }

    this.backendService.putProfilesId(this.backendService.cookie.usuario, data).subscribe(
      response => { },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
        } else if (error.status === 403) {
          this.errorService.openDialogError("Forbidden.");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron posts.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );

    this.getInfo();
  }

  noGuardar() {
    this.piso = this.infoUsuario.piso === "Sí" ? true : false;
    this.sexo = this.infoUsuario.sexo;
    this.situacion = this.infoUsuario.situacion;
  }

  // NOTE: RESPONSIVE

  numCols: number = 5;
  rowspan: number = 1.5
  rowHeight: string = "4:1";

  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 5;
    this.rowspan = (event.target.innerWidth < 700) ? 5 : 2.5;
    this.rowHeight = (event.target.innerWidth >= 900 && event.target.innerWidth < 1200 ) ? '5:1' : '4:1';
  }
}

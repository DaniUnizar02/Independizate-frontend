import { Component } from '@angular/core';
import { BackendService } from '../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../services/error/error.service';
import { EstampasComponent } from './estampas/estampas.component';
import { MatDialog } from '@angular/material/dialog';

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
  foto = '';

  s: string[] = [];

  private misFavs: any[] = [{ id: '', foto: '' }];
  private imageBase64: string = '';
  private uploadImage = false;

  infoUsuario = {
    id: '',
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
    }]
  };

  constructor(public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) { }

  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 5;

    this.getInfo();
    this.getStamps();
    console.log(this.infoUsuario.estampas); //LOG:
  }

  private getInfo() {
    var cockie = this.backendService.getCookie();
    var dataCockie = '';
    if (cockie) {
      dataCockie = cockie.usuario;
    }

    this.backendService.getProfilesId(dataCockie).subscribe(
      response => {
        console.log(response.user); //LOG:
        this.infoUsuario = {
          id: response.user._id,
          img: response.user.fotoPerfil,
          usuario: response.user.usuario,
          nombre: response.user.nombre,
          apellidos: response.user.apellidos,
          edad: response.user.edad,
          reputacion: response.user.reputacion,
          correo: response.user.correo,
          sexo: response.user.sexo,
          piso: response.user.piso ? 'Sí' : 'No',
          ciudad: response.user.ciudad,
          situacion: response.user.situacion,
          estampas: []
        }
        this.piso = response.user.piso;
        this.sexo = response.user.sexo;
        this.situacion = response.user.situacion;
        this.foto = "data:image/png;base64," + this.infoUsuario.img;
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Usuario no encontrado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  private getStamps() {
    this.backendService.getStampsUser().subscribe(
      response => {
        this.formatearStamps(response.stamps);
        console.log("Stamps: ", response.stamps); // LOG:
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron estampas.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  private formatearStamps(stamps: any) {
    this.s = []
    this.infoUsuario.estampas = []
    for (const item of stamps) {
      if (item != null) {
        var data = {
          id: item._id,
          titulo: item.titulo,
          descripcion: item.descripcion,
          foto: "data:image/png;base64," + item.foto,
          publicable: item.publicable ? "✅ Estampa equipable" : "❌ Estampa no equipable",
        }

        this.s.push(item.foto);
        this.infoUsuario.estampas.push(data);
      }
    }
  }

  subirFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result != null) {
          this.imageBase64 = reader.result.toString();
          this.imageBase64 = this.imageBase64.split(',')[1];
        }
      };
      reader.readAsDataURL(file);
      this.uploadImage = true;
    }
  }

  guardar() {
    var data = {
      usuario: this.infoUsuario.usuario,
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

    if (this.uploadImage) {
      data.fotoPerfil = this.imageBase64;
      console.log(data.fotoPerfil);
    }

    if (!this.infoUsuario.usuario.trim() || !this.infoUsuario.nombre.trim() || !this.infoUsuario.apellidos.trim() || !this.infoUsuario.correo.trim() || !this.infoUsuario.edad.toString().trim() || !this.infoUsuario.sexo.trim() || !this.infoUsuario.piso.trim() || !this.infoUsuario.ciudad.trim() || !this.infoUsuario.situacion.trim() || !this.infoUsuario.img.trim()) {
      this.errorService.openDialogError("Todos los campos tienen que estar rellenos.");
    } else {
      var cockie = this.backendService.getCookie();
      var dataCockie = '';
      if (cockie) {
        dataCockie = cockie.usuario;
      }

      this.backendService.putProfilesId(dataCockie, data).subscribe(
        response => {
          var cockie = this.backendService.getCookie();
          if (cockie) {
            this.backendService.setCookie({
              usuario: cockie.usuario,
              nombreUsuario: data.usuario,
              token: response.token,
              esInvitado: false
            });
          }
          this.getInfo();
          this.getStamps();
        },
        error => {
          if (error.status === 400) {
            this.errorService.openDialogError("Parámetros inválidos");
          } else if (error.status === 401) {
            this.errorService.redirect("home");
          } else if (error.status === 403) {
            this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
          } else if (error.status === 404) {
            this.errorService.openDialogError("Usuario no encontrado.");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        }
      );
    }

    this.getInfo();
    this.getStamps();
  }

  noGuardar() {
    this.piso = this.infoUsuario.piso === "Sí" ? true : false;
    this.sexo = this.infoUsuario.sexo;
    this.situacion = this.infoUsuario.situacion;
  }

  openDialogCambiarEstampa(enterAnimationDuration: string, exitAnimationDuration: string, id: string, foto: string): void {
    var cockie = this.backendService.getCookie();
    var data = '';
    if (cockie) {
      data = cockie.usuario;
    }

    this.backendService.getUsersIdBasic(data).subscribe(
      response => {
        console.log(response.users.fotoPerfil); //LOG:
        this.misFavs[0] = { id: response.users.Stamps[0]._id, foto: response.users.Stamps[0].foto };
        this.misFavs[1] = { id: response.users.Stamps[1]._id, foto: response.users.Stamps[1].foto };
        this.misFavs[2] = { id: response.users.Stamps[2]._id, foto: response.users.Stamps[2].foto };
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Usuario no encontrado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );

    const dialog = this.dialog.open(EstampasComponent, {
      width: '80%',
      height: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        user: this.infoUsuario.id,
        estampa1: this.misFavs[0],
        estampa2: this.misFavs[1],
        estampa3: this.misFavs[2],
        estampaNueva: { id: id, foto: foto }
      }
    });

    dialog.afterClosed().subscribe(() => {
      // this.getInfo();
      this.getStamps();
    });
  }

  // NOTE: RESPONSIVE

  numCols: number = 5;
  rowspan: number = 1.5
  rowHeight: string = "4:1";

  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 5;
    this.rowspan = (event.target.innerWidth < 700) ? 5 : 2.5;
    this.rowHeight = (event.target.innerWidth >= 900 && event.target.innerWidth < 1200) ? '5:1' : '4:1';
  }
}

/**
 * Proyecto: Independizate
 * Descripción: Fichero responsable del registro de usuarios por credenciales
 * o mendiante Google.
 * 
 * Archivo: register.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../../services/backend/backend.service';
import { ErrorService } from '../../../services/error/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuario: string = '';
  contrasena: string = '';
  repeatContrasena: string = '';
  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  edad: string = '';
  sexo: string = 'Hombre';
  piso: string = 'true';
  ciudad: string = '';
  situacion: string = 'Estudiante';

  google: boolean = false;
  private g_id: string | null;
  private g_nombreApellidos: string | null;
  private g_contrasena: string | null;
  private g_email: string | null;
  private g_fotoPerfil: string | null;

  constructor(private router: Router, private _snackBar: MatSnackBar, private route: ActivatedRoute, private backendService: BackendService, private errorService: ErrorService) {
    this.google = (this.route.snapshot.queryParamMap.get('google') === 'true') ? true : false;
    console.log("GOOGLE:",this.route.snapshot.queryParamMap.get('google'));
    this.g_id = this.route.snapshot.queryParamMap.get('id');
    console.log("ID:",this.g_id);
    this.g_nombreApellidos = this.route.snapshot.queryParamMap.get('nombreApellidos');
    console.log("NOMBRE APELLIDOS:",this.g_nombreApellidos);
    this.g_contrasena = this.route.snapshot.queryParamMap.get('contrasena');
    console.log("CONTRASENA:",this.g_contrasena);
    this.g_email = this.route.snapshot.queryParamMap.get('email');
    console.log("EMAIL:",this.g_email);
    this.g_fotoPerfil = this.route.snapshot.queryParamMap.get('fotoPerfil');
  }

  /**
   * La función `separar` permite dividir la información en dos partes.
   * Su uso concreto es para separar el campo nombreApellidos en nombre y apellidos
   * @param {any} data - Contiene la información a dividir en 2 partes.
   * @param {number} partes - Indica si lo que se quiere obtener es la parte primera de
   * la información (nombre), o la segunda (apellidos)
   */
  separar(data: any, parte: number) {
    const palabras = data.split(' ');
    var primera = palabras.shift() || '';
    var resto = palabras.join(' ');

    if (parte == 1) {
      return primera;
    } else {
      return resto;
    }
  }

  /**
   * La función `register` sirve para registrar en la aplicación a un usuario nuevo, ya
   * sea, a través de google o normal.
   */
  register() {
    if (this.google) {
      if (!this.usuario.trim() || !this.edad.toString().trim() || !this.sexo.trim() || !this.piso.trim() || !this.ciudad.trim() || !this.situacion.trim()) {
        this.errorService.openDialogError("Todos los campos tienen que estar rellenos.");
      } else {
        var bodyGoogle = {
          usuario: this.usuario,
          contrasegna: '',
          nombre: this.separar(this.g_nombreApellidos, 1),
          apellidos: this.separar(this.g_nombreApellidos, 2),
          correo: this.g_email,
          edad: parseInt(this.edad),
          sexo: this.sexo,
          piso: (this.piso === 'true') ? true : false,
          ciudad: this.ciudad,
          situacion: this.situacion,
          fotoPerfil: this.g_fotoPerfil,
          idGoogle: this.g_id,
          googleToken: this.g_contrasena, 
        }

        this.backendService.postAuthSignupgoogle(bodyGoogle).subscribe(valor => {
          var body = {
            idGoogle: this.usuario,
            googleToken: this.g_contrasena,
            rememberMe: false
          }
          this.backendService.postAuthLogingoogle(body).subscribe(valor => {
            this.backendService.setCookie({
              usuario: valor.id,
              nombreUsuario: bodyGoogle.usuario,
              token: valor.token,
              esInvitado: false
            });
            this.backendService.setHeaders();
            this.router.navigate(['sidebar']);
          }, error => {
            if (error.status === 400) {
              this.errorService.openDialogError("Parámetros inválidos");
            } else if (error.status === 401) {
              this.errorService.redirect("home");
            } else if (error.status === 500) {
              this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
            }
          });
        }, error => {
          if (error.status === 400) {
            this.errorService.openDialogError("Parámetros inválidos");
          } else if (error.status === 404) {
            this.errorService.openDialogError("Usuario ya existe.");
          } else if (error.status === 409) {
            this.errorService.openDialogError("Este usuario ya existe.");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        });
      }
    } else {
      if (!this.usuario.trim() || !this.contrasena.trim() || !this.repeatContrasena.trim() || !this.nombre.trim() || !this.apellidos.trim() || !this.email.trim() || !this.edad.toString().trim() || !this.sexo.trim() || !this.piso.trim() || !this.ciudad.trim() || !this.situacion.trim()) {
        this.errorService.openDialogError("Todos los campos tienen que estar rellenos.");
      } else {
        if (this.contrasena === this.repeatContrasena) {
          var body = {
            usuario: this.usuario,
            contrasegna: this.backendService.hashPassword(this.contrasena),
            nombre: this.nombre,
            apellidos: this.apellidos,
            correo: this.email,
            edad: parseInt(this.edad),
            sexo: this.sexo,
            piso: (this.piso === 'true') ? true : false,
            ciudad: this.ciudad,
            situacion: this.situacion,
            fotoPerfil: "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RkVtEPy0eP9///d/vZNCoeicM8agNxR2EoIQdpqKEhEbDqNw/tL88sry8ePHW1tajaXaZiKQH/Pz8+e/OZ8tk3DORVFUrVaxBRHsJAQh1IeKCkkURrdv365Wq8ePH9/btZeZRNSidZgbX3715fz8fBRFcRhXq6kxplKpGGOIsKc27Bzce8MOeDaus/GsOK8qTDYMHz5+/Je//e36wg02RJZpfVUZNA0na2v90vXr+nhp+f/9nz9+f/VaFBZITZK47ECJ7NdXS0GMF8LbgRYh1FlW5aVp+umnn/30008nT55UY7MKURg1XJMQ8cZYrxRaJqLrN299/vnnKysrURTVu2gACEJoDMzsXHrp0nePHz85derk3r1dqiRCBknYFKLApl6ZOfH+888/v3z5CjPHcYz+T2gEqGag/rLlhkEQtra2PH78+I9//N/r129477F+rJlYy0mS/PnPf7506buWllIcx/UuEcAatAihjtbuw7LAU6Vs9Zj37uOPPxkevnP8+PFiFNuAxZOxv/CzoKFkTb1sLbyIGGO+//7aN998Uy6vFotF53BcMzQQBCE0HGut9/7GjevLy8szU0cGBgZsgLbhLlPbDsY7v7yy/OXX39y4cTMIbEtLa7WKjdehsSAIoeF471UljuP79+///eHf90/sn5meKRYLWF+463jnr12/dvHixaXllTiOrTWVSgVbpkGjQRBCY8nmizLbNHVxHLPopflL9+7dm5qaGhjoKxaL9S4gvKqlpaUvv/zy5s2bURQFQSgiQWCRgtCAEITQWGpbsmXrychwXCo+XVn59F//6untnpmZ6e3eJ5jl1Uiye5fab51IkiZXLl+ZvzRPRGEhViIjZNhI6p+7cIJmPjQABCE0tGzOhTGGiO7fv//H//njkSNHDh0+VAgjtC0aRO1CiEjq3eLi4pdffvn48eMgDOtdNIBXgiCEXSCLwyCwnuXbb89fu35t8uChw4cPixcbYDppQ1DVBw8ezH936cHDh+XVchzHXnCeCOwO6JeAXaNarYoXGwTeufv371erVWONoLatt+w2Rbz89NNPT548qZQrqoIFErCLoEUIDafW1WYMey9xHFerVefSOI5aWlsnDx/u6+8vRliO3Siy62UDOzMzc3hqavHB4pXLl+/du1etVlU1WzgvXonI2LU77+wEEoAGgSCExsLMRJq184yxQWCf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" // NOTE: Imagen por defecto
          }

          this.backendService.postAuthSignup(body).subscribe(valor => {
            var body = {
              usuario: this.usuario,
              contrasegna: this.backendService.hashPassword(this.contrasena),
              rememberMe: false
            }
            this.backendService.postAuthLogin(body).subscribe(valor => {
              this.backendService.setCookie({
                usuario: valor.id,
                nombreUsuario: body.usuario,
                token: valor.token,
                esInvitado: false
              });
              this.backendService.setHeaders();
              this.router.navigate(['sidebar']);
            }, error => {
              if (error.status === 400) {
                this.errorService.openDialogError("Parámetros inválidos");
              } else if (error.status === 401) {
                this.errorService.redirect("home");
              } else if (error.status === 500) {
                this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
              }
            });
          }, error => {
            if (error.status === 400) {
              this.errorService.openDialogError("Parámetros inválidos");
            } else if (error.status === 404) {
              this.errorService.openDialogError("Usuario ya existe.");
            } else if (error.status === 500) {
              this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
            }
          });
        }
      }
    }
  }
}

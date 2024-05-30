/**
 * Proyecto: Independizate
 * Descripción: Fichero responsable del inicio de sesión de los usuarios tanto
 *              con credenciales como con Google o como invitado.
 * 
 * 
 * Archivo: home.component.ts 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend/backend.service';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../services/error/error.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: string = '';
  contrasena: string = '';

  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  gBody = {
    id: '',
    password: ''
  }

  constructor(private router: Router, private http: HttpClient, private backendService: BackendService, private errorService: ErrorService) { }

  /**
   * Método que se ejecuta al iniciar el componente para cargar la autenticación de Google.
   */
  ngOnInit() {

    this.googleAuthSDK();
  }

  /**
   * Método que valida el token de Google.
   * @param idToken Token de Google.
   * @returns Respuesta de la validación del token.
   */
  validateGoogleToken(idToken: string) {
    return this.http.get<any>(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
  }

  /**
   * Método que se encarga de iniciar sesión con Google, este tendra en cuenta si es la primera vez
   * iniciando sesión con google, desplazando a la página de registro o la pagina de usuario según esto.
   */
  callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs

        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        //Validate token
        const idToken = googleAuthUser.getAuthResponse().id_token;

        this.validateGoogleToken(idToken).subscribe(
          (response) => {
            // Handle response of the token validation
            if (response.sub) {
              // Valid token
              //TODO: Verify if the user is already registered
              //TODO: Use modals for errors
              // this.router.navigate(['home','registes',true,profile.getId(),profile.getName(),googleAuthUser.getAuthResponse().id_token,profile.getEmail(),profile.getImageUrl()]);
              this.router.navigate(['home/register'], { queryParams: { google: true, id: profile.getId(), nombreApellidos: profile.getName(), contrasena: googleAuthUser.getAuthResponse().id_token, email: profile.getEmail(), fotoPerfil: profile.getImageUrl() } });
              this.backendService.getUsersGoogleIdGoogleExists(profile.getId()).subscribe(valor => {
                if (valor.exists == true) {
                  console.log("LoginGoogle login") //LOG:
                  var body = {
                    idGoogle: profile.getId(),
                    googleToken: googleAuthUser.getAuthResponse().id_token,
                    rememberMe: false
                  }

                  this.backendService.postAuthLogingoogle(body).subscribe(valor => {
                    this.backendService.setCookie({
                      usuario: valor.id,
                      nombreUsuario: profile.getId(),
                      token: valor.token,
                      esInvitado: false
                    });
                    this.backendService.setHeaders();
                    this.router.navigate(['sidebar']);
                  }, error => {
                    if (error.status === 400) {
                      this.errorService.openDialogError("Parámetros inválidos");
                    } else if (error.status === 401) {
                      this.errorService.openDialogError("Parámetros inválidos");
                    } else if (error.status === 500) {
                      this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
                    }
                  });
                } else {
                  console.log("LoginGoogle registro") //LOG:
                  // this.router.navigate(['home/register'], { queryParams: { google: 'true', id: profile.getId(),  nombreApellidos: profile.getName(), contrasena: googleAuthUser.getAuthResponse().id_token, email: profile.getEmail(), fotoPerfil: profile.getImageUrl() } });

                }
              }, error => {
                if (error.status === 400) {
                  this.errorService.openDialogError("Parámetros inválidos");
                } else if (error.status === 500) {
                  this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
                }
              });
            } else {
              // Invalid token
              alert('Token validation failed');
            }
          },
          (error) => {
            // Handle error
            alert('Error validating token: ' + error.message);
          }
        );
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  /**
   * Método que carga la autenticación de Google,
   * cuenta con la id de cliente de la API de Google.
   */
  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '871724941026-uhmab7h6l438mh96f0ontoak5t2a8ne5.apps.googleusercontent.com',
          plugin_name: 'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  /**
   * Método que indica el tipo de usuario que ha iniciado sesión,
   * redirigiendo a la página correspondiente.
   */
  tipoUsuario() {
    this.backendService.getUsersUsuarioType(this.usuario).subscribe(valor => {
      console.log(valor); //LOG:
      if (valor[0].tipo == "admin") {
        this.router.navigate(['admin/sidebar']);
      } else {
        this.router.navigate(['sidebar']);
      }
    }, error => {
      console.error('Error al obtener token: ', error);
    });
  }

  /**
   * Método que inicia sesión con las credenciales del usuario.
   */
  login() {
    if (!this.usuario.trim() || !this.contrasena.trim()) {
      this.errorService.openDialogError("Todos los campos tienen que estar rellenos.");
    } else {
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

        const socket = new WebSocket('ws://localhost:4000?clienteId=' + this.usuario);
        socket.addEventListener('open', () => { console.log('Conexión establecida con el servidor WebSocket'); });
        socket.addEventListener('message', (event) => {
          console.log('Mensaje recibido del servidor:', event.data);
          alert('Notificación recibida');
        });

        this.tipoUsuario();
      }, error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 401) {
          this.errorService.openDialogError("Usuario bloqueado.");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Usuario no encontrado. Revisa el usuario y/o contraseña introducidos.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      });
    }
  }

  /**
   * Método que permite iniciar sesión como invitado.
   */
  loginGuest() {
    var cockie = this.backendService.getCookie();
    if (cockie) {
      cockie.esInvitado = true;
      this.backendService.setCookie(cockie);
    }
    this.router.navigate(['sidebar']);
  }
}

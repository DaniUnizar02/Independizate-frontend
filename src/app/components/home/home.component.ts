<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend/backend.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private router: Router, private http:HttpClient, private backendService: BackendService) { }

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

              this.router.navigate(['/sidebar'], { queryParams: { google: true } });
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
          plugin_name:'login',
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
      if (valor[0].tipo=="admin") {
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
    const socket = new WebSocket('ws://localhost:4000?clienteId=' + this.usuario);
    socket.addEventListener('open', () => { console.log('Conexión establecida con el servidor WebSocket'); });
    socket.addEventListener('message', (event) => {
      console.log('Mensaje recibido del servidor:', event.data);
      alert('Notificación recibida');
    });

    var body = {
      usuario: this.usuario,
      contrasegna: this.backendService.hashPassword(this.contrasena),
      rememberMe: false
    }
    
    this.backendService.postAuthLogin(body).subscribe(valor => {
      this.backendService.cookie.usuario = valor.id;
      this.backendService.cookie.nombreUsuario = body.usuario;
      this.backendService.cookie.token = valor.token;
      console.log(this.backendService.cookie.token) //LOG:
      this.backendService.cookie.esInvitado = false;
      this.backendService.setHeaders();
      this.tipoUsuario();
    }, error => {
      console.error('Error al obtener token: ', error);
    });
  }

  /**
   * Método que permite iniciar sesión como invitado.
   */
  loginGuest() {
    this.backendService.cookie.esInvitado = true;
    this.router.navigate(['sidebar']);
  }
}

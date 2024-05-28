
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

  ngOnInit() {

    this.googleAuthSDK();
  }

  validateGoogleToken(idToken: string) {
    return this.http.get<any>(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
  }

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
    console.log(body.contrasegna) //LOG:
    this.backendService.postAuthLogin(body).subscribe(valor => {
      this.backendService.cookie.usuario = valor.id;
      this.backendService.cookie.nombreUsuario = body.usuario;
      this.backendService.cookie.token = valor.token;
      this.backendService.cookie.esInvitado = false;
      this.backendService.setHeaders();
      this.tipoUsuario();
    }, error => {
      console.error('Error al obtener token: ', error);
    });
  }

  loginGuest() {
    this.backendService.cookie.esInvitado = true;
    this.router.navigate(['sidebar']);
  }
}

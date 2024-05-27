import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../../services/backend/backend.service';

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

  constructor(private router: Router, private _snackBar: MatSnackBar, private route: ActivatedRoute, private backendService: BackendService) { }
  register() {
    if (this.contrasena === this.repeatContrasena) {
      var body = {
        usuario: this.usuario,
        contrasegna: this.backendService.hashPassword(this.contrasena),
        nombre: this.nombre,
        apellidos: this.apellidos,
        correo: this.email,
        edad: parseInt(this.edad),
        sexo: this.sexo,
        piso: (this.piso==='true') ? true : false,
        ciudad: this.ciudad,
        situacion: this.situacion,
        fotoPerfil: 'default' // TODO: Meter una por defecto
      }

      this.backendService.postAuthSignup(body).subscribe(valor => {
        var body = {
          usuario: this.usuario,
          contrasegna: this.backendService.hashPassword(this.contrasena),
          rememberMe: false
        }
        this.backendService.postAuthLogin(body).subscribe(valor => {
          this.backendService.cookie.usuario = valor.id;
          this.backendService.cookie.nombreUsuario = body.usuario;
          this.backendService.cookie.token = valor.token;
          this.backendService.cookie.esInvitado = false;
          this.backendService.setHeaders();
          this.router.navigate(['sidebar']);
        }, error => {
          console.error('Error al obtener token: ', error);
        });
      }, error => {
        console.error('Error al obtener token: ', error);
      });
    }
  }

  // onSubmit(event?: Event) {
  //   if (event) {
  //     event.preventDefault();
  //   }
  //   console.log('Google: ', this.google);

  //   console.log('Form submitted')
  //   if (this.password === this.password2) {
  //     console.log('Passwords match')
  //     // Passwords match, navigate to registration page
  //     this.router.navigateByUrl('');
  //   } else {
  //     console.log('Passwords do not match')
  //     // Passwords don't match, display alert
  //     this._snackBar.open('Las contraseñas no coinciden', 'Cerrar', {
  //       duration: 3000, // Duration in milliseconds
  //       horizontalPosition: 'center', // Positioning
  //       verticalPosition: 'bottom',
  //     });
  //   }
  // }
}

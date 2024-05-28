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
        fotoPerfil: 'data:image/webp;base64,UklGRtwMAABXRUJQVlA4INAMAADwfgCdASpYAlgCPikUhkMhoQifeAwBQlpbuF3Wh6Lt78Z/7PtN/0P9S9H64kJH8O+5f8j+4+5bsB4AXszdRQAd3l8B5peIBwPtAb+ef2n0Bs7P1H00/r3/eD2kwWRXVHT/Sq6o6f6VXVHT/Sq6o6f6VXVHT/Sq6o6f6VXVHT/Sq6o6f6VXVHT/Sq6o6f6VXVHT/Sq6o6f6VXVHT/Sq6o6f6VXVHT/Sq6o6f6VXVHT/Sq6o6f6VXVHT/Sq6o6f6VXVHT/Sq6o6f6VCSdpekO0tlR1kOzyIn7YNndUdP9KhH+RO//7+ce6NISuhSNHWppx4NfCiqZT3eJPk/bBs7qjp/pVdUdHMtjRoQOSEo/bBrHJYb2gQn/VXaFV1R0/0quqOjsB3f0cqCXbINndUKcRzdjt6xdndUdP9Krqjp5w+A6F97ZIv+C9r2Z2JPvmAIkq6o6f6VXVHT+YJd0pSOn+lV1Ruxy6mJs/Ds8iJ+2DZ3USTrUYeCdCq6o6f5pD2l25Krqjp/pVdUKxp9zIv+C9sGzIlUONMAGew7PIiftg2dZYF1Bs7qjp/pVWYZb77IaOn+lV1R0/zVAGq6meRE/bBs602T/Sq6o6f6VXLOYwBzp/pVdUdPNotsBl/wXtg2d1R0/ktQq5u11R0/0quWVTWfOCu0Krqjp/pVWTYLiDlt9sGzuqOjsHDcqGXtCq6o6f6VXVCuNxlPvp+2DZ3UVoFqiPxH9oVXVHT/Sq6oVOgIQHtIlNvHT/SoX0JuWQ6h7Ds8iJ+2DZ3VG65SFfZaM+xM/gvbBW9Z24WjkW8sh2eRE/bBs7qjo6jKX3jcOm1CftfVCpTlV2VoOgdP9Krqjp/pVdUbp19bJS//8KbTUdP80iX2zEqPdGClKf6VXVHT/Sq6oX6CzSgMUsouXVHT/SNJsdQxsV3vMi/4L2wbO6o3SqRxVJ1uclV1R0/0jNsnRguw7/s6f6VXVHT/NmAtIn5/9t46f6VXVG6cdATyCgpYrqjp/pVdUK4iuDgTW/gvbBs7qjp5sboBVJB41Iv+C9sGzFwm2ZbCRvldoVXVHT/Sq5bPQdphP2rFCyHZ5CAYRoGXT5ET9sGzuqOn8mkIiud/4L2wbOsnsG3a/qFkOzyIn7YNnctkAwjoibO6o6QKlM4B0XVdUdP9Krqjp/pG0V8+v1R0/0jVb/rMvqo6f6VXVHT/Sq5ZT6RNYZR0/0jUv3qcOzyIn7YNndUdP5JThwvbjIdnkQat6h0nfbBs7qjp/pVdUdPOf4mWB4L2wWIVxV8VY2BP2wbO6o6f6VXVCutGni9KrqhUy06fbBs7qjp/pVdUdP5JSrSobO6oVoj06eSq6o6f6VXVHT/SoRdONaiAAP7/ytN87hUyAAAAAAAAAAAA51uijtTHz43CMmXloTA5m1BHQ3UqqcAcxKntZbWmaNX5UsHxMLcL4MuzZX9G+k+9kGBZDyt9uoJhUP3ZLb7bM59GAJXKlaeqOAFcnt1+QNfaxCDAV2ss2Oxiy8gEVLmCYy6tPeLLfchGBFou2uvHr2+5/PFrt3WUI0DVCKNAnCaZKL1cpwyLGgu1/w7uVwxD879Rgff0bd0m0ZTQAg5jK+aYfI4Wv1KSw4k6iP64RuLZjfqIBWMoCamPmEhLsoIVTrh6rOuB07sdF66g9Ju65F0IyXi6E0N2wvW6b0DLXdH2HnUYN9y/aaJi1n554scYv57y9Lpegeh9Ncq58QKR7trTJF7aU4zD933pf59amuJMutYdQI5hyXDK0PbxNdg1RPf8fo4KA8xKCL0l1WBkIha5Jqswy5FCHEagOaevTZ4T+EjIyItkshpmdFRWWvOOcECTQF5ZpunWaQBeYoDcH0cHpynnIT6zPPw+nu+XqIOdFzObufEPn0m/Q7TOEU5gLySpcx9XBhX7OLsyPU/CcwMZhDDaOPrWxFN/nAuSnfgFruBmFQcFP22igZ+Qc8uoon8dUU+tBRp/OzPNFf5PS60LPrWnyLgL/DdzFbo2u0slReY+g58sLLaCzApc0IarpaoenytLj+zl0uMktbwwRlDIgJlDJW7U+OY5pulw6+jRWjeQhnYlt66aqoud/loAGpoWOv9oKBfCVNSqEGvV6jxCKnYfmrBq2tHAIeD0dXxozwiaVgQ8YUNhL272YvvborIyxK38PvYzwhWKyP/fNddhpfhrbBMQXNZrJXQUh5PhXOjx4/mRX2XFY+4Ht7K+ke1rv0ye8w97clfnhzvbI1RNKxLKoYKByJ8JDez5zVqYp+sKAMX5xq7OeTvTk9WboVnOObPhxLjfQ5EwhzdyvC4GmwgZ12RoVufQsbqws2FIWclHJeuWnf5Av0s8OHRXI/NcqEkF4qSGZqRckJA5alIhPaIl4sN37jCYAyCsNuFZ4yXS9V7my1D/RlHmvICHMFjDikCbbHhjJ7lbqutNX8p+yysbspsS6SqbT+cXkbeqUoIvFpuvEUl2PA1czLoGCVaB2FPH8rsMBYNk5hy6Jc4tKjCe4GdkAdroJoj6wSMSN5HRjrQE6969U7KpalxlsU4Knq5xNuq4/gkzkE541zVhJ5yLF/A09mCaX3COKqWMl7PYBQN/6LDfnCFj54DDgPqzF0ToT+nH6HPWTgRgWh1upILz6Glyn3MoTmDLEzqQp0nbbcqQKcqfAawTZfrzSTbBsP7NIQ/45NuNqXICMc2EowgxOYcnqXST73NuLHkqLPpznty7bfO5tNqwKGbuFi62NeRRCrtX8MOcqu8XxVqCZheK8MdEvu9yJt70e8wMd8bmwe8KzHwC559/pN5KK5bt/1eugmsPprJJOn8QKqc58dPSswn48/exr5YkY8m2wdmqZL4DLnkzO+nCkMuzu5Xm4QK7ztuMDppNGoMnYFvqKq7CTy/JmmRZ1jd5xdxE7gNxZRYDgnG7I4liUkjLFgSOMZ9TI4E8B45URSQpY/nJBB0SyTYxmcEhW/3hJBBdPnqBM1Daz3/W/KcO+EE+TMdGfLXqEWat9S5QHfxPVI+6nwLYJyNJyr1DGKV2rvEnNve4/prxYA8QYDIzShLf6t6q4rir3TTo8uFjJMjxonZ9xc0MI7zaKZavZMJG7Q0icvIQv37twv2672fMOow+1RsDTd7DdCii2undJtFP3gBmJNDESskHQxu60c115w2dH6D3+JwIZ7J/fi4LWO7yxciePapzKENr5UwK6GZGpwkPnRb9y/GVcHQpGfisz2F+/5Ejh9jI9RaDg2RqXQqgnjXTe2NMI6ieSBWWK+6KzQ48hW/G6uEE60+6YSe8l7eEPzPWG4CWOkLp2/8/A727pDSb9c3gHjdLw2iwnriejIbpOXn7caOIPbj7k5jwvpoMoAXKNSOEdi4CUpifaDx0rsgjAQB48FwLDtRY79afhPS9dYpBubXKwNU3X2nOEYJ3f9oZaENAQ2bBKZWz6snq2NIM2ULCUF6Hv8ek0MPdREWt5Crf2z4WLHFG4TmmQidtPg5cPRtb/3PunUzsiebUzv5Zm45xEs/EcpP/Qgc34QbfpnaCgJvs2Js01dnp0TUzbCj7KayHmJXcPgEPqUvcMqrYB/GXQXN0VJnEmIljEqUXbpjflvhof9n5Q4/X9DiNNtxeJFMiO/ubU/aE86znl9m6u7WiTb7I4TukROZ4ZtK5E67dL1KDE+bTknfEvbXMVkbtUfMuNLa9+J/jG6ArstPexF0rsklsBBr51BA+s2CtKQnTUGCH0RbP1ZCzOyttJmImuJNzjbx/bgTAuZxiqXMh9xEhTMHbKjf0Xf664afDG43nf1XkgihxJ6NQovKu5Do8dEOCODCSEeTBNLZyUz5IWH2YsN32YuYVcjJA+h7SamUuKvfJRo3I+3Ci8d2GB9DMW6DP9ncb5BSX3e/x+3QBru4tDusAsBAAQK7jTe9HxIfAy7G5/XCABgGhCzHSe3md0dr22WQDGOnhpTGThvSIvga7mpkULjNQpAPchhnG681tLelzUoP87t06waGHd8d4ydP1W+ZfY4pbF/380bz2H7uizC+eFTqLYQrEAH6+IPxLjzJkT/Rj8iAEHg2hK4RdCctGDMvrWf6ghmMimXyG+GCjJWT+KtWwPdhn57Y+ZWcLp26BAZT+utkWAnh+Zr/1fp7ETgzpcQaYMB/KTkH9jnSd+Uazr4hi/kIuL4cU/fmeXXwL3BcLKGRyCmnWhxvNJ3A6rb7puMZJfr3JamrsrK5WFDRH0NlndzwRB9b/hfZ/SL92tZO/YBUgh3xvQUJtKHkgcrycLtAIWQYqLab83XWZHmSD74oagG1dumKvCNKNzQMmQ9Q/ayIViAJrNwsAu+t4CGsZWc/6NUFQgx5DyDKSQjuCyx78OCYAj3wSErdQlUN2kU0Z9hAA' // NOTE: Imagen por defecto
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

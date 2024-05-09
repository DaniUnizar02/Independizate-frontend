import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-piso',
  templateUrl: './info-piso.component.html',
  styleUrl: './info-piso.component.css'
})
export class InfoPisoComponent {
  id: string = '';
  respuesta = {
    idIdealista: '',
    nombre: '',
    direccion: '',
    habitaciones: '',
    tamano: '',
    precio: '',
    img: '',
    url: ''
  };

  constructor(private route: ActivatedRoute, private location: Location, private backendService: BackendService, private errorService: ErrorService) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = idParam;
    } else {
      // Manejar el caso cuando el id es null
      console.error('El parámetro id no está presente en la ruta.');
    }
  }

  //   {
  //   "suggestedTexts": {
  //     "subtitle": "Pradolongo, Madrid",
  //       "title": "Estudio en calle de Rodrigo Uhagón"
  //   },
  //   "_id": "662a01002a634eb5160548ba",
  //     "propertyCode": "102830011",
  //       "thumbnail": "https://img3.idealista.com/blur/WEB_LISTING/0/id.pro.es.image.master/f7/2c/a2/1168747004.jpg",
  //         "price": 575,
  //           "size": 25,
  //             "rooms": 0,
  //               "bathrooms": 1,
  //                 "address": "calle de Rodrigo Uhagón",
  //                   "province": "Madrid",
  //                     "municipality": "Madrid",
  //                       "latitude": 40.3846773,
  //                         "longitude": -3.7092308,
  //                           "url": "https://www.idealista.com/inmueble/102830011/",
  //                             "description": "RESERVAS E INQUIETUDES Para obtener información detallada y reservar en línea, haga clic debajo del mapa en \"Enlace adicional\". TÉRMINOS Y CONDICIONES DE ALOJAMIENTO: - Fecha de disponibilidad: 13/05/2024 - Duración mínima del alquiler: 60 días - Máximo de huéspedes: 1 - Todas las facturas incluidas: No, para obtener más información visite el sitio web - Adicional:  - Mascotas No Permitido  - Fumar No Permitido DETALLES DE LA PROPIEDAD Un estudio, con área al aire libre  - Ubicación: Ubicado on Almendrales (Usera) en Madrid con una variedad de lugares para cenar, tiendas esenciales y cosas que hacer, con fácil acceso al transporte público. 0 habitaciones en Studio con 1 baños. Características  - Air conditioning  - Outdoor area  - Wi fi  - Microwave  - Washing machine SOBRE UNIPLACES Tu Buscador de Hogares de Confianza Como plataforma en línea pionera, Uniplaces conecta a individuos, ya sean estudiantes, profesionales o familias, con una amplia gama de alojamientos en alquiler. Nuestro compromiso va más allá de las listas; verificamos cada propiedad para asegurarnos de que cumpla con nuestros estrictos criterios de comodidad y conveniencia. Elija Uniplaces para un viaje de alquiler suave, confiable y con una buena relación calidad-precio."
  // }

  ngOnInit() {
    this.backendService.getApartmentsId(this.id).subscribe(
      response => {
        this.respuesta = {
          idIdealista: response.propertyCode,
          nombre: response.suggestedTexts.title,
          direccion: response.address,
          habitaciones: response.room + " habitaciones",
          tamano: response.size + " m2",
          precio: response.price + "€",
          img: response.thumbnail,
          url: response.url
        }
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

  // NOTE: Conversación

  navigateToIdealista(url: string) {
    window.location.href = url;
  }

  goBack(): void {
    this.location.back();
  }
}

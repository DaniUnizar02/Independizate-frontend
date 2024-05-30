
/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de mostrar el mapa de geoserver con
 * sus diferentes marcadores.
 * 
 * Archivo: mapa.component.ts 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import * as L from 'leaflet';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { Router } from '@angular/router';


const customIcon = L.icon({
  iconUrl: 'assets/img/marker.png',
  iconSize: [40, 40], // Set the size of your icon
  // iconAnchor: [anchorX, anchorY], // Set the anchor point of your icon
  // popupAnchor: [popupX, popupY] // Set the popup anchor if needed
});

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  tarjetas: any[] = [];
  private todos: any[] = [];
  private respuesta: any[] = [];
  private map: any;
  private markers: any[] = [];

  constructor(private location: Location, private router: Router, private backendService: BackendService, private errorService: ErrorService) {
    this.backendService.getAparments().subscribe(
      response => {
        this.respuesta = response.apartments
        for (const item of this.respuesta) {
          var data = {
            idIdealista: item.propertyCode,
            piso: item.suggestedTexts.title,
            direccion: item.address,
            descripcion: item.description,
            precio: item.price + "€",
            img: item.thumbnail,
            latitud: item.latitude,
            longitud: item.longitude,
          }

          this.todos.push(data);
        }
        this.todos = this.todos.reverse()
        this.tarjetas = this.todos;

        this.markers = [];
        for (const item of this.tarjetas) {
          var data2 = {
            id: item.idIdealista,
            lat: item.latitud,
            lng: item.longitud,
            text: item.piso,
            imageUrl: item.img
          }
          this.markers.push(data2);
        }

        this.initMap();
        this.addMarkers();
      },
      error => {
        if (error.status === 404) {
          this.errorService.openDialogError("No se han encontrado pisos.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * La función initMap() se encarga de inicializar el mapa de Leaflet en la latitud
   * y longitud marcada por "markers[0]".
   */
  private initMap(): void {
    this.map = L.map('map', {
      center: [this.markers[0].lat, this.markers[0].lng], // Latitude and Longitude
      zoom: 12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  /**
   * La función addMarkers() se encarga de añadir los marcadores al mapa.
   */
  private addMarkers(): void {
    for (const markerData of this.markers) {
      const { lat, lng, text, imageUrl, id } = markerData;

      // Create a marker
      const marker = L.marker([lat, lng]).setIcon(customIcon);

      // Create popup (text and image)
      const popupContentElement = document.createElement('div');
      popupContentElement.style.display = 'flex';
      popupContentElement.style.flexDirection = 'column';
      popupContentElement.style.justifyContent = 'center';
      popupContentElement.innerHTML = `
        <h3>${text}</h3>
        <img src="${imageUrl}" alt="Marker Image" style="width: 100px; height: auto;">
        <button mat-flat-button color="primary">Ver detalles</button>
      `;
      marker.bindPopup(popupContentElement); // Bind popup to marker

      // Add event listener to marker popup open
      marker.on('popupopen', () => {
        const popup = marker.getPopup();
        if (popup) {
          const button = popupContentElement.querySelector('button');
          if (button instanceof HTMLElement) {
            button.addEventListener('click', () => {
              this.navigateToInfoPiso(id);
            });
          }
        }
      });

      // Add the marker to the map
      marker.addTo(this.map);
    }
  }

  // NOTE: Info piso
  /**
   * La función navigateToInfoPiso() se encarga de navegar a la página de información del piso
   * seleccionado en el mapa.
   */
  navigateToInfoPiso(id: string) {
    this.router.navigate(['sidebar', 'info-piso', id]);
  }

  ngOnInit() {
    // NOTE: Responsive
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';
  }

  goBack(): void {
    this.location.back();
  }

  // NOTE: RESPONSIVE
  rowHeightTit: string = '2:1'

  onResize(event: any) {
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}

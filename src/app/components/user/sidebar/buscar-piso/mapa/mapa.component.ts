import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  private map: any;
  private markers: any[] = [
    { lat: 41.64, lng: -0.89, text: 'Marker 1', imageUrl: 'assets/img/exampleBuilding.png' },
    { lat: 41.654, lng: -0.92, text: 'Marker 2', imageUrl: 'assets/img/exampleBuilding.png' },
    { lat: 41.651, lng: -0.91, text: 'Marker 3', imageUrl: 'assets/img/exampleBuilding.png' }
    
  ];
  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [41.65, -0.9], // Latitude and Longitude
      zoom: 12 
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private addMarkers(): void {
    for (const markerData of this.markers) {
      const { lat, lng, text, imageUrl } = markerData;

      // Create a marker
      const marker = L.marker([lat, lng]);

      // Create popup (text and image)
      const popupContent = `
        <div>
          <h3>${text}</h3>
          <img src="${imageUrl}" alt="Marker Image" style="width: 100px; height: auto;">
        </div>
      `;
      marker.bindPopup(popupContent); // Bind popup to marker

      // Add the marker to the map
      marker.addTo(this.map);
    }
  }
}

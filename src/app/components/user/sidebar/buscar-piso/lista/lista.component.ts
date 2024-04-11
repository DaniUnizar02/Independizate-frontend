import { Component } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  tarjetas = [
    { piso: 'Apartamento luminoso en el centro', direccion: 'Calle Mayor, 123', descripcion: 'Amplio apartamento de 2 habitaciones con mucha luz natural y vistas panorámicas.', precio: '750€/mes' },
    { piso: 'Ático con terraza', direccion: 'Avenida Libertad, 456', descripcion: 'Ático moderno de 3 habitaciones con terraza privada y vistas a la ciudad.', precio: '1000€/mes' },
    { piso: 'Piso reformado en barrio histórico', direccion: 'Plaza España, 789', descripcion: 'Acogedor piso recién reformado de 1 habitación en el corazón del barrio antiguo.', precio: '600€/mes' },
    { piso: 'Dúplex con encanto', direccion: 'Calle Alameda, 1011', descripcion: 'Dúplex espacioso de 4 habitaciones con diseño moderno y acabados de alta calidad.', precio: '1200€/mes' },
    { piso: 'Piso luminoso cerca del parque', direccion: 'Calle Rosales, 1213', descripcion: 'Piso de 3 habitaciones con balcón y vistas al parque. Ideal para familias.', precio: '850€/mes' },
    { piso: 'Estudio céntrico', direccion: 'Calle Gran Vía, 1415', descripcion: 'Acogedor estudio completamente amueblado y equipado en el centro de la ciudad.', precio: '500€/mes' },
    { piso: 'Casa adosada con jardín', direccion: 'Calle Serrano, 1617', descripcion: 'Espaciosa casa adosada de 5 habitaciones con jardín privado y zona de barbacoa.', precio: '1500€/mes' },
    { piso: 'Piso de diseño en zona exclusiva', direccion: 'Avenida Diagonal, 1819', descripcion: 'Piso de lujo de 2 habitaciones con vistas al mar y piscina comunitaria.', precio: '2000€/mes' },
    { piso: 'Apartamento reformado con vistas', direccion: 'Calle Provença, 2021', descripcion: 'Apartamento recién renovado de 1 habitación con vistas a la montaña y cerca del transporte público.', precio: '700€/mes' },
    { piso: 'Piso luminoso con garaje', direccion: 'Calle Valencia, 2223', descripcion: 'Piso de 3 habitaciones con amplio salón-comedor y plaza de garaje incluida en el precio.', precio: '900€/mes' },
  ];
}

import { Component } from '@angular/core';
import { BuscarPisoComponent } from '../buscar-piso.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  tarjetas: any[] = [];
  
  constructor(private router: Router, private buscarPisoComponent: BuscarPisoComponent) { }

  ngDoCheck() {
    this.tarjetas = this.buscarPisoComponent.tarjetas;
    // console.log('Posts (CP): ',this.posts); // LOG:
  }

  // NOTE: Info piso

  navigateToInfoPiso(id: string) {
    this.router.navigate(['sidebar','info-piso', id]);
  }

  // NOTE: Paginator

  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;
  highValue: number = this.pageSize;

  getPaginatorData(event: { pageIndex: number; }) {
    console.log(event);
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    }
    else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }
}

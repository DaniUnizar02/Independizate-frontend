import { Component } from '@angular/core';
import { BackendService } from '../../../../../services/backend/backend.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BuscarPisoComponent } from '../buscar-piso.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  tarjetas: any[] = [];
  
  constructor(private buscarPisoComponent: BuscarPisoComponent) { }

  ngDoCheck() {
    this.tarjetas = this.buscarPisoComponent.tarjetas;
    // console.log('Posts (CP): ',this.posts); // LOG:
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

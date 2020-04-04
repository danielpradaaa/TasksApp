import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {
    this.cargarStorage();
  }

  getAllListas(): Lista[] {
    return this.listas;
  }

  getListaDetallada(id: string | number) {
    id = Number(id);
    return this.listas.find(listaData => listaData.id === id);
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.saveStorage();
    return nuevaLista.id;
  }

  saveStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  deleteList(list: Lista) {
    this.listas = this.listas.filter(listData => listData.id !== list.id);
    this.saveStorage();
  }


  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    }
  }
}

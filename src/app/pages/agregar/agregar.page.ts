import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from 'src/app/models/lista.item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  listaDetallada: Lista;
  nameItemToAdd = '';

  constructor(private deseosService: DeseosService, private router: ActivatedRoute) {
    const listaId = this.router.snapshot.paramMap.get('listaId');
    this.listaDetallada = deseosService.getListaDetallada(listaId);
    // console.log(this.listaDetallada);
  }

  ngOnInit() {}

  addItemToList() {
    if (this.nameItemToAdd.length === 0) {
      return;
    }
    const newItem = new ListaItem(this.nameItemToAdd);
    this.listaDetallada.items.push(newItem);
    this.nameItemToAdd = '';
    this.deseosService.saveStorage();
  }

  changeCheck(item: ListaItem) {
    // console.log(item);
    const pendientes = this.listaDetallada.items.filter(itemData => !itemData.completed).length;
    // console.log({pendientes});

    if (pendientes === 0) {
      this.listaDetallada.terminadaEn = new Date();
      this.listaDetallada.completada = true;
    } else {
      this.listaDetallada.terminadaEn = null;
      this.listaDetallada.completada = false;
    }

    this.deseosService.saveStorage();
  }

  deleteItem(i: number) {
    this.listaDetallada.items.splice(i, 1);
    this.deseosService.saveStorage();
  }

}

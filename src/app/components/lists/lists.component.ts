import { AlertController, IonList } from '@ionic/angular';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  @Input() finished = true;
  @ViewChild(IonList, null) lista: IonList;

  constructor(public deseosService: DeseosService, private router: Router, private alertControler: AlertController) {}

  ngOnInit() { }

  selectedList(lista: Lista, index: number) {
    // console.log({lista});
    if (this.finished) {
      this.router.navigateByUrl('/tabs/tab2/agregar/' + lista[index].id);
    } else {
      this.router.navigateByUrl('/tabs/tab1/agregar/' + lista[index].id);
    }
    // console.log(lista[index]);
    return lista.tittle;
  }

  deleteListXX(list: Lista) {
    this.deseosService.deleteList(list);
  }

  async editListName(list: Lista) {
    const alert = await this.alertControler.create({
      header: 'Edit list name',
      inputs: [
        {
          name: 'titulo',
          value: list.tittle,
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
            console.log('Cancelado')
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            // console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
            list.tittle = data.titulo;
            console.log(list.tittle);
            this.deseosService.saveStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }


}

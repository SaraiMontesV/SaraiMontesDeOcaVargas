import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  movieInfo: any;

  constructor(private navParams: NavParams, public modalController: ModalController) {}

  ngOnInit() {
    this.movieInfo = this.navParams.get('movie');
  }

  async closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpServiceService } from '@app/@shared/services/http-service.service';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { AboutComponent } from '@app/about/about.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  moviesData: Subscription = new Subscription();
  listMovies = [];
  category: string = '';
  filterActive = false;

  constructor(
    private httpService: HttpServiceService,
    public loadingController: LoadingController,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  ngOnDestroy(): void {
    this.moviesData.unsubscribe();
  }

  async getMovies() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
    });
    await loading.present();

    this.moviesData = (await this.httpService.getMovies()).subscribe(async (dataMovies: any) => {
      this.listMovies = [];
      this.listMovies = dataMovies;
      this.filterActive = false;
      await loading.dismiss();
    });
  }

  async getMoviesFilter() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
    });
    await loading.present();

    this.moviesData = (await this.httpService.getMoviesFilter(this.category)).subscribe(async (dataMovie: any) => {
      this.listMovies = [];
      this.listMovies = dataMovie;
      this.filterActive = true;
      await loading.dismiss();
    });
  }

  async openModal(item: any) {
    let movieIs: any;
    if (this.filterActive) {
      movieIs = item.show;
    } else {
      movieIs = item;
    }
    const modal = await this.modalController.create({
      component: AboutComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        movie: movieIs,
      },
    });
    return await modal.present();
  }
}

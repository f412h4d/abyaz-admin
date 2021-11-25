import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { LoadingController } from '@ionic/angular';
import { Order, Request } from '../../types';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  orders: Order[] = [];
  requests: Request[] = [];
  loading = true;
  error = false;

  constructor(
    private message: MessageService,
    private homeService: HomeService,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.loadingCtrl
      .create({
        message: 'در حال بارگذاری اطلاعات',
        cssClass: 'my-custom-loading',
        duration: 6,
        mode: 'md',
      })
      .then((loadingEl) => {
        loadingEl.present().then(() => {
          this.homeService.homeData().subscribe(
            (result) => {
              this.loading = result.loading;
              this.orders = result.data.orders;
              this.requests = result.data.requests;
              loadingEl.dismiss().then();
            },
            (err) => {
              console.error({ err });
              this.error = true;
              this.message.toast('خطایی رخ داده است');
              loadingEl.dismiss().then();
            },
          );
        });
      });
  }
}

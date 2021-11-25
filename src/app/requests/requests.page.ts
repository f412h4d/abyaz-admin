import { Component, OnInit } from '@angular/core';
import { Request } from '../../types';
import { MessageService } from '../services/message.service';
import { LoadingController } from '@ionic/angular';
import { RequestsService } from './requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  requests: Request[] = [];
  loading = true;
  error = false;

  constructor(
    private message: MessageService,
    private loadingCtrl: LoadingController,
    private requestService: RequestsService,
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
          this.requestService.allRequests().subscribe(
            (result) => {
              this.requests = result.data.requests;
              this.loading = result.loading;
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

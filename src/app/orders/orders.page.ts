import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Order } from '../../types';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: Order[] = [];
  loading = true;
  error = false;

  constructor(
    private message: MessageService,
    private ordersService: OrdersService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
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
          this.ordersService.allOrders().subscribe(
            (result) => {
              this.orders = result.data.orders;
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

  async showDeleteOrderConfirm({ id, name }) {
    const alert = await this.alertCtrl.create({
      cssClass: 'delete-confirm-alert',
      header: 'تایید حذف',
      message: `سفارش <strong>${name}</strong> حذف شود ؟`,
      mode: 'md',
      buttons: [
        {
          text: 'لغو',
          role: 'cancel',
        },
        {
          text: 'حدف',
          role: 'delete',
          cssClass: 'red',
          handler: () => {
            this.deleteOrderHandler(id);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteOrderHandler(orderId: string) {
    const loader = await this.loadingCtrl.create({
      message: 'در حال حذف سفارش',
      duration: 5000,
      mode: 'md',
    });

    await loader.present();

    this.ordersService.deleteOrder(orderId).subscribe({
      next: (result) => {
        if (!result.data.order.id) {
          return this.message.toast(`خطایی رخ داد`);
        }

        this.message.toast(
          `سفارش <strong>${result.data.order.user.FName}</strong> حذف شد`,
        );
      },
      error: (error) => {
        console.error(error);
        this.message.toast(`خطایی رخ داد`);
      },
      complete: async () => await loader.dismiss(),
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Order } from '../../types';
import { MessageService } from '../services/message.service';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  numberOfSelections: number = 0;

  orders: (Order & { selected?: boolean })[] = [];
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
          this.ordersService
            .allOrders()
            .pipe(
              map((result) => {
                return {
                  ...result,
                  data: {
                    ...result.data,
                    orders: result.data.orders.map((order) => {
                      return { ...order, selected: false };
                    }),
                  },
                };
              }),
            )
            .subscribe(
              (result) => {
                console.log(result);
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

  async showDeleteOrderConfirm({ id, name, isMulti }) {
    const alert = await this.alertCtrl.create({
      cssClass: 'delete-confirm-alert',
      header: 'تایید حذف',
      message: !isMulti
        ? `سفارش <strong>${name}</strong> حذف شود ؟`
        : `آیا <strong>${this.numberOfSelections} مورد انتخاب شده</strong> حذف شود ؟`,

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
          handler: isMulti
            ? () => {
                this.deleteSelectedOrdersHandler();
              }
            : () => {
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

  selectOrder(id: string) {
    let counter = 0;

    this.orders.forEach((order) => {
      if (order.id === id) {
        order.selected = !order.selected;
      }

      if (order.selected) {
        counter++;
      }
    });

    this.numberOfSelections = counter;
  }

  async deleteSelectedOrdersHandler() {
    const loader = await this.loadingCtrl.create({
      message: 'در حال حذف سفارش ها',
      duration: 5000,
      mode: 'md',
    });

    await loader.present();

    this.ordersService
      .deleteOrders(
        this.orders.filter((order) => order.selected === true).map((order) => order.id),
      )
      .subscribe({
        next: (result) => {
          if (!result.data) {
            return this.message.toast(`خطایی رخ داد`);
          }

          this.message.toast(`سفارش های مورد نظر حذف شد`);

          this.orders = result.data.orders;
        },
        error: (e) => {
          console.log(e);
          this.message.toast(`خطایی رخ داد`);
        },
        complete: async () => await loader.dismiss(),
      });
  }

  async markAsReadSelectedOrdersHandler() {
    const loader = await this.loadingCtrl.create({
      message: 'در حال پردازش سفارش ها',
      duration: 5000,
      mode: 'md',
    });

    await loader.present();

    const selectedOrdersIds = this.orders
      .filter((order) => order.selected === true)
      .map((order) => order.id);

    this.ordersService.updateOrdersStatus(selectedOrdersIds, 1).subscribe({
      next: (result) => {
        if (!result.data) {
          return this.message.toast(`خطایی رخ داد`);
        }

        this.message.toast(`سفارش های مورد نظر تغیر کرد`);

        this.orders = result.data.orders;
      },
      error: (e) => {
        console.log(e);
        this.message.toast(`خطایی رخ داد`);
      },
      complete: async () => await loader.dismiss(),
    });
  }
}

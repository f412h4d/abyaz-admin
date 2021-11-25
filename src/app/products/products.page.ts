import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Product } from '../../types';
import { MessageService } from '../services/message.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  loading = true;
  error = false;

  constructor(
    private message: MessageService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private productsService: ProductsService,
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
          this.productsService.allProducts().subscribe(
            (result) => {
              this.products = result.data.products;
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

  async showDeleteProductConfirm({ id, name }) {
    const alert = await this.alertCtrl.create({
      cssClass: 'delete-confirm-alert',
      header: 'تایید حذف',
      message: ` <strong>${name}</strong> حذف شود ؟`,
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
            this.deleteProductHandler(id);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteProductHandler(productId: string) {
    const loader = await this.loadingCtrl.create({
      message: 'در حال حذف محصول',
      duration: 5000,
      mode: 'md',
    });

    await loader.present();

    this.productsService.deleteProduct(productId).subscribe({
      next: (result) => {
        if (!result.data.product.id) {
          return this.message.toast(`خطایی رخ داد`);
        }

        this.message.toast(`کالا ی <strong>${result.data.product.name}</strong> حذف شد`);
      },
      error: (error) => {
        console.error(error);
        this.message.toast(`خطایی رخ داد`);
      },
      complete: async () => await loader.dismiss(),
    });
  }
}

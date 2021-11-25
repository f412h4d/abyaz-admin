import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DecimalPipe } from '@angular/common';
import { ProductsService } from '../products/products.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  name: string;
  details: string;
  price: string;
  isColor: boolean;

  constructor(
    private decimal: DecimalPipe,
    private navCtrl: NavController,
    private message: MessageService,
    private loadingCtrl: LoadingController,
    private productsService: ProductsService,
  ) {}

  ngOnInit() {
    const select: any = document.querySelector('.custom-options');
    select.interfaceOptions = {
      cssClass: 'my-custom-interface',
    };
  }

  back() {
    this.navCtrl.back();
  }

  isColorChanged(event: any) {
    this.isColor = event.detail.value;
  }

  onPriceChange(event: any) {
    this.price = this.decimal.transform(
      event.target.value.replace(',', '').replace(',', ''),
      '3.0-0',
    );
  }

  onAdd() {
    this.loadingCtrl
      .create({
        message: 'در حال بارگذاری اطلاعات',
        cssClass: 'my-custom-loading',
        duration: 6,
        mode: 'md',
      })
      .then((loadingEl) => {
        loadingEl.present().then(() => {
          this.productsService
            .addProduct(
              this.name,
              this.details,
              +this.price.replace(',', '').replace(',', ''),
              this.isColor,
            )
            .subscribe(
              (result) => {
                this.message.toast('ثبت محصول موفقیت آمیز بود');
                loadingEl.dismiss().then(() => {
                  this.navCtrl
                    .navigateForward('/edit-product/' + result.data.product.id)
                    .then();
                });
              },
              (err) => {
                console.error({ err });
                this.message.toast('خطایی رخ داده است');
                loadingEl.dismiss().then();
              },
            );
        });
      });
  }
}

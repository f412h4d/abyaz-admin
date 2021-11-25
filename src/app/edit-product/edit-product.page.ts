import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { MessageService } from '../services/message.service';
import { ProductsService } from '../products/products.service';
import { File, Product } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  productId: string;
  product: Product;
  loading = true;
  error = false;

  name: string;
  details: string;
  price: string;
  isColor: boolean;

  // Picture Section
  selectedFiles: FileList;
  currentFileUpload: any;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  imgURL: string | ArrayBuffer;
  pictureRefresh: boolean;
  productPicture: File;

  constructor(
    public route: ActivatedRoute,
    public decimal: DecimalPipe,
    private navCtrl: NavController,
    private message: MessageService,
    private uploadService: UploadService,
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
          this.productId = this.route.snapshot.paramMap.get('productId');
          this.productsService.findProductById(this.productId).subscribe(
            (result) => {
              this.product = result.data.product;
              this.productPicture = this.product.picture;
              this.name = this.product.name;
              this.details = this.product.details;
              this.price = this.decimal.transform(this.product.price, '3.0-0');
              this.isColor = this.product.isColor;
              this.loading = result.loading;
              loadingEl.dismiss().then(() => {
                const select: any = document.querySelector('.custom-options');
                select.interfaceOptions = {
                  cssClass: 'my-custom-interface',
                };
              });
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

  back() {
    this.navCtrl.back();
  }

  upload() {
    if (!this.selectedFiles) {
      this.message.toast('ابتدا تصویر جدید را انتخاب کنید');
      return;
    }
    this.pictureRefresh = false;
    this.loadingCtrl.create({ message: 'در حال آپلود تصویر' }).then((loadingEl) => {
      loadingEl.present().then(() => {
        this.progress.percentage = 0;
        this.currentFileUpload = this.selectedFiles.item(0);
        this.uploadService
          .updateProductPicture(this.currentFileUpload, this.productId)
          .subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress.percentage = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.productPicture = event.body.picture;
              this.message.toast('تصویر جدید ذخیره شد');
              this.pictureRefresh = true;
              loadingEl.dismiss().then();
            }
            this.selectedFiles = undefined;
          });
      });
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.imgURL = window.URL.createObjectURL(this.selectedFiles[0]);

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      (document.getElementById('pic') as any).src = reader.result;
    };
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

  onEdit() {
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
            .editProduct(
              this.productId,
              this.name,
              this.details,
              +this.price.replace(',', '').replace(',', ''),
              this.isColor,
            )
            .subscribe(
              () => {
                this.message.toast('ثبت محصول موفقیت آمیز بود');
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

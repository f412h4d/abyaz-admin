import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as moment from 'moment-jalaali';
import { PersianDatePipe } from 'src/shared/persian-date.pipe';
import { Order } from '../../types';
import { OrdersService } from '../orders/orders.service';
import { MessageService } from '../services/message.service';
import { addFont, logo } from './assets.encoded';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  private orderId: string;

  order: Order;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private service: OrdersService,
    private navCtrl: NavController,
    private message: MessageService,
    private loadingCtrl: LoadingController,
    private readonly persianDatePipe: PersianDatePipe
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
          this.orderId = this.route.snapshot.paramMap.get('orderId');
          this.service.findOrderById(this.orderId).subscribe(
            (result) => {
              this.order = result.data.order;

              if (this.order.status === 0) {
                this.service.updateOrderStatus(this.orderId, 1).subscribe(null);
              }

              this.loading = result.loading;
              loadingEl.dismiss().then();
            },
            (err) => {
              console.error({ err });
              this.error = true;
              this.message.toast('خطایی رخ داده است');
              loadingEl.dismiss().then();
            }
          );
        });
      });
  }

  back() {
    this.navCtrl.back();
  }

  createPDF() {
    addFont();

    const doc: any = new jsPDF({
      orientation: 'p',
      format: 'a4',
      filters: ['ASCIIHexEncode'],
    });
    doc.setFont('IRANSans');

    const headerText = 'ابیض شیمی';
    const today = `${moment(new Date()).format('jYYYY/jMM/jDD')}  : تاریخ `;

    doc.setFontSize(16);
    doc.addImage(logo, 'JPEG', 95, 8, 20, 20);
    doc.text(today, 15, 20, { isInputRtl: false, align: 'left' });
    doc.text(headerText, 195, 20, { isInputRtl: false, align: 'right' });
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, 'S');

    doc.setFontSize(11);
    doc.setTextColor(100);

    const styles = { halign: 'center', font: 'IRANSans' };

    const head = [
      [
        {
          content: 'قیمت کل',
          styles,
        },
        {
          content: 'تعداد',
          styles,
        },
        {
          content: 'فی',
          styles,
        },
        {
          content: 'محصول',
          styles,
        },
      ],
    ];

    const body = [
      ...this.order.items.map((item) => {
        return [
          {
            content: item.product.price * item.quantity,
            styles,
          },
          {
            content: item.quantity,
            styles,
          },
          {
            content: item.product.price,
            styles,
          },
          {
            content: item.product.name,
            styles,
          },
        ];
      }),
    ];

    const transitHead = [
      [
        {
          content: 'باربری',
          styles,
        },
      ],
    ];

    const transitBody = [
      [
        {
          content: 'مبلغ ۷۰,۰۰۰ تومان بابت هزینه ی باربری به فاکتور اضافه شد',
          styles,
        },
      ],
    ];

    doc.autoTable({
      head,
      body,
      margin: { top: 36 },
      theme: 'grid',
    });

    if (this.order.transit !== 'خودم') {
      doc.autoTable({
        head: transitHead,
        body: transitBody,
        margin: { top: 36 },
        theme: 'grid',
      });
    }

    // Order Details Table
    const orderHead = [
      [
        {
          content: ': کد سفارش',
          styles,
        },
        {
          content: ': مشتری',
          styles,
        },
        {
          content: ': تاریخ سفارش',
          styles,
        },
        {
          content: ': مبلغ کل',
          styles,
        },
      ],
    ];

    // Order Details Table
    const orderDetails = [
      [
        {
          content: this.order.orderId,
          styles,
        },

        {
          content: this.order.user.FName,
          styles,
        },

        {
          content: this.persianDatePipe.transform(this.order.created),
          styles,
        },
        {
          content: this.order.total + (this.order.transit !== 'خودم' ? 70000 : 0),
          styles,
        },
      ],
    ];

    // Order Details Table
    doc.autoTable({
      head: orderHead,
      body: orderDetails,
      margin: { top: 36 },
      theme: 'plain',
    });

    // Location Table
    const locationHead = [
      [
        {
          content: ': تلفن',
          styles,
        },
        {
          content: ': باربری',
          styles,
        },
        {
          content: ': شهر',
          styles,
        },
        {
          content: ': نشانی',
          styles,
        },
      ],
    ];

    // Location Table
    const locationDetails = [
      [
        {
          content: this.order.phoneNumber,
          styles,
        },

        {
          content: this.order.address,
          styles,
        },

        {
          content: this.order.city,
          styles,
        },
        {
          content: this.order.details !== 'undefined' ? this.order.details : 'نامشخص',
          styles,
        },
      ],
    ];

    // Location Table
    doc.autoTable({
      head: locationHead,
      body: locationDetails,
      margin: { top: 36 },
      theme: 'plain',
    });

    // below line for Open PDF document in new tab
    // doc.output('dataurlnewwindow');

    // below line for Download PDF document
    doc.save(
      `${this.persianDatePipe.transform(this.order.created)}-سفارش_${this.order.orderId}_${this.order.user.FName}.pdf`
    );
  }
}

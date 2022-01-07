import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import { Order } from 'src/types';
import { OrdersService } from '../orders/orders.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss'],
})
export class PrintPage implements OnInit {
  private orderId: string;

  order: Order;
  loading = true;
  error = false;

  today = new Date();

  constructor(
    private route: ActivatedRoute,
    private service: OrdersService,
    private message: MessageService,
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
            },
          );
        });
      });
  }

  async onExport({ code, name }) {
    const table = document.getElementById('print');

    const width = table.offsetWidth;
    const height = table.offsetHeight * 10;

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: [width, height],
    });

    const dataUrl = await domtoimage.toPng(table, {
      height,
      width,
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);

    pdf.save(`سفارش_${code}_${name}.pdf`);
  }
}

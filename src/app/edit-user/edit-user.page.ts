import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { User } from '../../types';
import { MessageService } from '../services/message.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  private userId: string;

  user: User;
  debt: string;
  error = false;
  loading = true;

  constructor(
    public decimal: DecimalPipe,
    private route: ActivatedRoute,
    private service: UsersService,
    private navCtrl: NavController,
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
          this.userId = this.route.snapshot.paramMap.get('userId');
          this.service.findUserById(this.userId).subscribe(
            (result) => {
              this.user = result.data.user;
              this.debt = result.data.user.debt + '';
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

  back() {
    this.navCtrl.back();
  }

  onPriceChange(event: any) {
    this.debt = this.decimal.transform(
      event.target.value.replace(',', '').replace(',', ''),
      '3.0-0',
    );
  }

  onSubmitChanges() {
    this.loadingCtrl
      .create({
        message: 'در حال بارگذاری اطلاعات',
        cssClass: 'my-custom-loading',
        duration: 6,
        mode: 'md',
      })
      .then((loadingEl) => {
        loadingEl.present().then(() => {
          this.service
            .updateUserDebt(this.userId, +this.debt.replace(',', '').replace(',', ''))
            .subscribe(
              (result) => {
                this.debt = result.data.user.debt + '';
                this.user.debt = result.data.user.debt;
                this.message.toast('اطلاعات کاربر با موفقیت تغیر یافت');
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

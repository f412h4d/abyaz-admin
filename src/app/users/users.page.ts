import { Component, OnInit } from '@angular/core';
import { User } from '../../types';
import { MessageService } from '../services/message.service';
import { LoadingController } from '@ionic/angular';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: User[] = [];
  loading = true;
  error = false;

  constructor(
    private message: MessageService,
    private usersService: UsersService,
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
          this.usersService.allUsers().subscribe(
            (result) => {
              this.users = result.data.users;
              console.log(this.users);
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

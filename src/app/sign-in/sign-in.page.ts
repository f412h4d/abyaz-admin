import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  username: string;
  password: string;

  constructor(
    private navCtrl: NavController,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  signIn() {
    if (this.username === 'abyaz' && this.password === 'Abyaz$2021') {
      localStorage.setItem('admin-isAuthenticated', 'true');

      this.navCtrl.navigateForward('/home').then(() => {
        this.messageService.toast('خوش آمدید');
      });
    } else {
      this.messageService.toast('ورودی نامعتبر');
    }
  }
}

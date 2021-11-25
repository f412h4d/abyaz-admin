import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class SignedInGuard implements CanLoad {
  constructor(
    private navCtrl: NavController,
    private messageService: MessageService
  ) {}

  canLoad() {
    const isAuthenticated =
      localStorage.getItem('admin-isAuthenticated') === 'true';
    if (isAuthenticated === null || !isAuthenticated) {
      this.messageService.toast('برای دسترسی به این قسمت باید ابتدا وارد شوید');
      this.navCtrl.navigateBack('/sign-in').then();
      return false;
    } else {
      return true;
    }
  }
}

import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(
        private toastCtrl: ToastController
    ) {
    }

    public toast(message: string) {
        this.toastCtrl.create({
            message,
            mode: 'md',
            duration: 3000,
            position: 'bottom',
            cssClass: 'my-custom-toast-css'
        }).then(toastEl => {
            toastEl.present().then();
        });
    }
}

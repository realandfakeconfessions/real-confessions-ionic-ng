import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 3000
  });

  await toast.present();
 }
}

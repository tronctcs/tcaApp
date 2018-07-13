import { Injectable } from '@angular/core';
import { ToastController, Toast } from 'ionic-angular';

@Injectable()
export class ToastServices{
    toast: Toast = null;

    constructor(private toastCtrl: ToastController){ }

    presentToast(text:string,pos:string, style:string=''):void{
        let toastData = {
            message: text,
            duration: 3000,
            position: pos,
            cssClass: style
        }

        this.showToast(toastData);
    }

    presentClosableToast(text:string,pos:string, style:string=''):void{
        let toastData = {
            message: text,
            showCloseButton: true,
            closeButtonText: 'Dismiss',
            position: pos ,
            cssClass: style
        };

        this.showToast(toastData);
    }

    private showToast(data:any):void{
        this.toast ? this.toast.dismiss() : false;
        this.toast = this.toastCtrl.create(data);
        this.toast.present();
    }
}
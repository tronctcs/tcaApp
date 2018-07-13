import { Network } from '@ionic-native/network';
import { Injectable } from "@angular/core";
import { ToastServices } from './toastServices';

@Injectable()
export class NetworkServices {
    constructor(public network: Network, public toastServices: ToastServices) {

    }

    initilizeNetworkEvents() {
        this.network.onDisconnect().subscribe(() => {
            this.toastServices.presentClosableToast('You are offline','bottom','errorToast');
        });
        this.network.onConnect().subscribe(() => {
            this.toastServices.presentClosableToast('Back Online','bottom','successToast');
        });
    }
}
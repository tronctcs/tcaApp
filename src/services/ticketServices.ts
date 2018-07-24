import { Injectable } from "@angular/core";
import { Device } from "@ionic-native/device";
import { Http, Response } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Tickets } from "../models/tickets";
import { AlertController } from "ionic-angular";

@Injectable()
export class TicketServices {
    private deviceId: string = '';
    public tickets: Tickets[] = [];

    constructor(public device: Device, private http: Http, public storage: Storage,
        public alertCntrl: AlertController) {
        this.deviceId = this.device.uuid;
        if (!this.deviceId) {
            this.deviceId = '0000';
        }
    }

    getAllTickets(val) {
        return this.http.get('https://stagetca.tronc.com/api/tca/get?token=' + val)
            .map((response: Response) => {
                return response.json();
            }).do((data) => {
                this.tickets = data;
            });

    }

    getTicketDetails(id: string) {
        let tkt;
        for (var i = 0; i < this.tickets.length; i++) {
            if (this.tickets[i].IncId === id) {
                tkt = this.tickets[i];
            }
        }
        return tkt;
    }

    claimTicket(IncId: string, val: string) {
        return this.http.get('https://stagetca.tronc.com/api/tca/claimInc?IncId=' + IncId + '&token=' + val)
            .map((response: Response) => {
                return response.json();
            }).do((data) => {
                this.tickets = data;
            });
    }

    public handleAlert(error: string, title: string) {
        title = title === 's' ? 'Success!!!' : 'Error!!!';
        const alert = this.alertCntrl.create({
            message: error,
            title: title,
            buttons: ['Ok']
        });
        alert.present();
    }
}
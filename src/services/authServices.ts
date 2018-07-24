import { Device } from "@ionic-native/device";
import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Storage } from "@ionic/storage";

@Injectable()
export class AuthServices {
    private deviceId: string = '';

    constructor(public device: Device, private http: Http, public storage: Storage) {
        this.deviceId = this.device.uuid;
        if (!this.deviceId) {
            this.deviceId = '0000';
        }
    }


    signIn(userid: string, password: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = "userid=" + userid.toLowerCase() + "&password=" + btoa(password) + "&deviceid=" + this.deviceId;

        return new Promise((resolve) => {
            this.http.post("https://stagetca.tronc.com/api/tca/IsLogin", body, { headers: headers })
                .subscribe((data) => {
                    resolve(data.json());
                });
        });

    }

    logOut() {
        this.storage.get('tkn').then((val) => {
            new Promise((resolve) => {
                this.http.get('https://stagetca.tronc.com/api/tca/logout?authkey=' + val)
                    .subscribe();
            });
        }).then(() => {
            this.storage.remove('tkn');
        });

    }
}
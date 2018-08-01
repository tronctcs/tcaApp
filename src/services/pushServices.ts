import { Injectable } from "@angular/core";
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Injectable()
export class PushServices {
    constructor(private push: Push) { }

    initializePush() {
        this.push.hasPermission()
            .then((res: any) => {

                if (res.isEnabled) {
                    console.log('We have permission to send push notifications');
                } else {
                    console.log('We do not have permission to send push notifications');
                }

            });

        const options: PushOptions = {
            android: {
                sound: true,
                vibrate: true,
                icon: 'ic_drawable_xxxhdpi_icon',
                iconColor: '#343434',
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'true'
            }
        };

        const pushObject: PushObject = this.push.init(options);
    }
}
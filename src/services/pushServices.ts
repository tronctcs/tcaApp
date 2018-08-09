import { Injectable } from "@angular/core";
import { Push, PushOptions } from '@ionic-native/push';

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
                icon: 'fcm_push_icon',
                iconColor: '#59bcf7',
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'true'
            }
        };
        this.push.init(options);
    }
}
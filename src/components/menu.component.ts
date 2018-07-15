import { Component } from "@angular/core";

@Component({
    selector:'.sideMenu',
    template:`
    <ion-buttons start>
    <button ion-button icon-only menuToggle>
    <ion-icon name="menu"></ion-icon>
    </button>
    </ion-buttons>
    `
})
export class sideMenu{

}
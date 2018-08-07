import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { TicketServices } from '../../services/ticketServices';
import { Storage } from "@ionic/storage";
import { Tickets } from '../../models/tickets';
import { TicketDetailsPage } from '../ticket-details/ticket-details';
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-open-tickets',
  templateUrl: 'open-tickets.html',
})
export class OpenTicketsPage {
  public items: Tickets[] = [];
  public ticketDetailsPage: any = TicketDetailsPage;
  public conatinerShow: boolean = true;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ticketServices: TicketServices, public loadingCntrl: LoadingController,
    public storage: Storage, public alertCntrl: AlertController,
    public events: Events, public statusBar:StatusBar) {

    this.loading = this.loadingCntrl.create({
      content: 'Getting all tickets, please wait...'
    });

    
    
  }

  ngOnInit(): void {
    this.getAllTickets();
  }
  ionViewDidLoad(){
    this.handleNotification();
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#105ee8');
    this.statusBar.styleLightContent();
    let id = this.navParams.get('incId');
    if (id) {
      this.removeTicket(id);
    }
  }

  ionViewWillLeave() {
    this.loading.dismiss();
  }

  getAllTickets() {
    this.loading.present();
    this.listFun(this.loading, 'get');
  }

  doRefresh(refresher) {
    this.listFun(refresher, 'ref');
  }

  listFun(a, b) {
    this.storage.get('tkn').then((val) => {
      this.ticketServices.getAllTickets(val).subscribe((list: Tickets[]) => {
        if (b === 'get') {
          a.dismiss();
        } else {
          a.complete();
        }
        this.items = list;
        if (!this.items.length) {
          this.conatinerShow = false;
        }
        if (!this.items[0].IncId) {
          this.events.publish('user:invalid');
        }
      }, (error) => {
        if (b === 'get') {
          a.dismiss();
        } else {
          a.complete();
        }
        this.ticketServices.handleAlert(error.json().error, 'e');
      });
    });
  }


  viewDetails(tktDetails) {
    this.navCtrl.push(this.ticketDetailsPage, { tktDetails: tktDetails });
  }

  claimTicket(IncId: string) {
    const loading = this.loadingCntrl.create({
      content: 'Please wait...'
    });

    let alert = this.alertCntrl.create({
      title: 'Claim',
      message: 'Are you sure you want to claim this ticket?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.storage.get('tkn').then((val) => {
              loading.present();
              this.ticketServices.claimTicket(IncId, val).subscribe((data) => {
                loading.dismiss();

                if (data === 1) {
                  this.ticketServices.handleAlert('Ticket claimed successfully. Please check cloud plus', 's');
                } else if (data === 2) {
                  this.ticketServices.handleAlert('Sorry, you are not authorized to claim the incident', 'e');
                } else if (data === 3) {
                  this.ticketServices.handleAlert('Some error occoured', 'e');
                } else {
                  this.ticketServices.handleAlert('Ticket already claimed by someone else.  Please check cloud plus', 's');
                }
                this.removeTicket(IncId);
              }, (err) => {
                loading.dismiss();
                this.ticketServices.handleAlert(err, 'E');
              });
            });
          }
        }
      ]
    });
    alert.present();
  }

  removeTicket(IncId) {
    let nArr = this.items.filter((el) => {
      return el.IncId !== IncId;
    });
    this.items = nArr;
  }

  handleNotification(){
    this.events.subscribe('isNotification',(data)=>{
      this.navCtrl.setRoot(this.ticketDetailsPage,{tktId:data.ID,fromNotification:true})
    });
  }

}

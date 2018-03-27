import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Platform } from 'ionic-angular/platform/platform';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    private plt: Platform, private localNotifications: LocalNotifications) {

    this.plt.ready().then((rdy) =>{
      this.localNotifications.on('click', (notification, state) =>{
        let json = JSON.parse(notification.data);

        let alert = this.alertCtrl.create({
          title: notification.title,
          subTitle: json.mydata
        });
        alert.present();
      });
    });
  }

  scheduleNotification(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text:'Simons Notification',
      at: new Date(new Date().getTime() + 5 * 1000),
      data: { mydata: 'My hidden message this is'}
    });
  }

}

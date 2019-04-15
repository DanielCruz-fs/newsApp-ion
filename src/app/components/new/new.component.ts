import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() n: Article;
  @Input() index: number;
  constructor(private iab: InAppBrowser, private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing) { }

  ngOnInit() {}

  openNews() {
    const browser = this.iab.create(this.n.url, '_system');
  }

  async showMenu() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(this.n.title, this.n.source.name, null, this.n.url);
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}

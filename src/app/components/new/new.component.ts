import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() n: Article;
  @Input() index: number;
  @Input() inFavoritePage;
  constructor(private iab: InAppBrowser, private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing, private dataLocalService: DataLocalService,
              private toastController: ToastController) { }

  ngOnInit() {}

  openNews() {
    const browser = this.iab.create(this.n.url, '_system');
  }

  async showMenu() {
    /**trick to switch buttons dinamically */
    let saveOrRemoveFav: any;
    if (this.inFavoritePage) {
      //Removing news from favorite list
      saveOrRemoveFav =  {
        text: 'Remove',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: async () => {
          console.log('Remove clicked');
          this.dataLocalService.removeFavNews(this.n);

          const toast = await this.toastController.create({
            message: 'Item has been removed.',
            duration: 2000,
            position: 'top'
          });
          toast.present();

        }
      }
    } else {
      //Saving news to favorite list
      saveOrRemoveFav =  {
        text: 'Favorite',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: async () => {
          console.log('Favorite clicked');
          this.dataLocalService.saveFavNews(this.n);

          const toast = await this.toastController.create({
            message: 'Your fav item has been saved.',
            duration: 2000,
            position: 'top'
          });
          toast.present();

        }
      }
    }

    /**trick implemented */
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(this.n.title, this.n.source.name, null, this.n.url);
        }
      }, saveOrRemoveFav, {
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

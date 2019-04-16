import { Injectable } from '@angular/core';
//native storage functionality
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  favNews: Article[] = [];
  constructor(private storage: Storage) { 
    this.loadFavNews();
  }

  saveFavNews(favNew : Article) {
    /**simple validation for not saving repeated favNews */
    let favNewExists = this.favNews.find( fn => fn.title === favNew.title);
    if (!favNewExists) {
      this.favNews.unshift(favNew);
      this.storage.set('favoriteNews', this.favNews);
    }
  }
  /**Using then() */
  // loadFavNews() {
  //   this.storage.get('favoriteNews').then( resp => {
  //     console.log(resp);
  //   });
  // }

  /**Using async-await */
  async loadFavNews() {
    const favNewsDB = await this.storage.get('favoriteNews');
    if (favNewsDB) {
      this.favNews = favNewsDB;
      //console.log('await favnews',favNewsDB);
    }
  }

  removeFavNews(favNew: Article) {
    this.favNews = this.favNews.filter( n => n.title !== favNew.title );
    this.storage.set('favoriteNews', this.favNews);
  }

}

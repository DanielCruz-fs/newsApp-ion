import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment) segment: IonSegment;
  categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  news: Article[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.segment.value = this.categories[0];
    this.loadNews(this.categories[0]);
  }

  changeCategory(event) {
    this.news = [];
    this.loadNews(event.detail.value);
  }

  private loadNews(category: string, event?) {
    this.newsService.getTopHeadlinesCategory(category).subscribe( resp => {
      console.log(resp);
      this.news.push(...resp.articles);

      if (event) {
        event.target.complete();
      }
    });
  }

  loadData(event) {
    this.loadNews(this.segment.value, event);
  }
}

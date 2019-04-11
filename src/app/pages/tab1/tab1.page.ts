import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  news: Article[] = [];
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getTopHeadlines().subscribe( resp => {
      //using spread operator to push data
      this.news.push(...resp.articles);
      console.log(resp);
    });
  }

}

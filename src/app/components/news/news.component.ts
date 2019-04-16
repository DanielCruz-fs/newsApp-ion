import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input() news: Article[] = [];
  @Input() inFavoritePage = false;
  constructor() { }

  ngOnInit() {}

}

import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() n: Article;
  @Input() index: number;
  constructor() { }

  ngOnInit() {}

}

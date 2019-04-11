import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getTopHeadlines() {
    return this.http.get<ResponseTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=947821464ed94cc5b9d22b9f0caf8d1b`);
  }
}

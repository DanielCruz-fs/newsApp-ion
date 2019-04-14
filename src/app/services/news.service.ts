import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interface';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  //Generic function or method
  private executeQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    return this.executeQuery<ResponseTopHeadlines>('/top-headlines?country=us');
  }

  getTopHeadlinesCategory(category: string) {
    return this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=us&category=${category}`);
  }
}

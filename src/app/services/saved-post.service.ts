import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { savedPost } from '../models/savedPost';
import { post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class SavedPostService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getSavedPosts(){
    return this.http.get<savedPost[]>(`${this.apiUrl}/savedpost`, { headers: this.getHeaders() });
  }

  savePost(post: post){
    return this.http.post<savedPost>(`${this.apiUrl}/savedpost`, {
      postId: post.id
    }, { headers: this.getHeaders() });
  }

  deleteSavedPost(id: string){
    return this.http.delete(`${this.apiUrl}/savedpost/${id}`, { headers: this.getHeaders() });
  }
}
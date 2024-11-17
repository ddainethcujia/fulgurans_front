import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getMyPosts(){
    return this.http.get<post[]>(`${this.apiUrl}/mypost`, { headers: this.getHeaders() });
  }

  getFeedPosts(){
    return this.http.get<post[]>(`${this.apiUrl}/posts`, { headers: this.getHeaders() });
  }

  createPost(post: post){
    return this.http.post(`${this.apiUrl}/posts`, post, { headers: this.getHeaders() });
  }

  getPost(id: string){
    return this.http.get<post>(`${this.apiUrl}/post/${id}`, { headers: this.getHeaders() });
  }

  updatePost(id: string, post: post){
    console.log(post);
    console.log(id);
    return this.http.put<post>(`${this.apiUrl}/post/${id}`, post, { headers: this.getHeaders() });
  }

  deletePost(id: string){
    return this.http.delete(`${this.apiUrl}/post/${id}`, { headers: this.getHeaders() });
  }
}
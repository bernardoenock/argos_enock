import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  User,
  Post,
  Comment,
  Album,
  Photo,
  ApiEnvironment,
  API_ENVIRONMENTS,
  LoginRequest,
  RegisterRequest,
  AuthUser
} from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private axiosInstance: AxiosInstance;
  private currentEnvironment: ApiEnvironment = API_ENVIRONMENTS[0];

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    this.setApiEnvironment(this.currentEnvironment);
    this.setupInterceptors();
  }

  setApiEnvironment(environment: ApiEnvironment): void {
    this.currentEnvironment = environment;
    this.axiosInstance.defaults.baseURL = environment.baseUrl;
    console.log(`API Environment switched to: ${environment.displayName}`);
  }

  getCurrentEnvironment(): ApiEnvironment {
    return this.currentEnvironment;
  }

  getAvailableEnvironments(): ApiEnvironment[] {
    return API_ENVIRONMENTS;
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
        return Promise.reject(error);
      }
    );
  }

  private get<T>(url: string): Observable<T> {
    return from(this.axiosInstance.get<T>(url)).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        console.error('GET request failed:', error);
        throw error;
      })
    );
  }

  private post<T>(url: string, data?: any): Observable<T> {
    return from(this.axiosInstance.post<T>(url, data)).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        console.error('POST request failed:', error);
        throw error;
      })
    );
  }

  private put<T>(url: string, data?: any): Observable<T> {
    return from(this.axiosInstance.put<T>(url, data)).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        console.error('PUT request failed:', error);
        throw error;
      })
    );
  }

  private delete<T>(url: string): Observable<T> {
    return from(this.axiosInstance.delete<T>(url)).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        console.error('DELETE request failed:', error);
        throw error;
      })
    );
  }


  login(credentials: LoginRequest): Observable<AuthUser> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.username === credentials.username);
        if (user) {
          const authUser: AuthUser = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            isAdmin: user.id === 1
          };
          localStorage.setItem('auth_user', JSON.stringify(authUser));
          localStorage.setItem('auth_token', 'fake_jwt_token');
          return authUser;
        }
        throw new Error('Invalid credentials');
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthUser> {
    const newUser: User = {
      id: Date.now(),
      name: userData.name,
      username: userData.username,
      email: userData.email,
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: { lat: '', lng: '' }
      },
      phone: '',
      website: '',
      company: { name: '', catchPhrase: '', bs: '' }
    };

    return this.post<User>('/users', newUser).pipe(
      map(user => {
        const authUser: AuthUser = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          isAdmin: false
        };
        localStorage.setItem('auth_user', JSON.stringify(authUser));
        localStorage.setItem('auth_token', 'fake_jwt_token');
        return authUser;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  getUsers(): Observable<User[]> {
    return this.get<User[]>('/users');
  }

  getUser(id: number): Observable<User> {
    return this.get<User>(`/users/${id}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.post<User>('/users', user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.put<User>(`/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.delete<any>(`/users/${id}`);
  }

  getPosts(page: number = 1, limit: number = 10): Observable<Post[]> {
    return this.get<Post[]>(`/posts?_page=${page}&_limit=${limit}`);
  }

  getPost(id: number): Observable<Post> {
    return this.get<Post>(`/posts/${id}`);
  }

  getPostComments(postId: number): Observable<Comment[]> {
    return this.get<Comment[]>(`/posts/${postId}/comments`);
  }

  addComment(postId: number, comment: Partial<Comment>): Observable<Comment> {
    return this.post<Comment>(`/posts/${postId}/comments`, comment);
  }

  getAlbums(): Observable<Album[]> {
    return this.get<Album[]>('/albums');
  }

  getAlbum(id: number): Observable<Album> {
    return this.get<Album>(`/albums/${id}`);
  }

  getAlbumPhotos(albumId: number): Observable<Photo[]> {
    return this.get<Photo[]>(`/albums/${albumId}/photos`);
  }
}

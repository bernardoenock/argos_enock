export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Album {
  id: number;
  userId: number;
  title: string;
}

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// API Configuration
export interface ApiEnvironment {
  name: string;
  baseUrl: string;
  displayName: string;
}

export const API_ENVIRONMENTS: ApiEnvironment[] = [
  {
    name: 'jsonplaceholder',
    baseUrl: 'https://jsonplaceholder.typicode.com',
    displayName: 'API JSONPlaceholder'
  },
  {
    name: 'local',
    baseUrl: 'https://localhost:8080',
    displayName: 'API Local'
  }
];

// Authentication Models
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}

export interface RequestResponse {
  detail: string;
}

export interface News {
  id: number;
  title: string;
  header: string;
  image?: string;
}

export interface JobPost {
  company: string;
  id: number;
  image: string;
  location: string;
  title: string;
}

export interface Event {
  id: number;
  image?: string;
  location: string;
  start_date: string;
  title: string;
}

export interface Page {
  image?: string;
  path: string;
  title: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
}
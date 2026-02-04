export type Role = 'ADMIN' | 'LIBRARIAN' | 'USER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  lastLogin?: string;
  password?: string; // In a real app, never store plain text
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  category: string;
  year: string;
  description: string;
  pages: number;
  copies: number;
  availableCopies: number;
  location: string;
  coverUrl: string;
  rating: number;
  status: 'AVAILABLE' | 'DAMAGED' | 'LOST';
  lastInteractedBy?: string;
}

export interface Loan {
  id: string;
  bookId: string;
  userId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE';
}

export interface Reservation {
  id: string;
  bookId: string;
  userId: string;
  requestDate: string;
  status: 'PENDING' | 'FULFILLED' | 'CANCELLED' | 'EXPIRED';
}

export interface Report {
  id: string;
  bookId: string;
  reportedByUserId: string;
  type: 'DAMAGE' | 'LOST';
  description: string;
  date: string;
  status: 'OPEN' | 'RESOLVED';
}

export interface Category {
  id: string;
  name: string;
}

export interface LoanRule {
  days: number;
  finePerDay: number;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Notification {
  id: string;
  userId: string; // Recipient
  message: string;
  isRead: boolean;
  date: string;
  type: 'INFO' | 'ALERT' | 'SUCCESS';
}
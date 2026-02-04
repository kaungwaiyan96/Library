import { Book, User, Loan, Reservation, Category, Report, LoanRule } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'admin@gmail.com',
    role: 'ADMIN',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    phone: '0912345678',
    lastLogin: '2023-10-27 10:00 AM'
  },
  {
    id: 'u2',
    name: 'Williams',
    email: 'lib@gmail.com',
    role: 'LIBRARIAN',
    avatar: 'https://i.pravatar.cc/150?u=lib',
    phone: '0912345679',
    lastLogin: '2023-10-27 09:30 AM'
  },
  {
    id: 'u3',
    name: 'James Smith',
    email: 'james@gmail.com',
    role: 'USER',
    avatar: 'https://i.pravatar.cc/150?u=james',
    phone: '0912345666',
    lastLogin: '2023-10-26 02:00 PM'
  },
  {
    id: 'u4',
    name: 'Anna Bell',
    email: 'anna@user.com',
    role: 'USER',
    avatar: 'https://i.pravatar.cc/150?u=anna',
    phone: '0912345611',
    lastLogin: '2023-10-25 04:00 PM'
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Fiction' },
  { id: 'c2', name: 'Non-fiction' },
  { id: 'c3', name: 'Science' },
  { id: 'c4', name: 'Technology' },
  { id: 'c5', name: 'Romance' },
  { id: 'c6', name: 'Thriller' },
];

export const MOCK_BOOKS: Book[] = [
  {
    id: 'b1',
    isbn: '9780133970777',
    title: 'Database System',
    author: 'Elmasri Navathe',
    publisher: 'Boston: Pearson',
    year: '2016',
    category: 'Science',
    description: 'Fundamentals of Database Systems combines clear explanations of theory and design.',
    pages: 1200,
    copies: 5,
    availableCopies: 4,
    location: 'A-12-3',
    coverUrl: 'https://picsum.photos/200/300?random=1',
    rating: 4.5,
    status: 'AVAILABLE',
    lastInteractedBy: 'Admin'
  },
  {
    id: 'b2',
    isbn: '9780134171456',
    title: 'Android Programming',
    author: 'Bill Philips',
    publisher: 'Big Nerd Ranch',
    year: '2015',
    category: 'Technology',
    description: 'Android Programming: The Big Nerd Ranch Guide is an introductory Android book.',
    pages: 600,
    copies: 3,
    availableCopies: 1,
    location: 'B-04-1',
    coverUrl: 'https://picsum.photos/200/300?random=2',
    rating: 4.8,
    status: 'AVAILABLE',
    lastInteractedBy: 'Williams'
  },
  {
    id: 'b3',
    isbn: '9780071809252',
    title: 'Garis Waktu',
    author: 'Fiersa Besari',
    publisher: 'Mediakita',
    year: '2016',
    category: 'Romance',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius nisl sed sit aliquet nullam pretium.',
    pages: 210,
    copies: 10,
    availableCopies: 10,
    location: 'R-01-1',
    coverUrl: 'https://picsum.photos/200/300?random=3',
    rating: 4.2,
    status: 'AVAILABLE',
    lastInteractedBy: 'Admin'
  },
  {
    id: 'b4',
    isbn: '9780307277671',
    title: 'The Wonderful Wizard of Oz',
    author: 'L. Frank Baum',
    publisher: 'George M. Hill',
    year: '1900',
    category: 'Fiction',
    description: 'The story chronicles the adventures of a young farm girl named Dorothy.',
    pages: 300,
    copies: 2,
    availableCopies: 2,
    location: 'F-10-2',
    coverUrl: 'https://picsum.photos/200/300?random=4',
    rating: 4.0,
    status: 'AVAILABLE'
  },
  {
    id: 'b5',
    isbn: '9780061120084',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    publisher: 'Chatto & Windus',
    year: '1932',
    category: 'Fiction',
    description: 'A dystopian social science fiction novel.',
    pages: 311,
    copies: 4,
    availableCopies: 4,
    location: 'F-12-9',
    coverUrl: 'https://picsum.photos/200/300?random=5',
    rating: 4.7,
    status: 'AVAILABLE'
  },
  {
    id: 'b6',
    isbn: '9780132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    publisher: 'Prentice Hall',
    year: '2008',
    category: 'Technology',
    description: 'A Handbook of Agile Software Craftsmanship.',
    pages: 464,
    copies: 6,
    availableCopies: 5,
    location: 'B-05-2',
    coverUrl: 'https://picsum.photos/200/300?random=6',
    rating: 4.9,
    status: 'AVAILABLE'
  },
  {
    id: 'b7',
    isbn: '9780307588371',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    publisher: 'Crown Publishing Group',
    year: '2012',
    category: 'Thriller',
    description: 'A thriller novel involving the disappearance of a wife on her fifth wedding anniversary.',
    pages: 422,
    copies: 4,
    availableCopies: 0,
    location: 'T-01-4',
    coverUrl: 'https://picsum.photos/200/300?random=7',
    rating: 4.3,
    status: 'AVAILABLE'
  },
  {
    id: 'b8',
    isbn: '9781451648546',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    publisher: 'Simon & Schuster',
    year: '2011',
    category: 'Non-fiction',
    description: 'The biography of Steve Jobs, based on over forty interviews with Jobs.',
    pages: 656,
    copies: 3,
    availableCopies: 3,
    location: 'N-02-1',
    coverUrl: 'https://picsum.photos/200/300?random=8',
    rating: 4.6,
    status: 'AVAILABLE'
  },
  {
    id: 'b9',
    isbn: '9780345538376',
    title: 'Cosmos',
    author: 'Carl Sagan',
    publisher: 'Random House',
    year: '1980',
    category: 'Science',
    description: 'Cosmos covers a wide range of scientific subjects, including the origin of life.',
    pages: 365,
    copies: 5,
    availableCopies: 2,
    location: 'S-09-3',
    coverUrl: 'https://picsum.photos/200/300?random=9',
    rating: 4.8,
    status: 'AVAILABLE'
  },
  {
    id: 'b10',
    isbn: '9780451524935',
    title: '1984',
    author: 'George Orwell',
    publisher: 'Secker & Warburg',
    year: '1949',
    category: 'Fiction',
    description: 'A dystopian social science fiction novel and cautionary tale.',
    pages: 328,
    copies: 8,
    availableCopies: 1,
    location: 'F-11-1',
    coverUrl: 'https://picsum.photos/200/300?random=10',
    rating: 4.7,
    status: 'AVAILABLE'
  },
  {
    id: 'b11',
    isbn: '9781101886026',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    publisher: 'Celadon Books',
    year: '2019',
    category: 'Thriller',
    description: 'A psychological thriller about a woman who shoots her husband five times.',
    pages: 336,
    copies: 4,
    availableCopies: 4,
    location: 'T-02-5',
    coverUrl: 'https://picsum.photos/200/300?random=11',
    rating: 4.4,
    status: 'AVAILABLE'
  },
  {
    id: 'b12',
    isbn: '9781400064168',
    title: 'The Notebook',
    author: 'Nicholas Sparks',
    publisher: 'Warner Books',
    year: '1996',
    category: 'Romance',
    description: 'A romantic novel that tells the love story between Noah Calhoun and Allie Nelson.',
    pages: 214,
    copies: 6,
    availableCopies: 2,
    location: 'R-03-2',
    coverUrl: 'https://picsum.photos/200/300?random=12',
    rating: 4.1,
    status: 'AVAILABLE'
  }
];

export const MOCK_LOANS: Loan[] = [
  {
    id: 'l1',
    bookId: 'b1',
    userId: 'u3', // James
    issueDate: '2023-11-10T12:53:00',
    dueDate: '2023-11-17T12:53:00', // Overdue relative to mock "now"
    status: 'OVERDUE'
  },
  {
    id: 'l2',
    bookId: 'b2',
    userId: 'u3',
    issueDate: '2023-11-20T13:53:00',
    dueDate: '2023-11-27T13:53:00',
    status: 'ACTIVE'
  }
];

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 'r1',
    bookId: 'b2',
    userId: 'u4', // Anna
    requestDate: '2023-11-22T09:00:00',
    status: 'PENDING'
  }
];

export const MOCK_REPORTS: Report[] = [
  {
    id: 'rep1',
    bookId: 'b1',
    reportedByUserId: 'u2', // Williams
    type: 'DAMAGE',
    description: 'Pages 50-55 are torn.',
    date: '2023-11-23',
    status: 'OPEN'
  }
];

export const INITIAL_RULES: LoanRule = {
  days: 7,
  finePerDay: 100
};
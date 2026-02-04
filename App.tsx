import React, { useState, useEffect, useMemo } from 'react';
import { 
  MOCK_BOOKS, MOCK_USERS, MOCK_LOANS, MOCK_RESERVATIONS, MOCK_REPORTS, MOCK_CATEGORIES, INITIAL_RULES 
} from './constants';
import { 
  User, Book, Loan, Reservation, Report, Category, LoanRule, Role, Review, Notification
} from './types';
import { 
  IconDashboard, IconBook, IconUsers, IconSettings, IconReport, IconLogOut, 
  IconSearch, IconPlus, IconTrash, IconEdit, IconCategory, IconArrowLeft 
} from './icons';
// @ts-ignore
import libraryBg from './library_cover.png';

// --- SERVICE SIMULATION (Mock Backend) ---
// Using React state in the main component to simulate a database for this single-file SPA

// --- COMPONENTS ---

// 1. UI Components
const Button = ({ children, onClick, variant = 'primary', className = '', ...props }: any) => {
  const base = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-200",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200"
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant as keyof typeof styles]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ label, ...props }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
    <input className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" {...props} />
  </div>
);

const Select = ({ label, options, ...props }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
    <select className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white" {...props}>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const Card = ({ children, className = '' }: any) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    AVAILABLE: 'bg-emerald-100 text-emerald-700',
    ACTIVE: 'bg-blue-100 text-blue-700',
    BORROWED: 'bg-blue-100 text-blue-700',
    RETURNED: 'bg-slate-100 text-slate-700',
    OVERDUE: 'bg-red-100 text-red-700',
    DAMAGED: 'bg-orange-100 text-orange-700',
    LOST: 'bg-gray-800 text-white',
    PENDING: 'bg-yellow-100 text-yellow-700',
    FULFILLED: 'bg-green-100 text-green-700',
    OPEN: 'bg-red-50 text-red-600 border border-red-100',
    RESOLVED: 'bg-green-50 text-green-600 border border-green-100',
    EXPIRED: 'bg-red-50 text-red-600 border border-red-100',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
};

// 2. Authentication Component
const LoginPage = ({ onLogin, onSignup, onDemoLogin }: any) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (mode === 'login') {
      if (!formData.email) {
          setError('Please enter your email.');
          return;
      }
      onLogin(formData.email, formData.password, setError);
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.phone) {
        setError('All fields are required.');
        return;
      }
      onSignup(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
            {/* Left Side - Hero / Info */}
            {/* Left Side - Hero / Info */}
            <div className="w-full md:w-1/2 relative bg-slate-900 text-white flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={libraryBg} alt="Library Background" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/30"></div>
                </div>
                
                <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
                                 <IconBook className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white shadow-sm">LibraryMS</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 leading-tight drop-shadow-md">
                            {mode === 'login' ? 'Welcome Back!' : 'Join Our Community'}
                        </h2>
                        <p className="text-slate-200 text-lg leading-relaxed drop-shadow-sm font-light">
                            {mode === 'login' 
                                ? 'Access your personal library dashboard, manage loans, and discover new books within our curated collection.' 
                                : 'Create an account to start borrowing books, reserving titles, and managing your reading list.'}
                        </p>
                    </div>

                    <div>
                         <p className="text-sm text-slate-300 uppercase tracking-wider font-semibold mb-4">Trusted by Readers</p>
                         <div className="flex -space-x-3">
                            {[1,2,3,4].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="user" />
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-white/90 text-slate-900 flex items-center justify-center text-xs font-bold backdrop-blur-sm">+2k</div>
                         </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
                <div className="max-w-sm mx-auto w-full space-y-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-slate-900">
                            {mode === 'login' ? 'Sign in to Account' : 'Create Member Account'}
                        </h3>
                        <p className="text-slate-500 mt-2">
                             {mode === 'login' ? 'Enter your details below' : 'Fill in your information to join as a member'}
                        </p>
                    </div>

                    {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 flex items-center gap-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{error}</div>}

                    <div className="space-y-5">
                          {mode === 'signup' && (
                             <>
                              <Input label="Full Name" placeholder="John Doe" value={formData.name} onChange={(e:any) => setFormData({...formData, name: e.target.value})} />
                              <Input label="Phone Number" placeholder="0912345678" value={formData.phone} onChange={(e:any) => setFormData({...formData, phone: e.target.value})} />
                             </>
                         )}
                         <Input label="Email" placeholder="name@company.com" value={formData.email} onChange={(e:any) => setFormData({...formData, email: e.target.value})} />
                         <Input label="Password" type="password" placeholder="••••••••" value={formData.password} onChange={(e:any) => setFormData({...formData, password: e.target.value})} />
                         
                         <Button className="w-full py-3 text-base shadow-lg shadow-blue-200/50" onClick={handleSubmit}>
                             {mode === 'login' ? 'Sign In' : 'Sign Up'}
                         </Button>
                    </div>



                    <div className="text-center pt-4">
                        <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                             {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

const ReservationTimer = ({ requestDate }: { requestDate: string }) => {
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const reqTime = new Date(requestDate).getTime();
      const expiryTime = reqTime + (24 * 60 * 60 * 1000); // 24 hours
      const diff = expiryTime - now;
      
      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }
      
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [requestDate]);

  return <span className={`font-mono font-medium ${timeLeft === 'Expired' ? 'text-red-500' : 'text-blue-600'}`}>{timeLeft}</span>;
};

// 3. Main Logic Container
export default function App() {
  // --- STATE ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('login'); // login, dashboard, books, book_detail, users, loans, reports, settings
  
  // Data State
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [loans, setLoans] = useState<Loan[]>(MOCK_LOANS);
  const [reservations, setReservations] = useState<Reservation[]>(MOCK_RESERVATIONS);
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [loanRules, setLoanRules] = useState<LoanRule>(INITIAL_RULES);
  
  // Editing Rules State
  const [isEditingRules, setIsEditingRules] = useState(false);
  const [tempRules, setTempRules] = useState<LoanRule>(INITIAL_RULES);

  // View State Details
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  
  // Report Modal State
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [reportTargetBook, setReportTargetBook] = useState<Book | null>(null);
  const [reportSource, setReportSource] = useState<'SHELF' | 'LOAN'>('SHELF');
  const [reportForm, setReportForm] = useState({ type: 'DAMAGE', description: '' });

  // User Management Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userForm, setUserForm] = useState({ name: '', email: '', phone: '', role: 'USER' });
  
  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewTargetLoan, setReviewTargetLoan] = useState<Loan | null>(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  // Notification State
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  // Report Resolution Modal State
  const [isResolveModalOpen, setResolveModalOpen] = useState(false);
  const [reportToResolve, setReportToResolve] = useState<Report | null>(null);

  // Profile Settings State
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState({ name: '', phone: '', email: '' });

  // Expiration Logic
  useEffect(() => {
    const checkExpiration = () => {
      const now = Date.now();
      const oneDayMs = 24 * 60 * 60 * 1000;
      let hasChanges = false;
      const updatedReservations = reservations.map(r => {
        if (r.status === 'PENDING') {
          const reqTime = new Date(r.requestDate).getTime();
          if (now - reqTime > oneDayMs) {
            hasChanges = true;
            return { ...r, status: 'EXPIRED' as const };
          }
        }
        return r;
      });
      if (hasChanges) setReservations(updatedReservations);
    };
    const interval = setInterval(checkExpiration, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, [reservations]);

  // --- ACTIONS ---

  const handleDemoLogin = (email: string, role: string) => {
    // Just pick the user by role for demo convenience
    const user = users.find(u => u.email === email && u.role === role) || users.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      setCurrentView(user.role === 'USER' ? 'books' : 'dashboard');
    } else {
      alert('Demo User not found in mock data');
    }
  };

  const handleGenericLogin = (email: string, password: string, setError: any) => {
    const user = users.find(u => u.email === email);
    if (user) {
        // In real app, check password here.
        setCurrentUser(user);
        setCurrentView(user.role === 'USER' ? 'books' : 'dashboard');
    } else {
        setError('User not found. Please sign up or use a demo account.');
    }
  };

  const handleSignup = (data: any) => {
    // Automatically assign USER role to public signups
    const newUser: User = {
        id: `u${Date.now()}`,
        name: data.name,
        email: data.email,
        role: 'USER',
        avatar: `https://ui-avatars.com/api/?name=${data.name}`,
        phone: data.phone || '',
        lastLogin: new Date().toLocaleString()
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setCurrentView('books');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleAddUser = () => {
    if (!userForm.name || !userForm.email) return alert('Name and Email required');
    const newUser: User = {
        id: `u${Date.now()}`,
        name: userForm.name,
        email: userForm.email,
        phone: userForm.phone,
        role: userForm.role as Role,
        avatar: `https://ui-avatars.com/api/?name=${userForm.name}`,
        lastLogin: 'Never'
    };
    setUsers([...users, newUser]);
    setIsUserModalOpen(false);
    setUserForm({ name: '', email: '', phone: '', role: 'USER' });
    alert(`${newUser.role} created successfully!`);
  };

  const handleReserveBook = (bookId: string) => {
    if (!currentUser) return;
    const newRes: Reservation = {
      id: `r${Date.now()}`,
      bookId,
      userId: currentUser.id,
      requestDate: new Date().toISOString(),
      status: 'PENDING'
    };
    setReservations([...reservations, newRes]);
    alert('Book Reserved Successfully!');
  };

  const handleIssueBook = (reservationId: string, bookId: string, userId: string) => {
    // Create Loan
    const newLoan: Loan = {
      id: `l${Date.now()}`,
      bookId,
      userId,
      issueDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + loanRules.days * 24 * 60 * 60 * 1000).toISOString(),
      status: 'ACTIVE'
    };
    setLoans([...loans, newLoan]);

    // Update Reservation
    setReservations(reservations.map(r => r.id === reservationId ? { ...r, status: 'FULFILLED' } : r));
    
    // Update Book copies
    setBooks(books.map(b => b.id === bookId ? { ...b, availableCopies: b.availableCopies - 1 } : b));
  };

  const handleReturnBook = (loanId: string, bookId: string) => {
    setLoans(loans.map(l => l.id === loanId ? { ...l, status: 'RETURNED', returnDate: new Date().toISOString() } : l));
    setBooks(books.map(b => b.id === bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b));
  };

  const handleDeleteBook = (bookId: string) => {
    if (currentUser?.role !== 'ADMIN') return;
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(b => b.id !== bookId));
    }
  };

  const handleSaveBook = (bookData: Partial<Book>) => {
    if (editingBook) {
      setBooks(books.map(b => b.id === editingBook.id ? { ...b, ...bookData } as Book : b));
    } else {
      const newBook: Book = {
        ...bookData,
        id: `b${Date.now()}`,
        availableCopies: bookData.copies || 0,
        rating: 0,
        status: 'AVAILABLE',
        lastInteractedBy: currentUser?.name
      } as Book;
      setBooks([...books, newBook]);
    }
    setCurrentView(currentUser?.role === 'ADMIN' ? 'books_manage' : 'books');
    setEditingBook(null);
  };

  const handleCreateReport = (bookId: string, type: 'DAMAGE' | 'LOST', desc: string, isFromLoan: boolean) => {
    const newReport: Report = {
      id: `rep${Date.now()}`,
      bookId,
      reportedByUserId: currentUser?.id || '',
      type,
      description: desc,
      date: new Date().toISOString().split('T')[0],
      status: 'OPEN'
    };
    setReports([...reports, newReport]);
    
    // Notify Admin if Librarian
    if (currentUser?.role === 'LIBRARIAN') {
       const book = books.find(b => b.id === bookId);
       const newNotif: Notification = {
           id: `n${Date.now()}`,
           userId: 'ADMIN',
           message: `Librarian ${currentUser.name} reported issue for "${book?.title}". Type: ${type}.`,
           isRead: false,
           date: new Date().toISOString(),
           type: 'ALERT'
       };
       setNotifications([newNotif, ...notifications]);
    }
    
    // Update book copies
    setBooks(books.map(b => {
      if (b.id === bookId) {
        // We reduce total copies (inventory shrinks)
        const newCopies = Math.max(0, b.copies - 1);
        // If reported from Loan, it wasn't available on shelf, so don't reduce availableCopies.
        // If reported from Shelf/Inventory, it was available, so reduce availableCopies.
        const newAvailable = isFromLoan ? b.availableCopies : Math.max(0, b.availableCopies - 1);
        
        // Status only changes to LOST/DAMAGED if NO copies are left.
        // Otherwise it stays available (or whatever it was).
        let newStatus = b.status;
        if (newCopies === 0) {
           newStatus = type === 'LOST' ? 'LOST' : 'DAMAGED';
        }
        
        return {
           ...b,
           copies: newCopies,
           availableCopies: newAvailable,
           status: newStatus
        };
      }
      return b;
    }));
  };

  const handleResolveReport = (action: 'DISCARD' | 'RESTORE') => {
    if (!reportToResolve) return;

    // Update Report Status
    const status = 'RESOLVED';
    setReports(reports.map(r => r.id === reportToResolve.id ? { ...r, status } : r));

    // Handle Book Copies
    if (action === 'RESTORE') {
        setBooks(books.map(b => {
            if (b.id === reportToResolve.bookId) {
                return {
                    ...b,
                    copies: b.copies + 1,
                    availableCopies: b.availableCopies + 1,
                    status: 'AVAILABLE' // Reset status if it was lost/damaged
                };
            }
            return b;
        }));
    }
    // If action is DISCARD, no change needed as copies were reduced upon report creation.

    // Send Notification to Librarian
    const bookTitle = books.find(b => b.id === reportToResolve.bookId)?.title || 'Unknown Book';
    const newNotif: Notification = {
        id: `n${Date.now()}`,
        userId: 'LIBRARIAN', // Target audience (simplification)
        message: `Admin resolved report for "${bookTitle}". Action: ${action === 'DISCARD' ? 'Discarded from inventory' : 'Restored to shelf'}.`,
        isRead: false,
        date: new Date().toISOString(),
        type: 'INFO'
    };
    setNotifications([newNotif, ...notifications]);

    setResolveModalOpen(false);
    setReportToResolve(null);
    alert(`Report Resolved. Book ${action === 'DISCARD' ? 'removed' : 'restored'}.`);
  };

  const openReportModal = (book: Book | null = null, source: 'SHELF' | 'LOAN' = 'SHELF') => {
      setReportTargetBook(book);
      setReportSource(source);
      setReportModalOpen(true);
  };

  const submitReport = () => {
    if (!reportTargetBook) return;
    handleCreateReport(reportTargetBook.id, reportForm.type as 'DAMAGE'|'LOST', reportForm.description, reportSource === 'LOAN');
    setReportModalOpen(false);
    setReportForm({ type: 'DAMAGE', description: '' });
    setReportTargetBook(null);
    alert('Report submitted successfully. Inventory updated.');
  };

  const handleSubmitReview = () => {
     if (!reviewTargetLoan || !currentUser) return;
     
     const newReview: Review = {
        id: `rev${Date.now()}`,
        bookId: reviewTargetLoan.bookId,
        userId: currentUser.id,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: new Date().toISOString()
     };
     setReviews([...reviews, newReview]);

     // Update Book Rating
     const bookReviews = [...reviews, newReview].filter(r => r.bookId === reviewTargetLoan.bookId);
     const avgRating = bookReviews.reduce((acc, r) => acc + r.rating, 0) / bookReviews.length;
     
     setBooks(books.map(b => b.id === reviewTargetLoan.bookId ? { ...b, rating: avgRating } : b));

     setReviewModalOpen(false);
     setReviewTargetLoan(null);
     setReviewForm({ rating: 5, comment: '' });
     alert('Review submitted! Thank you.');
  };

  const handleOpenSettings = () => {
      if (currentUser) {
          setSettingsForm({
              name: currentUser.name,
              phone: currentUser.phone || '',
              email: currentUser.email
          });
          setIsSettingsModalOpen(true);
          setIsProfileMenuOpen(false);
      }
  };

  const handleUpdateProfile = () => {
      if (!currentUser) return;
      
      const updatedUser = {
          ...currentUser,
          name: settingsForm.name,
          phone: settingsForm.phone
      };

      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      setIsSettingsModalOpen(false);
      alert('Profile updated successfully!');
  };

  // --- VIEWS ---

  const DashboardView = () => {
    const stats = [
      { label: 'Total User', value: users.length.toLocaleString(), icon: <IconUsers className="w-6 h-6 text-blue-500"/>, change: '8.5% Up', color: 'blue' },
      { label: 'Active User', value: users.filter(u => u.lastLogin).length.toLocaleString(), icon: <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, change: '1.3% Up', color: 'emerald' },
      { label: 'Borrow Book', value: loans.filter(l => l.status === 'ACTIVE').length.toLocaleString(), icon: <IconBook className="w-6 h-6 text-amber-500"/>, change: '4.3% Down', color: 'amber' },
    ];
    
    if (currentUser?.role === 'ADMIN') {
        const openReports = reports.filter(r => r.status === 'OPEN').length;
        stats.push({ 
            label: 'Pending Reports', 
            value: openReports.toString(), 
            icon: <IconReport className="w-6 h-6 text-red-500"/>, 
            change: openReports > 0 ? 'Action Required' : 'All Clear', 
            color: 'red' 
        });
    } else {
        stats.push({ label: 'Total Fine', value: '2040 ฿', icon: <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, change: '1.8% Up', color: 'red' });
    }

    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-50`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-sm">
                <span className={`text-${stat.color}-600 font-medium`}>{stat.change}</span> from yesterday
              </div>
            </Card>
          ))}
        </div>

        {/* User Management Table (Admin Only) */}
        {currentUser?.role === 'ADMIN' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">User Management</h3>
              <div className="flex gap-4">
                <div className="relative">
                   <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input placeholder="Search..." className="pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-blue-500 w-64" />
                </div>
                <Button onClick={() => setIsUserModalOpen(true)} className="text-sm py-1.5"><IconPlus className="w-4 h-4" /> Add User</Button>
              </div>
            </div>
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold">
                <tr>
                  <th className="px-6 py-4">Profile</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Last Login</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                    <td className="px-6 py-4">{user.phone || '-'}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : user.role === 'LIBRARIAN' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">{user.lastLogin || 'Never'}</td>
                    <td className="px-6 py-4 flex gap-2">
                       <button className="text-emerald-500 hover:text-emerald-700"><IconEdit className="w-4 h-4" /></button>
                       <button className="text-red-500 hover:text-red-700"><IconTrash className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Loan Rules */}
        {currentUser?.role === 'ADMIN' && (
           <Card>
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800">Global Loan Settings</h3>
                 {!isEditingRules ? (
                    <Button onClick={() => { setTempRules(loanRules); setIsEditingRules(true); }} variant="secondary" className="px-3 py-1.5 text-sm">
                       <IconEdit className="w-4 h-4" /> Edit Rules
                    </Button>
                 ) : (
                    <div className="flex gap-2">
                       <Button onClick={() => setIsEditingRules(false)} variant="ghost" className="px-3 py-1.5 text-sm">Cancel</Button>
                       <Button onClick={() => { setLoanRules(tempRules); setIsEditingRules(false); }} className="px-3 py-1.5 text-sm">Save Changes</Button>
                    </div>
                 )}
              </div>
              
              {!isEditingRules ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center text-center">
                       <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                       </div>
                       <p className="text-sm text-slate-500 font-medium mb-1">Standard Loan Period</p>
                       <p className="text-3xl font-bold text-slate-800">{loanRules.days} <span className="text-sm font-normal text-slate-500">days</span></p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center text-center">
                       <div className="p-3 bg-red-100 text-red-600 rounded-full mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                       </div>
                       <p className="text-sm text-slate-500 font-medium mb-1">Overdue Fine</p>
                       <p className="text-3xl font-bold text-slate-800">{loanRules.finePerDay} <span className="text-sm font-normal text-slate-500">THB / day</span></p>
                    </div>
                 </div>
              ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Loan Duration (Days)</label>
                       <input 
                         type="number" 
                         className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                         value={tempRules.days}
                         onChange={(e) => setTempRules({...tempRules, days: parseInt(e.target.value) || 0})}
                       />
                       <p className="text-xs text-slate-500 mt-1">Default number of days a user can borrow a book.</p>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Fine Amount (THB/Day)</label>
                       <input 
                         type="number" 
                         className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                         value={tempRules.finePerDay}
                         onChange={(e) => setTempRules({...tempRules, finePerDay: parseInt(e.target.value) || 0})}
                       />
                       <p className="text-xs text-slate-500 mt-1">Penalty charged for each day the book is overdue.</p>
                    </div>
                 </div>
              )}
           </Card>
        )}
      </div>
    );
  };

  const BookListView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredBooks = books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm);
      
      const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
      
      // Filter out LOST and DAMAGED books for regular users
      // Note: Only books with status='LOST'/'DAMAGED' (meaning 0 copies left) are hidden.
      const isVisible = currentUser?.role === 'USER' 
        ? (book.status !== 'LOST' && book.status !== 'DAMAGED') 
        : true;
      
      return matchesSearch && matchesCategory && isVisible;
    });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">
             {currentUser?.role === 'LIBRARIAN' ? 'Book Inventory' : 'Browse Books'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative w-96">
              <IconSearch className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, author, ISBN..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              />
            </div>
            {currentUser?.role === 'LIBRARIAN' && (
              <Button onClick={() => { setEditingBook(null); setCurrentView('book_form'); }}>
                <IconPlus className="w-4 h-4" /> Add Book
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0 space-y-6">
             <div>
               <h3 className="font-bold text-slate-800 mb-4 text-lg">Genres</h3>
               <div className="space-y-2">
                 <button 
                   onClick={() => setSelectedCategory(null)} 
                   className={`block w-full text-left px-4 py-2 rounded-lg transition-all ${!selectedCategory ? 'bg-white text-blue-600 shadow-sm border border-slate-100 font-medium' : 'text-slate-600 hover:bg-white hover:text-blue-600'}`}
                 >
                   All Genres
                 </button>
                 {categories.map(cat => (
                   <button 
                     key={cat.id} 
                     onClick={() => setSelectedCategory(cat.name)}
                     className={`block w-full text-left px-4 py-2 rounded-lg transition-all ${selectedCategory === cat.name ? 'bg-white text-blue-600 shadow-sm border border-slate-100 font-medium' : 'text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm'}`}
                   >
                     {cat.name}
                   </button>
                 ))}
               </div>
             </div>
          </div>

          {/* Book Grid */}
          <div className="flex-1">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map(book => (
                  <div key={book.id} onClick={() => { setSelectedBook(book); setCurrentView('book_detail'); }} className="group bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col">
                    <div className="aspect-[2/3] w-full bg-slate-100 relative overflow-hidden">
                      <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-2 right-2">
                         <Badge status={book.status} />
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-slate-900 line-clamp-1 mb-1">{book.title}</h3>
                      <p className="text-sm text-slate-500 mb-2">{book.author}</p>
                      <div className="mt-auto flex items-center justify-between">
                         <div className="flex text-amber-400 text-xs gap-0.5">
                           {[...Array(5)].map((_,i) => (
                             <span key={i}>{i < Math.floor(book.rating || 0) ? '★' : '☆'}</span>
                           ))}
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                 <IconBook className="w-16 h-16 mb-4 opacity-50" />
                 <p className="text-lg font-medium">No books found matching your criteria.</p>
                 <button onClick={() => {setSearchTerm(''); setSelectedCategory(null);}} className="mt-2 text-blue-600 hover:underline">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const BookDetailView = () => {
    if (!selectedBook) return null;
    return (
      <div className="max-w-5xl mx-auto pt-8">
        <button onClick={() => setCurrentView('books')} className="flex items-center text-slate-500 hover:text-slate-800 mb-8 transition-colors">
          <IconArrowLeft className="w-5 h-5 mr-2" /> Back to Browse
        </button>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Cover & Rating */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
             <div className="aspect-[2/3] w-full rounded-xl shadow-2xl overflow-hidden bg-slate-100">
               <img src={selectedBook.coverUrl} alt={selectedBook.title} className="w-full h-full object-cover" />
             </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-8">
             <div>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide mb-2">{selectedBook.publisher} • {selectedBook.year}</p>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">{selectedBook.title}</h1>
                <p className="text-xl text-slate-600">By {selectedBook.author}</p>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex text-amber-400 text-lg">
                    {[...Array(5)].map((_,i) => <span key={i}>{i < Math.floor(selectedBook.rating) ? '★' : '☆'}</span>)}
                  </div>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{selectedBook.availableCopies} copies available</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{selectedBook.category}</span>
                </div>
             </div>

             <div className="prose prose-slate max-w-none">
                <h3 className="text-lg font-bold text-slate-900 mb-2">About</h3>
                <p className="text-slate-600 leading-relaxed">{selectedBook.description}</p>
             </div>

             <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div>
                   <span className="block text-slate-500 mb-1">ISBN</span>
                   <span className="font-medium text-slate-800">{selectedBook.isbn}</span>
                </div>
                <div>
                   <span className="block text-slate-500 mb-1">Pages</span>
                   <span className="font-medium text-slate-800">{selectedBook.pages}</span>
                </div>
                <div>
                   <span className="block text-slate-500 mb-1">Location</span>
                   <span className="font-medium text-slate-800">{selectedBook.location}</span>
                </div>
                <div>
                   <span className="block text-slate-500 mb-1">Language</span>
                   <span className="font-medium text-slate-800">English</span>
                </div>
             </div>

             <div className="pt-4 flex gap-4">
                {currentUser?.role === 'USER' && (
                  <Button className="w-full md:w-auto px-8 py-3 text-lg" onClick={() => handleReserveBook(selectedBook.id)}>
                    Reserve Book
                  </Button>
                )}
                {currentUser?.role === 'LIBRARIAN' && (
                   <Button variant="danger" className="w-full md:w-auto px-8 py-3 text-lg" onClick={() => openReportModal(selectedBook, 'SHELF')}>
                      Report Damage/Lost
                   </Button>
                )}
             </div>

             {/* Reviews Section */}
             <div className="pt-8 border-t border-slate-100 mt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Reviews</h3>
                <div className="space-y-4">
                  {reviews.filter(r => r.bookId === selectedBook.id).length > 0 ? (
                    reviews.filter(r => r.bookId === selectedBook.id).map(review => {
                      const reviewer = users.find(u => u.id === review.userId);
                      return (
                        <div key={review.id} className="bg-slate-50 p-4 rounded-xl">
                           <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                 <div className="font-bold text-slate-800">{reviewer?.name || 'Anonymous'}</div>
                                 <span className="text-slate-400 text-sm">•</span>
                                 <div className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString()}</div>
                              </div>
                              <div className="flex text-amber-400 text-sm">
                                {[...Array(5)].map((_,i) => <span key={i}>{i < review.rating ? '★' : '☆'}</span>)}
                              </div>
                           </div>
                           <p className="text-slate-600 text-sm">{review.comment}</p>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-slate-500 italic">No reviews yet for this book.</p>
                  )}
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const ManageBooksView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Add / Edit Books</h2>
        <Button onClick={() => { setEditingBook(null); setCurrentView('book_form'); }}>
          <IconPlus className="w-4 h-4" /> Add Book
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Publisher</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">ISBN</th>
              <th className="px-6 py-4">Last-Login</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {books.map((book, idx) => (
              <tr key={book.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4 font-medium text-slate-900">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.publisher}</td>
                <td className="px-6 py-4">{book.category}</td>
                <td className="px-6 py-4">{book.isbn}</td>
                <td className="px-6 py-4">{book.lastInteractedBy || '-'}</td>
                <td className="px-6 py-4 flex gap-2">
                   <Button variant="success" className="px-3 py-1 text-xs" onClick={() => { setEditingBook(book); setCurrentView('book_form'); }}>Edit</Button>
                   <Button variant="danger" className="px-3 py-1 text-xs" onClick={() => handleDeleteBook(book.id)}>Del</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const BookFormView = () => {
    // Form State
    const [form, setForm] = useState<Partial<Book>>(editingBook || {
      title: '', author: '', publisher: '', isbn: '', year: '', description: '', pages: 0, copies: 1, location: '', category: ''
    });

    const handleChange = (f: string, v: any) => setForm({ ...form, [f]: v });

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setCurrentView('books_manage')}><IconArrowLeft className="w-6 h-6 text-slate-500" /></button>
          <h2 className="text-2xl font-bold text-slate-800">{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
        </div>
        
        <Card>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Upload Mock */}
            <div className="w-full md:w-1/3">
              <div className="border-2 border-dashed border-slate-300 rounded-xl aspect-[3/4] flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="text-sm font-medium">Click to upload cover</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Title *" value={form.title} onChange={(e:any) => handleChange('title', e.target.value)} placeholder="Enter book title" />
                <Input label="Author *" value={form.author} onChange={(e:any) => handleChange('author', e.target.value)} placeholder="Enter author name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Publisher" value={form.publisher} onChange={(e:any) => handleChange('publisher', e.target.value)} placeholder="Enter publisher" />
                <Select label="Category" value={form.category} onChange={(e:any) => handleChange('category', e.target.value)} options={categories.map(c => ({ value: c.name, label: c.name }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="ISBN *" value={form.isbn} onChange={(e:any) => handleChange('isbn', e.target.value)} placeholder="978-0-..." />
                <Input label="Year" type="number" value={form.year} onChange={(e:any) => handleChange('year', e.target.value)} placeholder="2024" />
              </div>
              
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea rows={4} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" value={form.description} onChange={(e:any) => handleChange('description', e.target.value)} placeholder="Enter book description..."></textarea>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Input label="Pages" type="number" value={form.pages} onChange={(e:any) => handleChange('pages', parseInt(e.target.value))} />
                <Input label="Copies" type="number" value={form.copies} onChange={(e:any) => handleChange('copies', parseInt(e.target.value))} />
                <Input label="Location" value={form.location} onChange={(e:any) => handleChange('location', e.target.value)} />
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => handleSaveBook(form)}>Publish Book</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const IssueLoanView = () => {
    const [userMode, setUserMode] = useState<'existing' | 'new'>('existing');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [newUserData, setNewUserData] = useState({ name: '', email: '', phone: '' });
    const [selectedBookId, setSelectedBookId] = useState('');

    const handleIssue = () => {
       // Validation
       if (userMode === 'existing' && !selectedUserId) return alert('Select a user');
       if (userMode === 'new' && !newUserData.name) return alert('Enter name');
       if (!selectedBookId) return alert('Select a book');

       let finalUserId = selectedUserId;

       // Create user if new
       if (userMode === 'new') {
           const newId = `u${Date.now()}`;
           const newUser: User = {
               id: newId,
               name: newUserData.name,
               email: newUserData.email || `walkin${newId}@library.temp`, // Dummy email if empty
               phone: newUserData.phone,
               role: 'USER',
               avatar: `https://ui-avatars.com/api/?name=${newUserData.name}`,
               lastLogin: 'Never'
           };
           setUsers([...users, newUser]);
           finalUserId = newId;
       }

       // Create Loan
       const newLoan: Loan = {
          id: `l${Date.now()}`,
          bookId: selectedBookId,
          userId: finalUserId,
          issueDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + loanRules.days * 24 * 60 * 60 * 1000).toISOString(),
          status: 'ACTIVE'
       };
       setLoans([...loans, newLoan]);

       // Update Book copies
       setBooks(books.map(b => b.id === selectedBookId ? { ...b, availableCopies: b.availableCopies - 1 } : b));

       setCurrentView('loans');
    };

    return (
       <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
             <button onClick={() => setCurrentView('loans')}><IconArrowLeft className="w-6 h-6 text-slate-500" /></button>
             <h2 className="text-2xl font-bold text-slate-800">Issue Book to User</h2>
          </div>
          
          <Card className="space-y-6">
             {/* User Section */}
             <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">1. Select Borrower</h3>
                <div className="flex gap-4 mb-4">
                   <button onClick={() => setUserMode('existing')} className={`flex-1 py-2 rounded-lg border text-sm font-medium ${userMode === 'existing' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200'}`}>Existing Member</button>
                   <button onClick={() => setUserMode('new')} className={`flex-1 py-2 rounded-lg border text-sm font-medium ${userMode === 'new' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200'}`}>New / Walk-in User</button>
                </div>
                
                {userMode === 'existing' ? (
                   <Select label="Select Member" value={selectedUserId} onChange={(e:any) => setSelectedUserId(e.target.value)} options={[
                      { value: '', label: '-- Select User --' },
                      ...users.filter(u => u.role === 'USER').map(u => ({ value: u.id, label: `${u.name} (${u.email})` }))
                   ]} />
                ) : (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="Name *" value={newUserData.name} onChange={(e:any) => setNewUserData({...newUserData, name: e.target.value})} />
                      <Input label="Phone" value={newUserData.phone} onChange={(e:any) => setNewUserData({...newUserData, phone: e.target.value})} />
                      <Input label="Email (Optional)" className="md:col-span-2" value={newUserData.email} onChange={(e:any) => setNewUserData({...newUserData, email: e.target.value})} />
                   </div>
                )}
             </div>

             <hr className="border-slate-100" />

             {/* Book Section */}
             <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">2. Select Book</h3>
                <Select label="Select Book to Issue" value={selectedBookId} onChange={(e:any) => setSelectedBookId(e.target.value)} options={[
                    { value: '', label: '-- Select Available Book --' },
                    ...books.filter(b => b.availableCopies > 0 && b.status === 'AVAILABLE').map(b => ({ value: b.id, label: `${b.title} (ISBN: ${b.isbn}) - ${b.availableCopies} left` }))
                ]} />
             </div>

             <Button className="w-full py-3" onClick={handleIssue}>Confirm & Issue Book</Button>
          </Card>
       </div>
    );
  };

  const BorrowingRecordsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">All Borrowing Records</h2>
        <Button onClick={() => setCurrentView('issue_loan')}>
           <IconPlus className="w-4 h-4" /> Issue Book (Walk-in)
        </Button>
      </div>
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Member</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Issue Date</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loans.map(loan => {
               const book = books.find(b => b.id === loan.bookId);
               const user = users.find(u => u.id === loan.userId);
               return (
                 <tr key={loan.id} className="hover:bg-slate-50">
                   <td className="px-6 py-4 font-medium text-slate-900">{user?.name}</td>
                   <td className="px-6 py-4">{book?.title}</td>
                   <td className="px-6 py-4">{new Date(loan.issueDate).toLocaleDateString()}</td>
                   <td className="px-6 py-4">{new Date(loan.dueDate).toLocaleDateString()}</td>
                   <td className="px-6 py-4"><Badge status={loan.status} /></td>
                   <td className="px-6 py-4 flex gap-2">
                     {loan.status !== 'RETURNED' && (
                       <Button variant="success" className="px-3 py-1 text-xs" onClick={() => handleReturnBook(loan.id, loan.bookId)}>Return</Button>
                     )}
                     {currentUser?.role === 'LIBRARIAN' && (
                       <Button variant="danger" className="px-3 py-1 text-xs" onClick={() => { if(book) openReportModal(book, 'LOAN'); }}>Report</Button>
                     )}
                   </td>
                 </tr>
               )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );

  const MyBorrowsView = () => {
    // Filter loans for current user
    const myLoans = loans.filter(l => l.userId === currentUser?.id).sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());

    return (
      <div className="space-y-6">
         <h2 className="text-2xl font-bold text-slate-800">My Borrows & History</h2>
         <Card className="p-0 overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Book Title</th>
                  <th className="px-6 py-4">Issue Date</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Returned</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {myLoans.map(loan => {
                    const book = books.find(b => b.id === loan.bookId);
                    const existingReview = reviews.find(r => r.bookId === loan.bookId && r.userId === currentUser?.id);
                    
                    return (
                       <tr key={loan.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900">{book?.title || 'Unknown Book'}</td>
                          <td className="px-6 py-4">{new Date(loan.issueDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4">{new Date(loan.dueDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4">{loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : '-'}</td>
                          <td className="px-6 py-4"><Badge status={loan.status} /></td>
                          <td className="px-6 py-4">
                             {loan.status === 'RETURNED' && !existingReview && (
                                <Button onClick={() => { setReviewTargetLoan(loan); setReviewModalOpen(true); }} className="px-3 py-1 text-xs">
                                   Write Review
                                </Button>
                             )}
                             {existingReview && <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">✓ Reviewed</span>}
                          </td>
                       </tr>
                    );
                 })}
                 {myLoans.length === 0 && (
                   <tr>
                     <td colSpan={6} className="text-center py-8 text-slate-500">No borrowing history found.</td>
                   </tr>
                 )}
              </tbody>
            </table>
         </Card>

         {/* Review Modal Overlay */}
         {isReviewModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
               <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md m-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Review Book</h3>
                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                        <div className="flex gap-2">
                           {[1,2,3,4,5].map(star => (
                              <button 
                                key={star} 
                                type="button"
                                onClick={() => setReviewForm({...reviewForm, rating: star})}
                                className={`text-2xl transition-colors ${reviewForm.rating >= star ? 'text-amber-400' : 'text-slate-200'}`}
                              >
                                ★
                              </button>
                           ))}
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Comment</label>
                        <textarea 
                           className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                           rows={4}
                           value={reviewForm.comment}
                           onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                           placeholder="What did you think of the book?"
                        ></textarea>
                     </div>
                     <div className="flex justify-end gap-3 pt-2">
                        <Button variant="ghost" onClick={() => { setReviewModalOpen(false); setReviewTargetLoan(null); }}>Cancel</Button>
                        <Button onClick={handleSubmitReview}>Submit Review</Button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
    );
  };

  const MyReservationsView = () => {
      const myReservations = reservations
          .filter(r => r.userId === currentUser?.id)
          .sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());

      return (
         <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">My Reservations</h2>
            <Card className="p-0 overflow-hidden">
               <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-100">
                     <tr>
                        <th className="px-6 py-4">Book Title</th>
                        <th className="px-6 py-4">Request Date</th>
                        <th className="px-6 py-4">Expires In</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {myReservations.map(res => {
                        const book = books.find(b => b.id === res.bookId);
                        return (
                           <tr key={res.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4 font-medium text-slate-900">{book?.title || 'Unknown'}</td>
                              <td className="px-6 py-4">{new Date(res.requestDate).toLocaleString()}</td>
                              <td className="px-6 py-4">
                                {res.status === 'PENDING' ? (
                                    <ReservationTimer requestDate={res.requestDate} />
                                ) : (
                                    '-'
                                )}
                              </td>
                              <td className="px-6 py-4"><Badge status={res.status} /></td>
                              <td className="px-6 py-4">
                                 {res.status === 'PENDING' && (
                                     <Button variant="danger" className="px-3 py-1 text-xs" onClick={() => setReservations(reservations.map(r => r.id === res.id ? {...r, status: 'CANCELLED'} : r))}>Cancel</Button>
                                 )}
                              </td>
                           </tr>
                        );
                     })}
                     {myReservations.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-slate-500">No reservations found.</td></tr>}
                  </tbody>
               </table>
            </Card>
         </div>
      );
  };

  const ReserveTableView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Reserve Table</h2>
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-100">
            <tr>
               <th className="px-6 py-4">Member</th>
               <th className="px-6 py-4">Title</th>
               <th className="px-6 py-4">Status</th>
               <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             {reservations.map(res => {
               const book = books.find(b => b.id === res.bookId);
               const user = users.find(u => u.id === res.userId);
               return (
                 <tr key={res.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{user?.name}</td>
                    <td className="px-6 py-4">{book?.title}</td>
                    <td className="px-6 py-4"><Badge status={res.status} /></td>
                    <td className="px-6 py-4">
                      {res.status === 'PENDING' && (
                         <Button variant="success" className="px-3 py-1 text-xs" onClick={() => handleIssueBook(res.id, res.bookId, res.userId)}>Pick up</Button>
                      )}
                    </td>
                 </tr>
               )
             })}
          </tbody>
        </table>
      </Card>
    </div>
  );

  const CategoryView = () => {
    const [newCat, setNewCat] = useState('');
    const handleAdd = () => {
       if(newCat) {
         setCategories([...categories, { id: `c${Date.now()}`, name: newCat }]);
         setNewCat('');
       }
    };
    return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Category Management</h2>
            <div className="flex gap-2">
               <input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New Category Name" className="px-3 py-2 border rounded-lg" />
               <Button onClick={handleAdd}><IconPlus className="w-4 h-4" /> Add</Button>
            </div>
         </div>
         <Card className="p-0 overflow-hidden">
           <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700"><tr><th className="px-6 py-4">No</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Action</th></tr></thead>
              <tbody>
                {categories.map((c, i) => (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4 font-medium">{c.name}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Button variant="success" className="px-3 py-1 text-xs">Edit</Button>
                      <Button variant="danger" className="px-3 py-1 text-xs" onClick={() => setCategories(categories.filter(cat => cat.id !== c.id))}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
         </Card>
      </div>
    );
  };

  const ReportsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-slate-800">Reports</h2>
         {currentUser?.role === 'LIBRARIAN' && (
             <Button onClick={() => openReportModal(null, 'SHELF')}>
                <IconPlus className="w-4 h-4" /> Report Issue
             </Button>
         )}
      </div>
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">ISBN</th>
              <th className="px-6 py-4">Book Title</th>
              <th className="px-6 py-4">Reported By</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Status</th>
              {currentUser?.role === 'ADMIN' && <th className="px-6 py-4">Action</th>}
            </tr>
          </thead>
          <tbody>
             {reports.map((r, i) => {
               const book = books.find(b => b.id === r.bookId);
               const user = users.find(u => u.id === r.reportedByUserId);
               return (
                 <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50">
                   <td className="px-6 py-4">{i + 1}</td>
                   <td className="px-6 py-4">{book?.isbn}</td>
                   <td className="px-6 py-4 font-medium">{book?.title}</td>
                   <td className="px-6 py-4">{user?.name}</td>
                   <td className="px-6 py-4">
                     <span className="text-red-500 bg-red-50 rounded px-2 py-1 inline-block text-xs font-semibold">{r.description}</span>
                   </td>
                   <td className="px-6 py-4"><Badge status={r.status} /></td>
                   {currentUser?.role === 'ADMIN' && (
                      <td className="px-6 py-4">
                       {r.status === 'OPEN' && (
                            <Button variant="success" className="px-3 py-1 text-xs" onClick={() => { setReportToResolve(r); setResolveModalOpen(true); }}>Resolve</Button>
                         )}
                      </td>
                   )}
                 </tr>
               )
             })}
          </tbody>
        </table>
      </Card>
    </div>
  );

  // --- MAIN RENDER ---

  if (currentView === 'login') return <LoginPage onLogin={handleGenericLogin} onSignup={handleSignup} onDemoLogin={handleDemoLogin} />;

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
           {/* Report Resolution Modal */}
           {isResolveModalOpen && reportToResolve && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                 <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-6 text-center">
                    <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                       <IconReport className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Resolve Report</h3>
                    <p className="text-sm text-slate-500 mb-6">
                        Action required for book copy. The copy was removed from inventory when reported.
                        What would you like to do?
                    </p>
                    <div className="space-y-3">
                       <button onClick={() => handleResolveReport('RESTORE')} className="w-full py-2.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600">
                          Return to Shelf (Restore Copy)
                       </button>
                       <button onClick={() => handleResolveReport('DISCARD')} className="w-full py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600">
                          Discard Book (Confirm Loss)
                       </button>
                       <button onClick={() => setResolveModalOpen(false)} className="w-full py-2.5 rounded-lg text-slate-500 hover:bg-slate-50">
                          Cancel
                       </button>
                    </div>
                 </div>
              </div>
           )}

      {/* User Management Modal */}
      {isUserModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
                   <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2">
                      <IconPlus className="w-5 h-5" />
                      Add New User
                   </h3>
                   <button onClick={() => setIsUserModalOpen(false)} className="text-blue-400 hover:text-blue-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="p-6 space-y-4">
                   <Input label="Full Name *" placeholder="John Doe" value={userForm.name} onChange={(e:any) => setUserForm({...userForm, name: e.target.value})} />
                   <Input label="Email *" placeholder="john@example.com" value={userForm.email} onChange={(e:any) => setUserForm({...userForm, email: e.target.value})} />
                   <Input label="Phone" placeholder="091..." value={userForm.phone} onChange={(e:any) => setUserForm({...userForm, phone: e.target.value})} />
                   
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Role</label>
                      <select 
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={userForm.role}
                        onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                      >
                         <option value="USER">Member (User)</option>
                         <option value="LIBRARIAN">Librarian</option>
                         <option value="ADMIN">Admin</option>
                      </select>
                   </div>
                   
                   <Button className="w-full" onClick={handleAddUser}>Create User</Button>
                </div>
             </div>
          </div>
      )}

      {/* Report Modal */}
      {isReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-center">
                   <h3 className="text-lg font-bold text-red-800 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                      Report Issue
                   </h3>
                   <button onClick={() => setReportModalOpen(false)} className="text-red-400 hover:text-red-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="p-6 space-y-4">
                   {reportTargetBook ? (
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 mb-2">
                         <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">Book Title</p>
                         <p className="font-semibold text-slate-800">{reportTargetBook.title}</p>
                         <p className="text-xs text-slate-500 mt-1">ISBN: {reportTargetBook.isbn}</p>
                      </div>
                   ) : (
                      <div className="mb-2">
                          <label className="block text-sm font-bold text-slate-700 mb-2">Select Book</label>
                          <Select 
                              options={[
                                  { value: '', label: '-- Select Book --' },
                                  ...books.map(b => ({ value: b.id, label: `${b.title} (${b.isbn})` }))
                              ]}
                              value={reportTargetBook?.id || ''}
                              onChange={(e: any) => setReportTargetBook(books.find(b => b.id === e.target.value) || null)}
                          />
                      </div>
                   )}
                   
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Issue Type</label>
                      <div className="grid grid-cols-2 gap-3">
                         <button 
                            onClick={() => setReportForm({...reportForm, type: 'DAMAGE'})}
                            className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${reportForm.type === 'DAMAGE' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                         >
                            Damaged
                         </button>
                         <button 
                            onClick={() => setReportForm({...reportForm, type: 'LOST'})}
                            className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${reportForm.type === 'LOST' ? 'border-gray-800 bg-gray-50 text-gray-800' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                         >
                            Lost
                         </button>
                      </div>
                   </div>

                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                      <textarea 
                        rows={3} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-sm"
                        placeholder="Describe the damage or details of loss..."
                        value={reportForm.description}
                        onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                      ></textarea>
                   </div>
                   
                   <Button variant="danger" className="w-full" onClick={submitReport}>Submit Report</Button>
                </div>
             </div>
          </div>
      )}

      {/* Settings Modal */}
      {isSettingsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                   <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <IconSettings className="w-5 h-5" />
                      User Settings
                   </h3>
                   <button onClick={() => setIsSettingsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="p-6 space-y-4">
                   <div className="flex justify-center mb-4">
                      <div className="relative">
                          <img src={currentUser?.avatar} alt="Avatar" className="w-20 h-20 rounded-full border-4 border-slate-100" />
                          <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full border-2 border-white hover:bg-blue-700"><IconEdit className="w-3 h-3" /></button>
                      </div>
                   </div>

                   <Input label="Display Name" value={settingsForm.name} onChange={(e:any) => setSettingsForm({...settingsForm, name: e.target.value})} />
                   <Input label="Phone Number" value={settingsForm.phone} onChange={(e:any) => setSettingsForm({...settingsForm, phone: e.target.value})} />
                   <Input label="Email Address" value={settingsForm.email} disabled className="bg-slate-50 text-slate-500 cursor-not-allowed" />
                   
                   <div className="pt-2">
                       <Button className="w-full" onClick={handleUpdateProfile}>Save Changes</Button>
                   </div>
                </div>
             </div>
          </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-10 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
           <IconBook className="w-6 h-6 text-blue-600 mr-2" />
           <span className="text-xl font-bold text-slate-800">LibraryMS</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {currentUser?.role === 'ADMIN' && (
            <>
              <NavItem active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} icon={<IconDashboard />} label="Dashboard" />
              <NavItem active={currentView === 'books_manage'} onClick={() => setCurrentView('books_manage')} icon={<IconBook />} label="Add/Edit Books" />
              <NavItem active={currentView === 'category'} onClick={() => setCurrentView('category')} icon={<IconCategory />} label="Category" />
              <NavItem 
                active={currentView === 'reports'} 
                onClick={() => setCurrentView('reports')} 
                icon={<IconReport />} 
                label={
                  <div className="flex justify-between w-full items-center">
                    <span>Reports</span>
                    {reports.some(r => r.status === 'OPEN') && (
                      <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                         {reports.filter(r => r.status === 'OPEN').length}
                      </span>
                    )}
                  </div>
                } 
              />
            </>
          )}

          {currentUser?.role === 'LIBRARIAN' && (
            <>
              <NavItem active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} icon={<IconDashboard />} label="Dashboard" />
              <NavItem active={currentView === 'loans' || currentView === 'issue_loan'} onClick={() => setCurrentView('loans')} icon={<IconBook />} label="Borrowing Records" />
              <NavItem active={currentView === 'books' || currentView === 'book_detail'} onClick={() => setCurrentView('books')} icon={<IconSearch />} label="Book Inventory" />
              <NavItem active={currentView === 'reserves'} onClick={() => setCurrentView('reserves')} icon={<IconUsers />} label="Reserve Table" />
              <NavItem active={currentView === 'reports'} onClick={() => setCurrentView('reports')} icon={<IconReport />} label="Reports" />
            </>
          )}

          {currentUser?.role === 'USER' && (
            <>
              <NavItem active={currentView === 'books' || currentView === 'book_detail'} onClick={() => setCurrentView('books')} icon={<IconSearch />} label="Browse Books" />
              <NavItem active={currentView === 'my_borrows'} onClick={() => setCurrentView('my_borrows')} icon={<IconBook />} label="My Borrows" />
              <NavItem active={currentView === 'my_reservations'} onClick={() => setCurrentView('my_reservations')} icon={<IconUsers />} label="My Reservations" />
              {/* Add User specific history view here if needed */}
            </>
          )}
        </nav>


      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
           <h1 className="text-xl font-bold text-slate-700 capitalize">
             {currentView.replace('_', ' ').replace('issue', 'Issue')}
           </h1>
           <div className="flex items-center gap-4">
              
              {/* Notifications for Librarian */}
              {(currentUser?.role === 'LIBRARIAN' || currentUser?.role === 'ADMIN') && (
                  <div className="relative">
                      <button onClick={() => setIsNotifyOpen(!isNotifyOpen)} className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                          {notifications.filter(n => !n.isRead && n.userId === currentUser?.role).length > 0 && (
                             <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                          )}
                      </button>
                      
                      {isNotifyOpen && (
                          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                             <div className="p-3 border-b border-slate-50 flex justify-between items-center bg-slate-50">
                                <span className="font-bold text-slate-700 text-sm">Notifications</span>
                                <button onClick={() => setNotifications(notifications.map(n => n.userId === currentUser?.role ? ({...n, isRead: true}) : n))} className="text-xs text-blue-600 hover:underline">Mark all read</button>
                             </div>
                             <div className="max-h-64 overflow-y-auto">
                                {notifications.filter(n => n.userId === currentUser?.role).length > 0 ? (
                                   notifications.filter(n => n.userId === currentUser?.role).map(n => (
                                     <div key={n.id} className={`p-3 border-b border-slate-50 hover:bg-slate-50 ${!n.isRead ? 'bg-blue-50/50' : ''}`}>
                                        <p className="text-sm text-slate-800 mb-1">{n.message}</p>
                                        <p className="text-xs text-slate-400">{new Date(n.date).toLocaleTimeString()}</p>
                                     </div>
                                   ))
                                ) : (
                                   <div className="p-8 text-center text-slate-400 text-sm">No new notifications</div>
                                )}
                             </div>
                          </div>
                      )}
                  </div>
              )}

              <div className="relative">
                  <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-3 focus:outline-none group">
                      <div className="text-right hidden sm:block">
                         <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{currentUser?.name}</p>
                         <p className="text-xs text-slate-500 capitalize">{currentUser?.role.toLowerCase()}</p>
                      </div>
                      <img src={currentUser?.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-slate-200 group-hover:ring-2 ring-blue-100 transition-all" />
                  </button>

                  {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                          <button onClick={handleOpenSettings} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                              <IconSettings className="w-4 h-4" /> Settings
                          </button>
                          <div className="my-1 border-t border-slate-100"></div>
                          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                              <IconLogOut className="w-4 h-4 text-red-500" /> Logout
                          </button>
                      </div>
                  )}
              </div>
           </div>
        </header>

        {/* View Switcher */}
        <main className="p-8 flex-1 overflow-auto">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'books' && <BookListView />}
          {currentView === 'book_detail' && <BookDetailView />}
          {currentView === 'books_manage' && <ManageBooksView />}
          {currentView === 'book_form' && <BookFormView />}
          {currentView === 'loans' && <BorrowingRecordsView />}
          {currentView === 'issue_loan' && <IssueLoanView />}
          {currentView === 'reserves' && <ReserveTableView />}
          {currentView === 'reports' && <ReportsView />}

          {currentView === 'category' && <CategoryView />}
          {currentView === 'my_borrows' && <MyBorrowsView />}
          {currentView === 'my_reservations' && <MyReservationsView />}
        </main>
      </div>
    </div>
  );
}

// Nav Helper
const NavItem = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
  >
    {React.cloneElement(icon, { className: `w-5 h-5 ${active ? 'text-blue-600' : 'text-slate-400'}` })}
    {label}
  </button>
);
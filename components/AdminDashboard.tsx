import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, MessageSquare, User as UserIcon, Users } from 'lucide-react';
import { ContactMessage } from '../types';
import * as firebaseAuth from 'firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

interface Props {
  user: any;
}

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: any;
}

const AdminDashboard: React.FC<Props> = ({ user }) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [view, setView] = useState<'messages' | 'subscribers'>('messages');
  const navigate = useNavigate();

  useEffect(() => {
    // Real-time listener for contact messages
    const qMsgs = query(collection(db, "contacts"), orderBy("timestamp", "desc"));
    const unsubMsgs = onSnapshot(qMsgs, (querySnapshot) => {
        const msgs: ContactMessage[] = [];
        querySnapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() } as ContactMessage);
        });
        setMessages(msgs);
    });

    // Real-time listener for subscribers
    const qSubs = query(collection(db, "newsletter"), orderBy("subscribedAt", "desc"));
    const unsubSubs = onSnapshot(qSubs, (querySnapshot) => {
        const subs: Subscriber[] = [];
        querySnapshot.forEach((doc) => {
          subs.push({ id: doc.id, ...doc.data() } as Subscriber);
        });
        setSubscribers(subs);
    });

    return () => {
      unsubMsgs();
      unsubSubs();
    };
  }, []);

  const handleLogout = () => {
    firebaseAuth.signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6 flex flex-col">
        <div className="mb-8">
           <h2 className="text-2xl font-bold font-serif text-blue-400">AWS Admin</h2>
           <p className="text-xs text-gray-500 mt-1">Addis Web Studio</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setView('messages')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${view === 'messages' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <MessageSquare size={20} />
            <span className="font-medium">Messages</span>
          </button>
          
          <button 
            onClick={() => setView('subscribers')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${view === 'subscribers' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Users size={20} />
            <span className="font-medium">Subscribers</span>
          </button>

          <div className="h-px bg-slate-700 my-4"></div>

          <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition">
            <Home size={20} />
            <span>View Site</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 rounded-full p-1">
               <UserIcon size={16} />
            </div>
            <div className="overflow-hidden">
               <p className="text-sm font-medium truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-red-400 hover:text-red-300 text-sm">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{view === 'messages' ? 'Inquiries' : 'Newsletter Subscribers'}</h1>
          <div className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20">
            {view === 'messages' ? messages.length : subscribers.length} Total
          </div>
        </header>

        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-700/50 text-gray-400 text-sm uppercase">
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">{view === 'messages' ? 'Name' : 'Email'}</th>
                  {view === 'messages' && <th className="px-6 py-4 font-medium">Email</th>}
                  {view === 'messages' && <th className="px-6 py-4 font-medium">Message</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {(view === 'messages' ? messages : subscribers).length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      Nothing to show yet.
                    </td>
                  </tr>
                ) : (
                  view === 'messages' ? (
                    messages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-slate-700/30 transition">
                        <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                          {msg.timestamp?.seconds ? new Date(msg.timestamp.seconds * 1000).toLocaleDateString() : 'Just now'}
                        </td>
                        <td className="px-6 py-4 font-medium text-white">{msg.name}</td>
                        <td className="px-6 py-4 text-blue-400">{msg.email}</td>
                        <td className="px-6 py-4 text-gray-300 max-w-md truncate" title={msg.message}>
                          {msg.message}
                        </td>
                      </tr>
                    ))
                  ) : (
                    subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-700/30 transition">
                         <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                          {sub.subscribedAt?.seconds ? new Date(sub.subscribedAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                        </td>
                        <td className="px-6 py-4 font-medium text-blue-400">{sub.email}</td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
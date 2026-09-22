import React, { useEffect, useRef, useState } from 'react';
import { Bell, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getNotifications } from '../services/appointmentService';
import ThemeToggle from './ThemeToggle';

export default function TopBar({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    getNotifications(user.id).then(({ data }) => setNotifications(data));
  }, [user]);

  useEffect(() => {
    function onClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="flex h-16 items-center justify-between border-b border-line bg-white px-6">
      <h1 className="font-serif text-xl text-ink-700">{title}</h1>
      <div ref={panelRef} className="flex items-center gap-4">
        <ThemeToggle />
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative rounded-sm p-2 text-ink-400 hover:bg-paper hover:text-ink-600"
            aria-label="Notifications"
          >
            <Bell size={19} strokeWidth={1.75} />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold-500" />
            )}
          </button>
          {open && (
            <div className="absolute right-0 top-12 z-20 w-80 rounded-sm border border-line bg-white shadow-lg">
              <div className="border-b border-line px-4 py-3 text-sm font-medium text-ink-700">Notifications</div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-ink-300">Nothing new right now.</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="border-b border-line px-4 py-3 text-sm last:border-0">
                      <p className="text-ink-600">{n.message}</p>
                      <p className="mt-1 text-xs text-ink-300">{new Date(n.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-paper"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-100 text-sm font-medium text-ink-600">
              {user?.name?.[0]}
            </div>
            <span className="text-sm text-ink-600">{user?.name}</span>
            <ChevronDown size={15} className="text-ink-300" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-12 z-20 w-44 rounded-sm border border-line bg-white shadow-lg">
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-ink-600 hover:bg-paper"
              >
                <LogOut size={15} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

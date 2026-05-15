/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useI18n } from '../i18n';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signOut: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pick } = useI18n();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const text = pick({
    en: {
      title: 'Sign in to continue',
      body: 'Enter your email and we will send you a secure login link.',
      email: 'Email address',
      placeholder: 'you@example.com',
      submit: 'Send login link',
      submitting: 'Sending...',
      close: 'Close',
      configuredError: 'Login is not configured yet.',
      sent: 'Check your email for the login link.',
      failed: 'Could not send the login link. Please try again.',
    },
    'zh-CN': {
      title: '登录后继续',
      body: '输入邮箱，我们会发送安全登录链接。',
      email: '邮箱地址',
      placeholder: 'you@example.com',
      submit: '发送登录链接',
      submitting: '正在发送...',
      close: '关闭',
      configuredError: '登录尚未配置。',
      sent: '请查看邮箱中的登录链接。',
      failed: '登录链接发送失败，请稍后重试。',
    },
    'zh-TW': {
      title: '登入後繼續',
      body: '輸入信箱，我們會發送安全登入連結。',
      email: '信箱地址',
      placeholder: 'you@example.com',
      submit: '發送登入連結',
      submitting: '正在發送...',
      close: '關閉',
      configuredError: '登入尚未配置。',
      sent: '請查看信箱中的登入連結。',
      failed: '登入連結發送失敗，請稍後重試。',
    },
  });

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession) {
        setIsAuthModalOpen(false);
        setMessage(null);
        setError(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuthModal = () => {
    setMessage(null);
    setError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    if (!supabase) {
      setError(text.configuredError);
      setSubmitting(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.href,
      },
    });

    if (signInError) {
      setError(text.failed);
    } else {
      setMessage(text.sent);
      setEmail('');
    }

    setSubmitting(false);
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const getAccessToken = async () => {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user || null,
      loading,
      openAuthModal,
      closeAuthModal,
      signOut,
      getAccessToken,
    }),
    [session, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif text-white">{text.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{text.body}</p>
              </div>
              <button
                type="button"
                onClick={closeAuthModal}
                className="glass-inset flex h-9 w-9 shrink-0 items-center justify-center text-slate-300 hover:text-white"
                aria-label={text.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">{text.email}</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={text.placeholder}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="glass-primary-button w-full rounded-lg px-4 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? text.submitting : text.submit}
              </button>
            </form>

            {message && <p className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</p>}
            {error && <p className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

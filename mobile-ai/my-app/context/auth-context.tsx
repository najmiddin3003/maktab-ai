import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  clearSession,
  getUser,
  normalizePhone,
  savePassword,
  saveUser,
  type StoredUser,
  verifyPassword,
} from '@/lib/auth-storage';

type AuthContextValue = {
  user: StoredUser | null;
  isReady: boolean;
  login: (phone: string, password: string) => Promise<StoredUser>;
  register: (input: {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
  }) => Promise<StoredUser>;
  completeProfile: (input: {
    maktab: string;
    sinf: string;
    jins: 'erkak' | 'ayol';
    yosh: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const u = await getUser();
        if (!cancelled) setUser(u);
      } finally {
        if (!cancelled) setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (phone: string, password: string) => {
    const p = normalizePhone(phone);
    if (p.length < 9) throw new Error('Telefon raqamini to‘liq kiriting.');
    const u = await getUser();
    if (!u || normalizePhone(u.phone) !== p) throw new Error('Bu raqam bilan ro‘yxatdan o‘tmagansiz.');
    if (!(await verifyPassword(password))) throw new Error('Parol noto‘g‘ri.');
    setUser(u);
    return u;
  }, []);

  const register = useCallback(
    async (input: { firstName: string; lastName: string; phone: string; password: string }) => {
      const p = normalizePhone(input.phone);
      if (p.length < 9) throw new Error('Telefon raqamini to‘liq kiriting.');
      if (!input.firstName.trim() || !input.lastName.trim()) throw new Error('Ism va familiyani kiriting.');
      if (input.password.length < 4) throw new Error('Parol kamida 4 belgi bo‘lsin.');
      const next: StoredUser = {
        phone: p,
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        profileComplete: false,
      };
      await saveUser(next);
      await savePassword(input.password);
      setUser(next);
      return next;
    },
    [],
  );

  const completeProfile = useCallback(
    async (input: { maktab: string; sinf: string; jins: 'erkak' | 'ayol'; yosh: string }) => {
      const u = await getUser();
      if (!u) throw new Error('Sessiya topilmadi.');
      if (!input.maktab.trim() || !input.sinf || !input.yosh.trim()) {
        throw new Error('Barcha maydonlarni to‘ldiring.');
      }
      const age = parseInt(input.yosh.trim(), 10);
      if (Number.isNaN(age) || age < 6 || age > 25) throw new Error('Yoshni 6–25 oralig‘ida kiriting.');
      const next: StoredUser = {
        ...u,
        maktab: input.maktab.trim(),
        sinf: input.sinf,
        jins: input.jins,
        yosh: input.yosh.trim(),
        profileComplete: true,
      };
      await saveUser(next);
      setUser(next);
    },
    [],
  );

  const logout = useCallback(async () => {
    await clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isReady, login, register, completeProfile, logout }),
    [user, isReady, login, register, completeProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth faqat AuthProvider ichida ishlatiladi.');
  return ctx;
}

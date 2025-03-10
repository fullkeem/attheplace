'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUserInfoStore } from '@/app/store/authStore';
import LoadingOverlay from '../_components/LoadingOverlay';

export default function MypageLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { userInfo } = useUserInfoStore();

  if (!userInfo.nickname) {
    router.push('/login');
  }

  if (!userInfo.nickname) {
    return <LoadingOverlay />;
  }

  return <>{children}</>;
}

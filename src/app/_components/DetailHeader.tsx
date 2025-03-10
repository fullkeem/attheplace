import { useUserInfoQuery } from '@/app/hooks/useAuthQuery';
import { useLikeToggleMutation } from '@/app/hooks/userLikeListQuery';
import { useModalStore } from '@/app/store/modalStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserInfo } from '@/app/store/authStore';
import { Cafe } from '@/app/store/cafeStore';

interface DetailHeaderProps {
  cafeInfo: Cafe;
  userInfo: UserInfo;
  isLiked: boolean;
}

export default function DetailHeader({
  cafeInfo,
  userInfo,
  isLiked,
}: DetailHeaderProps) {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();
  const { refetch } = useUserInfoQuery(); // 유저 정보를 최신 상태로 가져오는 쿼리
  const toggleLikeMutation = useLikeToggleMutation();

  // 좋아요 등록/취소
  const handleLikeToggle = () => {
    if (!cafeInfo) return;

    if (!userInfo || !userInfo.nickname) {
      openModal(
        <div className="p-5">
          <p className="text-black">로그인이 필요한 서비스입니다.</p>
          <div className="flexBetween mt-6">
            <button
              onClick={() => {
                closeModal();
                router.push('/login');
              }}
              className="w-full rounded bg-buttonColor px-4 py-2 text-white"
            >
              확인
            </button>
          </div>
        </div>
      );
      return;
    }
    toggleLikeMutation.mutate(cafeInfo.id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <div className="flexBetween fixed top-0 z-10 mt-0 w-full max-w-[1280px] bg-bgColor/70 px-5 py-2">
      <button type="button" onClick={() => router.back()}>
        <Image
          src={'/icons/backArrow.svg'}
          width={25}
          height={25}
          alt="뒤로 가기"
        />
      </button>

      <h1 className="text-lg font-bold desktop:text-2xl">
        {cafeInfo.cafe_name}
      </h1>

      <button type="button" onClick={handleLikeToggle}>
        <Image
          src={isLiked ? '/icons/heart_filled.svg' : '/icons/heart_outline.svg'}
          width={25}
          height={25}
          alt="좋아요"
        />
      </button>
    </div>
  );
}

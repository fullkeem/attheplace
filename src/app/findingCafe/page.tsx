'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '../store/modalStore';
import ProgressBar from '../_components/ProgressBar';
import { useCafeFilterQuery } from '../hooks/useCafeQuery';
import { useProgressBarStore, useCafeListStore } from '../store/cafeStore';

const questions = [
  {
    id: 1,
    question: '반려동물 동반이 가능한 카페를 찾으시나요?',
    key: 'pet',
  },
  {
    id: 2,
    question: '단체석(5인 이상)이 가능한 카페를 찾으시나요?',
    key: 'groupSeat',
  },
  {
    id: 3,
    question: '야외 공간(테라스)이 있는 카페를 찾으시나요?',
    key: 'terrace',
  },
  {
    id: 4,
    question: '디카페인 커피가 있는 카페를 찾으시나요?',
    key: 'decaf',
  },
];

interface Answers {
  pet?: boolean;
  groupSeat?: boolean;
  terrace?: boolean;
  decaf?: boolean;
}

export default function FindingCafe() {
  const router = useRouter();
  const { setFilteredCafes } = useCafeListStore();
  const cafeFilterMutation = useCafeFilterQuery();
  const { openModal, closeModal } = useModalStore();
  const [answers, setAnswers] = useState<Answers>({});
  const currentStep = useProgressBarStore((state) => state.currentStep);
  const setCurrentStep = useProgressBarStore((state) => state.setCurrentStep);

  const handleAnswer = (key: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 이미 답변한 문항으로 돌아가서 수정할 수 있게 하기
  const handleStepClick = (stepId: number) => {
    if (stepId <= Object.keys(answers).length) {
      setCurrentStep(stepId); // 선택한 단계로 이동
    }
  };

  const handleSubmit = () => {
    const queryParams = Object.keys(answers)
      .filter((key) => answers[key as keyof Answers])
      .map((key) => `${key}=1`)
      .join('&');

    cafeFilterMutation.mutate(queryParams, {
      onSuccess: (data) => {
        console.log('성공 시: ', data.cafes);
        setFilteredCafes(data.cafes);
        router.push('/map');
        setAnswers({});
        setCurrentStep(1);
      },
      onError: (error) => {
        if (error.message.includes('404')) {
          openModal(
            <div className="p-2">
              <p className="text-center text-sm leading-5 text-gray-500">
                고르신 키워드에 해당되는 카페가 없습니다..😿
                <br />
                빠른 시일내에 준비하겠습니다!
              </p>
              <button
                onClick={() => {
                  closeModal();
                  setAnswers({});
                  setCurrentStep(1);
                }}
                className="mt-4 w-full rounded bg-[#FF6347] px-4 py-2 text-white"
              >
                확인
              </button>
            </div>
          );
        } else {
          console.error('에러 발생', error);
        }
      },
    });
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="bgBox">
      <Image
        src={'/images/background/findingCafe_bg.webp'}
        className="bgImage"
        alt=""
        fill
        priority
        aria-hidden="true"
      />
      <div className="mt-5 flex w-300pxr flex-col">
        <ProgressBar
          currentStep={currentStep}
          handleStepClick={handleStepClick}
        />
        {questions.map(
          (question) =>
            currentStep === question.id && (
              <div
                key={question.id}
                className="mt-6 flex h-96 flex-col items-center justify-between rounded-xl bg-[#353434]/70 p-10"
              >
                <h2 className="text-center text-xl font-extrabold">
                  {question.question}
                </h2>

                <div className="flex w-full flex-col gap-4">
                  <div className="buttonStyle mt-14">
                    <button
                      type="button"
                      className="inline-block h-full w-full"
                      onClick={() => handleAnswer(question.key, true)}
                    >
                      Yes
                    </button>
                  </div>
                  <div className="buttonStyle">
                    <button
                      type="button"
                      className="block h-full w-full"
                      onClick={() => handleAnswer(question.key, false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
        {allAnswered && (
          <button
            onClick={handleSubmit}
            className="mt-6 w-full rounded bg-orange-600 p-4 text-white"
          >
            결과 확인
          </button>
        )}
      </div>
    </div>
  );
}

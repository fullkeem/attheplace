'use client';

import axios from 'axios';
import ProgressBar from '../_components/ProgressBar';
import { useProgressBarStore } from '../store/cafeStore';
import { useState } from 'react';

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
  const currentStep = useProgressBarStore((state) => state.currentStep);
  const setCurrentStep = useProgressBarStore((state) => state.setCurrentStep);

  const [answers, setAnswers] = useState<Answers>({});

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

  const queryParams = Object.keys(answers)
    .filter((key) => answers[key as keyof Answers])
    .map((key) => `${key}=1`)
    .join('&');

  const fetchFindingCafeData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:10010/cafe/filter?${queryParams}`
      );

      console.log('결과 :', response.data);
      setAnswers({});
      setCurrentStep(1);
    } catch (error) {
      console.error('에러 발생', error);
    }
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="flexCenter w-[300px] flex-col">
      <ProgressBar
        currentStep={currentStep}
        handleStepClick={handleStepClick}
      />
      {questions.map(
        (question) =>
          currentStep === question.id && (
            <div
              key={question.id}
              className="mt-20 flex h-96 flex-col items-center justify-between rounded-xl bg-[#353434]/70 p-10"
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
          onClick={fetchFindingCafeData}
          className="mt-10 w-full rounded bg-orange-600 p-4 text-white"
        >
          결과 확인
        </button>
      )}
    </div>
  );
}

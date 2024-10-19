import ProgressBar from "../_components/ProgressBar";

export default function findingCafe() {
  return (
    <div className="flex flex-col items-center w-full">
      <ProgressBar />
      <div className="h-96 mt-20 p-10 flex flex-col items-center justify-between bg-[#353434]/70 rounded-xl">
        <h3 className="font-extrabold text-center text-xl">
          반려동물 동반이 가능한 카페를 찾으시나요?
        </h3>
        <div className="w-full flex flex-col gap-4">
          <div className="buttonStyle mt-14">
            <button type="button">Yes</button>
          </div>
          <div className="buttonStyle">
            <button type="button">No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

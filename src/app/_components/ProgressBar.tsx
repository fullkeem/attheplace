export default function ProgressBar() {
  const progressEl = [
    { id: 1, title: "반려동물" },
    { id: 2, title: "단체석" },
    { id: 3, title: "테라스" },
    { id: 4, title: "디카페인" },
  ];

  return (
    <div className="w-full mt-3">
      <ul className="flex items-center justify-between">
        {progressEl.map((el, index) => (
          <li key={el.id} className="relative flex flex-col items-center gap-1">
            <div className="relative z-10 w-8 h-8 flexCenter bg-[#D9D9D9] rounded-full">
              {el.id}
            </div>
            {index < progressEl.length - 1 && (
              <div className="absolute top-3 left-[38px] w-20 h-3 bg-orange-500"></div>
            )}
            <div>{el.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

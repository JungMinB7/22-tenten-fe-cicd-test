export default function DeleteModal({
  closeFunction,
  okFunction,
}: {
  closeFunction: () => void;
  okFunction: () => void;
}) {
  return (
    <div className="flex fixed items-center justify-center z-[100] w-full h-full bg-transparent right-0 top-0">
      <div className="absolute bg-bgColor opacity-50 max-w-[390px] w-full h-full"></div>
      <div className="relative px-12 py-6 z-200 bg-innerContainerColor flex items-center flex-col gap-6 rounded-xl">
        <div className="text-lg text-textColor">삭제하시겠습니까?</div>
        <div className="flex gap-6">
          <button
            onClick={okFunction}
            className="cursor-pointer bg-myBlue text-textOnBlue px-4 py-1 rounded-full text-xs"
          >
            확인
          </button>
          <button
            onClick={closeFunction}
            className="cursor-pointer bg-myLightBlue text-textOnLight px-4 py-1 rounded-full text-xs border-[1px] border-textOpacity50"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

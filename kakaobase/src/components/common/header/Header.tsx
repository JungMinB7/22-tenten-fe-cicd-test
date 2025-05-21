import HeaderLeft from './HeaderLeft';

export default function Header({ label }: { label: string }) {
  return (
    <div className="flex fixed py-6 gap-2 px-6 items-center w-full max-w-[480px] border-textOpacity50 border-b-[1px] top-0 mx-auto lg:self-start bg-bgColor text-textColor shadow-sm">
      <HeaderLeft />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl">
        {label}
      </div>
    </div>
  );
}

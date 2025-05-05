import HeaderLeft from './HeaderLeft';

export default function Header({ label }: { label: string }) {
  return (
    <div className="h-20 px-6 flex relative text-textColor z-50 border-y-[1px] border-textOpacity50">
      <HeaderLeft />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl">
        {label}
      </div>
    </div>
  );
}

interface CheckProps {
  checked: boolean;
  setCheckStatus: (checked: boolean) => void;
  label: string;
}

export default function CheckBoxInput({
  checked,
  setCheckStatus,
  label,
}: CheckProps) {
  return (
    <div className="flex gap-1 text-xs">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setCheckStatus(e.target.checked)}
        className="cursor-pointer"
      />
      {label}
    </div>
  );
}

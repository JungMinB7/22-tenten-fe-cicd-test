export default function SubmitButtonSmall({
  label,
  disabled,
  onClick,
  type = 'submit',
}: {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button';
}) {
  return (
    <button
      type={type}
      onClick={() => {
        if (!disabled) onClick?.();
      }}
      className={`h-4 w-12 align-center rounded-full ${
        disabled
          ? 'bg-myLightBlue text-textOnLight cursor-not-allowed'
          : 'bg-myBlue text-textOnBlue'
      }`}
    >
      <div className="flex justify-self-center text-[0.625rem]">{label}</div>
    </button>
  );
}

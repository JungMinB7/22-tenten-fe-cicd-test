import { useRouter } from 'next/navigation';
import LoadingSmall from './loading/LoadingSmall';

interface SubmitButtonProps {
  onClick?: () => void;
  text: string;
  type?: 'submit' | 'button';
  disabled?: boolean;
  isLoading?: boolean;
}

export default function SubmitButton({
  text,
  disabled = false,
  type = 'submit',
  onClick,
  isLoading,
}: SubmitButtonProps) {
  const router = useRouter();

  return (
    <button type={type} disabled={disabled} onClick={onClick}>
      <div
        className={`flex items-center justify-center w-[9rem] h-[1.75rem] rounded-lg ${
          disabled
            ? 'bg-myLightBlue text-textOnLight cursor-not-allowed'
            : 'bg-myBlue text-textOnBlue'
        }`}
      >
        {isLoading ? <LoadingSmall /> : <div className="text-xs">{text}</div>}
      </div>
    </button>
  );
}

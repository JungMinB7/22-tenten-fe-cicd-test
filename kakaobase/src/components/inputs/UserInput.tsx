import { forwardRef } from 'react';

interface UserInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage: string;
}

const UserInput = forwardRef<HTMLInputElement, UserInputProps>(
  ({ label, errorMessage, ...props }, ref) => {
    return (
      <div>
        <div className="text-sm">{label}</div>
        <input
          ref={ref}
          {...props}
          className="w-full bg-transparent text-xs focus:outline-none"
        />
        <hr />
        <div className="text-redHeart text-[0.625rem] h-[0.5rem]">
          {errorMessage}
        </div>
      </div>
    );
  }
);

export default UserInput;

import { forwardRef } from 'react';

interface UserInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage: string;
}

const UserInput = forwardRef<HTMLInputElement, UserInputProps>(
  ({ label, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="text-sm">{label}</div>
        <input
          ref={ref}
          {...props}
          className="w-full bg-transparent text-xs focus:outline-none"
        />
        <hr className="h-[1px] bg-textColor" />
        <div className="text-redHeart text-[0.625rem] h-[0.5rem]">
          {errorMessage}
        </div>
      </div>
    );
  }
);

UserInput.displayName = 'UserInput';

export default UserInput;

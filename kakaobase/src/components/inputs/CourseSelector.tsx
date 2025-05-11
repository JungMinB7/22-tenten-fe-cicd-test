import { forwardRef } from 'react';
import { courseEnum } from '@/schemas/signupStep2Schema';

interface UserInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  errorMessage: string;
}

const CourseSelector = forwardRef<HTMLSelectElement, UserInputProps>(
  ({ label, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full mb-2">
        <div className="text-sm mb-1">{label}</div>
        <select
          name="course"
          ref={ref}
          {...props}
          className="w-full bg-innerContainerColor focus:outline-none text-xs rounded-full py-1 px-4 appearance-"
          defaultValue=""
        >
          <option disabled value="">
            수강 과정을 선택해 주세요.
          </option>
          {courseEnum.options.map((option) => (
            <option
              value={option}
              key={option}
              className="hover:bg-myLightBlue w-full"
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

CourseSelector.displayName = 'CourseSelector';

export default CourseSelector;

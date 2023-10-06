import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
  labelClass?: string;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextInput(props: InputProps) {
  const { labelClass, className, icon, ...inputProps } = props;

  const labelClasses = `flex items-center gap-2 py-2 px-4 border-none focus-within:ring-2 ring-indigo-500 ${labelClass}`;

  const inputClasses = `p-0 text-xs font-normal bg-transparent !border-none !ring-0 !outline-none ${className}`;

  return (
    <label className={labelClasses}>
      {icon && <span>{icon}</span>}
      <input className={inputClasses} type="text" {...inputProps} />
    </label>
  );
}

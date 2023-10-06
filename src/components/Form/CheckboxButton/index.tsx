import { useState } from "react";

import buildClass from "classnames";

type Props = {
  className?: string;
  checked?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
};

export default function CheckboxButton(props: Props) {
  const { checked: checkedProps = false, className, label, onChange } = props;

  const [checked, setChecked] = useState(checkedProps);

  const toggleChecked = () => {
    onChange && onChange(!checked);
    setChecked(!checked);
  };

  const classes = buildClass(
    "px-6 py-2 rounded-full cursor-pointer hover:bg-orange-100 transition-all duration-200 ease-in-out",
    className,
    {
      "bg-orange-100 text-orange-500 font-bold ring-1 ring-orange-400": checked,
    }
  );

  return (
    <label className={classes}>
      <input
        type="checkbox"
        className="hidden"
        hidden
        onChange={toggleChecked}
      />
      <span className="text-xs ">{label}</span>
    </label>
  );
}

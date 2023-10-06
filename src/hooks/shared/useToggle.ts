import { useCallback, useState } from "react";

export function useToggle(initialValue?: boolean) {
  const [value, setValue] = useState(!!initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle] as const;
}

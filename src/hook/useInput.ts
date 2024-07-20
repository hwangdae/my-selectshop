import { useState, ChangeEvent } from 'react';

const useInput = (initialValue: string): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, handleChange];
};

export default useInput;
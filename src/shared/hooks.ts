'use client';

import { useEffect, useState } from 'react';

import { debounce } from 'lodash';

export function useDebouncedValue<T>(value: T, timeout: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const fn = debounce(() => setDebouncedValue(value), timeout);
    fn();
    return fn.cancel;
  }, [timeout, value]);

  return debouncedValue;
}

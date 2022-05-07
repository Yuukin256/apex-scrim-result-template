import { useTernaryDarkMode } from 'usehooks-ts';

import type { ColorScheme } from '@mantine/core';

export const useColorScheme = () => {
  const { isDarkMode, ternaryDarkMode, setTernaryDarkMode } = useTernaryDarkMode();
  const colorScheme: ColorScheme = isDarkMode ? 'dark' : 'light';

  return {
    colorScheme,
    ternaryDarkMode,
    setTernaryDarkMode,
  } as const;
};

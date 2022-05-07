import { Button, createStyles, Popover, SegmentedControl } from '@mantine/core';
import { IconBrightness, IconMoonStars, IconSun } from '@tabler/icons';
import { useCallback } from 'react';
import { useBoolean } from 'usehooks-ts';

import { useColorScheme } from 'hooks/useColorScheme';

import type { FC } from 'react';

const useStyles = createStyles((theme) => ({
  popoverInner: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },

  label: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },

  control: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },
}));

const icons = {
  light: <IconSun size={16} />,
  system: <IconBrightness size={16} />,
  dark: <IconMoonStars size={16} />,
};

interface ThemeSwitchControlProps {
  orientation: 'vertical' | 'horizontal';
  value: 'light' | 'dark' | 'system';
  onChange: (value: string) => void;
}

const ThemeSwitchControl: FC<ThemeSwitchControlProps> = ({ orientation, value, onChange }) => {
  const { classes } = useStyles();

  return (
    <SegmentedControl
      value={value}
      onChange={onChange}
      data={[
        {
          value: 'light',
          label: <>{icons.light} ライト</>,
        },
        {
          value: 'system',
          label: <>{icons.system} システム</>,
        },
        {
          value: 'dark',
          label: <>{icons.dark} ダーク</>,
        },
      ]}
      size='sm'
      orientation={orientation}
      classNames={{ label: classes.label, root: classes.control }}
    />
  );
};

const WithPopover: FC = () => {
  const { classes, theme } = useStyles();

  const { value: opened, setValue: setOpened } = useBoolean(false);

  const { ternaryDarkMode, setTernaryDarkMode } = useColorScheme();
  const handleChange = useCallback(
    (value: string) => {
      if (value === 'light' || value === 'dark' || value === 'system') {
        setTernaryDarkMode(value);
      }
      setOpened(false);
    },
    [setOpened, setTernaryDarkMode]
  );

  const button = (
    <Button
      onClick={() => setOpened((o) => !o)}
      variant='subtle'
      color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
      size='sm'
      leftIcon={icons[ternaryDarkMode]}
      title='テーマを切り替える'
    >
      テーマ
    </Button>
  );

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={button}
      position='bottom'
      gutter={2}
      spacing={6}
      classNames={{
        inner: classes.popoverInner,
      }}
    >
      <ThemeSwitchControl orientation='vertical' value={ternaryDarkMode} onChange={handleChange} />
    </Popover>
  );
};

const WithoutPopover: FC = () => {
  const { ternaryDarkMode, setTernaryDarkMode } = useColorScheme();
  const handleChange = useCallback(
    (value: string) => {
      if (value === 'light' || value === 'dark' || value === 'system') {
        setTernaryDarkMode(value);
      }
    },
    [setTernaryDarkMode]
  );

  return <ThemeSwitchControl orientation='horizontal' value={ternaryDarkMode} onChange={handleChange} />;
};

interface ThemeSwitchProps {
  withPopover?: boolean;
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ withPopover }) => {
  if (withPopover) return <WithPopover />;
  else return <WithoutPopover />;
};

export default ThemeSwitch;

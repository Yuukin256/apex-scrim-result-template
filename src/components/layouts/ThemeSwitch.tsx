import { UnstyledButton, Center, Text, createStyles, useMantineColorScheme, Tooltip } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';

import type { FC } from 'react';

const useStyles = createStyles((theme) => ({
  control: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 1000,
    paddingLeft: theme.spacing.sm,
    paddingRight: 4,
    width: 140,
    height: 36,
  },

  iconWrapper: {
    height: 28,
    width: 28,
    borderRadius: 28,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.dark[4],
    color: theme.colorScheme === 'dark' ? theme.black : theme.colors.blue[2],
  },

  value: {
    lineHeight: 1,
  },
}));

const ThemeSwitch: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const anotherScheme = colorScheme === 'light' ? 'ダーク' : 'ライト';

  const Icon = colorScheme === 'dark' ? IconSun : IconMoonStars;
  const { classes } = useStyles();

  return (
    <Tooltip label={`${anotherScheme}テーマに切り替える`} openDelay={300}>
      <UnstyledButton aria-label='テーマ切り替え' className={classes.control} onClick={() => toggleColorScheme()}>
        <Text size='sm' className={classes.value}>
          {`${anotherScheme}テーマ`}
        </Text>
        <Center className={classes.iconWrapper}>
          <Icon size={18} />
        </Center>
      </UnstyledButton>
    </Tooltip>
  );
};

export default ThemeSwitch;

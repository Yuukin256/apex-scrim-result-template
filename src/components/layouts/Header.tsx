import { Burger, createStyles, Group, Header as MHeader, MediaQuery, Title } from '@mantine/core';

import ThemeSwitch from 'components/layouts/ThemeSwitch';
import { siteData } from 'data/siteData';

import type { Dispatch, FC, SetStateAction } from 'react';

interface HeaderProps {
  navbarOpened: boolean;
  setNavbarOpened: Dispatch<SetStateAction<boolean>>;
}

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    padding: theme.spacing.sm,
  },
}));

const Header: FC<HeaderProps> = ({ navbarOpened, setNavbarOpened }) => {
  const { classes, theme } = useStyles();
  const handleBurgerClick = () => setNavbarOpened((prev) => !prev);

  return (
    <MHeader height={50} className={classes.header}>
      <Group noWrap>
        <Burger opened={navbarOpened} onClick={handleBurgerClick} size='sm' color={theme.colors.gray[6]} />
        <Title order={4}>{siteData.siteTitle}</Title>
      </Group>

      <MediaQuery smallerThan='xs' styles={{ display: 'none' }}>
        <Group position='center'>
          <ThemeSwitch />
        </Group>
      </MediaQuery>
    </MHeader>
  );
};

export default Header;

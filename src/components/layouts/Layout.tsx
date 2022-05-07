import { AppShell, Container, createStyles, Transition } from '@mantine/core';
import { useBoolean, useEffectOnce, useMediaQuery } from 'usehooks-ts';

import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    minHeight: '100vh',
  },
}));

const Layout: FC<Props> = (props) => {
  const { classes, theme } = useStyles();

  const { value: navbarOpened, setValue: setNavbarOpened } = useBoolean(false);

  const { value: mounted, setValue: setMounted } = useBoolean(false);
  useEffectOnce(() => {
    setMounted(true);
  });

  const lessThanXs = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

  const header = (
    <Header navbarOpened={navbarOpened} setNavbarOpened={setNavbarOpened} shouldRenderThemeSwitch={!lessThanXs} />
  );
  const navbar = <Navbar opened={navbarOpened} setOpened={setNavbarOpened} shouldRenderThemeSwitch={lessThanXs} />;

  return (
    <Transition mounted={mounted} transition='fade' duration={400} timingFunction='ease-in'>
      {(styles) => (
        <div style={styles}>
          <AppShell
            header={header}
            navbar={navbar}
            footer={<Footer />}
            padding={0}
            classNames={{
              root: classes.root,
            }}
          >
            <Container fluid sx={(theme) => ({ padding: theme.spacing.sm })}>
              {props.children}
            </Container>
          </AppShell>
        </div>
      )}
    </Transition>
  );
};

export default Layout;

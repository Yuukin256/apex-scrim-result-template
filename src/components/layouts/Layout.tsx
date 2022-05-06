import { AppShell, Container, Transition } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { useEffect } from 'react';

import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const [navbarOpened, toggleNavbarOpened] = useBooleanToggle(false);

  const [mounted, toggleMounted] = useBooleanToggle(false);
  useEffect(() => {
    toggleMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition mounted={mounted} transition='fade' duration={400} timingFunction='ease-in'>
      {(styles) => (
        <div style={styles}>
          <AppShell
            header={<Header navbarOpened={navbarOpened} toggleNavbarOpened={toggleNavbarOpened} />}
            navbar={<Navbar opened={navbarOpened} toggleOpened={toggleNavbarOpened} />}
            footer={<Footer />}
            padding={0}
            styles={(theme) => ({
              root: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                minHeight: '100vh',
                position: 'relative',
              },
            })}
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

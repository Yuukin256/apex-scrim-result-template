import { AppShell, Container, Transition } from '@mantine/core';
import { useBoolean, useEffectOnce } from 'usehooks-ts';

import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { value: navbarOpened, setValue: setNavbarOpened } = useBoolean(false);

  const { value: mounted, setValue: setMounted } = useBoolean(false);
  useEffectOnce(() => {
    setMounted(true);
  });

  return (
    <Transition mounted={mounted} transition='fade' duration={400} timingFunction='ease-in'>
      {(styles) => (
        <div style={styles}>
          <AppShell
            header={<Header navbarOpened={navbarOpened} setNavbarOpened={setNavbarOpened} />}
            navbar={<Navbar opened={navbarOpened} setOpened={setNavbarOpened} />}
            footer={<Footer />}
            padding={0}
            styles={(theme) => ({
              root: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                minHeight: '100vh',
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

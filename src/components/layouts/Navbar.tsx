/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Navbar as MNavbar,
  createStyles,
  Box,
  Text,
  Group,
  Transition,
  ScrollArea,
  Accordion,
  useAccordionState,
  Loader,
  Center,
} from '@mantine/core';
import { useMediaQuery, useScrollLock } from '@mantine/hooks';
import { IconExternalLink, IconListSearch, IconTournament } from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import ExternalLink from 'components/atoms/ExternalLink';
import ThemeSwitch from 'components/layouts/ThemeSwitch';
import { siteData } from 'data/siteData';
import { useOtherSite } from 'hooks/useOtherSite';

import type { FC, SetStateAction } from 'react';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    padding: theme.spacing.xs,
  },

  themeSwitchSection: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },

  item: {
    marginBottom: theme.spacing.md,
    borderBottom: 0,
  },

  control: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    borderBottom: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
    }),
  },

  content: {
    padding: 0,
    paddingRight: theme.spacing.sm,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'block',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    lineHeight: 1.2,
    fontSize: theme.fontSizes.md,
    padding: theme.spacing.sm,
    paddingLeft: theme.spacing.lg,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    fontWeight: 500,
    borderLeftColor: theme.colors[theme.primaryColor]![theme.colorScheme === 'dark' ? 6 : 7],
    color: theme.colors[theme.primaryColor]![theme.colorScheme === 'dark' ? 2 : 7],
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor]![9], 0.25)
          : theme.colors[theme.primaryColor]![0],
    },
  },
}));

interface NavbarProps {
  opened: boolean;
  toggleOpened: (value?: SetStateAction<boolean> | undefined) => void;
}

const OtherSite: FC<{ opened: boolean }> = ({ opened }) => {
  const { classes } = useStyles();
  const { data, error } = useOtherSite(opened);

  if (error) {
    return (
      <Text color='red' align='center' p='sm'>
        読み込み中にエラーが発生しました
      </Text>
    );
  }

  if (!data) {
    return (
      <Center p='sm'>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      {data.map((item) => (
        <Box<typeof ExternalLink>
          component={ExternalLink}
          href={item.siteUrl}
          className={classes.link}
          key={item.siteUrl}
        >
          {item.tournamentName}
        </Box>
      ))}
    </>
  );
};

const Navbar: FC<NavbarProps> = ({ opened, toggleOpened }) => {
  const { classes, cx, theme } = useStyles();
  const { pathname } = useRouter();

  const internalLinks = siteData.internalLinks.map((item) => (
    <Link href={item.url} passHref key={item.url}>
      <Box
        component='a'
        className={cx(classes.link, { [classes.linkActive]: pathname === item.url })}
        onClick={() => toggleOpened(false)}
      >
        {item.label}
      </Box>
    </Link>
  ));
  const externalLinks = siteData.externalLinks.map((item) => (
    <Box<typeof ExternalLink> component={ExternalLink} href={item.url} className={classes.link} key={item.url}>
      <Group spacing='sm'>
        {item.icon} {item.label}
      </Group>
    </Box>
  ));

  // Navbar を全幅表示中はスクロールをロックする
  const [, setScrollLock] = useScrollLock(false);
  const lessThanXs = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  useEffect(() => {
    if (opened && lessThanXs) {
      setScrollLock(true);
    } else {
      setScrollLock(false);
    }
  }, [lessThanXs, opened, setScrollLock]);

  const [accordionState, accordionHandlers] = useAccordionState({
    total: 3,
    multiple: true,
    initialState: { '0': true, '1': true, '2': false },
  });

  // Navbar は breakpoint sx 以下で全幅表示
  return (
    <Transition mounted={opened} transition='slide-right' duration={300} timingFunction='ease-out'>
      {(styles) => (
        <MNavbar fixed width={{ base: '100%', xs: 350 }} style={styles} className={classes.navbar}>
          <ScrollArea type='hover' offsetScrollbars>
            {lessThanXs && (
              <MNavbar.Section className={classes.themeSwitchSection}>
                <ThemeSwitch />
              </MNavbar.Section>
            )}

            <MNavbar.Section grow>
              <Accordion
                multiple
                state={accordionState}
                onChange={accordionHandlers.setState}
                iconPosition='right'
                classNames={{
                  item: classes.item,
                  control: classes.control,
                  contentInner: classes.content,
                }}
              >
                <Accordion.Item
                  label={
                    <Group>
                      <IconListSearch size={18} />
                      <Text inherit>ページ一覧</Text>
                    </Group>
                  }
                >
                  {internalLinks}
                </Accordion.Item>

                <Accordion.Item
                  label={
                    <Group>
                      <IconExternalLink size={18} />
                      <Text inherit>外部リンク</Text>
                    </Group>
                  }
                >
                  {externalLinks}
                </Accordion.Item>

                <Accordion.Item
                  label={
                    <Group>
                      <IconTournament size={18} />
                      <Text inherit>他の大会の練習カスタム結果</Text>
                    </Group>
                  }
                >
                  <OtherSite opened={accordionState[2] ?? false} />
                </Accordion.Item>
              </Accordion>
            </MNavbar.Section>
          </ScrollArea>
        </MNavbar>
      )}
    </Transition>
  );
};

export default Navbar;

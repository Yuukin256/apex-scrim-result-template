import { createStyles, Text, Container, ActionIcon, Group, Stack } from '@mantine/core';
import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons';
import React from 'react';

import EL from 'components/atoms/ExternalLink';
import { siteData } from 'data/siteData';

import type { FC } from 'react';

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
    '& a': {
      color: 'inherit',
      textDecoration: 'underline',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
    },
  },
}));

const Footer: FC = () => {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Stack spacing={4}>
          <Text size='lg'>{siteData.siteTitle}</Text>
          <Text size='xs' color='dimmed'>
            {siteData.siteDescription}
          </Text>
        </Stack>
      </Container>

      <Container className={classes.afterFooter}>
        <Stack spacing='sm'>
          <Text color='dimmed' size='sm'>
            このサイトはGoogle Analyticsを使用しています (
            <EL href='https://policies.google.com/technologies/partner-sites?hl=ja'>詳細</EL>
            )。
          </Text>
          <Text color='dimmed' size='sm'>
            Built by <EL href='https:twitter.com/Yuukin256'>Yuukin256</EL> with{' '}
            <EL href='https://nextjs.org/'>Next.js</EL>, <EL href='https://mantine.dev/'>Mantine</EL>, and many awesome
            libraries. Hosted on <EL href='https://vercel.com/'>Vercel</EL>.
          </Text>
        </Stack>

        <Group spacing='xs' className={classes.social}>
          <ActionIcon<typeof EL>
            size='lg'
            component={EL}
            href='https:twitter.com/Yuukin256'
            title='製作者のTwitterアカウント (@Yuukin256)'
          >
            <IconBrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon<typeof EL>
            size='lg'
            component={EL}
            href={siteData.repositoryUrl}
            title='このサイトのGitHubレポジトリ'
          >
            <IconBrandGithub size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;

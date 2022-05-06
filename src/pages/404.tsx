import { createStyles, Title, Text, Button, Container, Center } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import type { NextPage } from 'next';
import type { FC } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 700,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

const NotFoundTitle: FC = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>秘密の場所を見つけました</Title>
      <Text color='dimmed' size='lg' align='center' className={classes.description}>
        こちらは404ページです。URLを間違ったか、ページが他のURLに移動されてしまったようです。
      </Text>
      <Center>
        <Link
          href={{
            pathname: '/',
          }}
          passHref
        >
          <Button variant='subtle' size='md'>
            トップページに戻る
          </Button>
        </Link>
      </Center>
    </Container>
  );
};

const NotFoundPage: NextPage = () => <NotFoundTitle />;

export default NotFoundPage;

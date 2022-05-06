import { Box } from '@mantine/core';
import { NextSeo } from 'next-seo';

import Description from 'components/blocks/Description';

import type { NextPage } from 'next';
import type { FC } from 'react';

const ExampleComponent: FC = () => {
  return (
    <>
      <Description />
      <Box sx={{ height: 1000 }} />
    </>
  );
};

const Page: NextPage = () => (
  <>
    <NextSeo title='トップ' />
    <ExampleComponent />
  </>
);

export default Page;

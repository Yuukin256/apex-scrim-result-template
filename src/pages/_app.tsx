import { ColorSchemeProvider, Global, MantineProvider } from '@mantine/core';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { useDarkMode } from 'usehooks-ts';

import Layout from 'components/layouts/Layout';
import { siteData } from 'data/siteData';

import type { ColorScheme } from '@mantine/core';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const { isDarkMode, toggle, enable, disable } = useDarkMode();
  const toggleColorScheme = (value?: ColorScheme) => {
    if (value === 'dark') {
      enable();
    } else if (value === 'light') {
      disable();
    } else {
      toggle();
    }
  };
  const colorScheme = isDarkMode ? 'dark' : 'light';

  return (
    <>
      <Head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <DefaultSeo
        titleTemplate={`%s - ${siteData.siteTitle}`}
        defaultTitle={siteData.siteTitle}
        description={siteData.siteDescription}
        openGraph={{
          type: 'website',
          title: siteData.siteTitle,
          description: siteData.siteDescription,
          site_name: siteData.siteTitle,
          url: siteData.siteUrl,
        }}
        twitter={{
          site: `@Yuukin256`,
          cardType: 'summary',
        }}
      />

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withNormalizeCSS
          theme={{
            colorScheme: colorScheme,
            fontSizes: {
              xs: 12,
              sm: 14,
              md: 15,
              lg: 16,
              xl: 18,
            },
          }}
        >
          <Global
            styles={(theme) => ({
              body: {
                ...theme.fn.fontStyles(),
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                lineHeight: theme.lineHeight,
                minHeight: '100vh',
              },
            })}
          />
          <Layout {...siteData}>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;

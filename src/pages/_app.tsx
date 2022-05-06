import { ColorSchemeProvider, Global, MantineProvider } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

import Layout from 'components/layouts/Layout';
import { siteData } from 'data/siteData';

import type { ColorScheme } from '@mantine/core';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: useColorScheme(),
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

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

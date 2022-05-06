import { IconBrandTwitter } from '@tabler/icons';

interface SiteData {
  tournamentName: string;
  tournamentDate: Date;
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  repositoryUrl: string;
  internalLinks: {
    label: JSX.Element | string;
    url: string;
  }[];
  externalLinks: {
    label: JSX.Element | string;
    url: string;
    icon: JSX.Element;
  }[];
}

const tournamentName = 'APEX大会';

export const siteData: SiteData = {
  tournamentName,
  tournamentDate: new Date('2022-05-04 23:00'), // だいたい終わるくらいにする
  siteTitle: `${tournamentName} 練習カスタム結果`,
  siteDescription: `${tournamentName} の事前練習カスタム (スクリム) の試合結果をまとめた非公式サイト`,
  siteUrl: '',
  repositoryUrl: 'https://github.com/Yuukin256/apex-scrim-result-template',
  internalLinks: [
    {
      label: 'トップ',
      url: '/',
    },
    {
      label: 'テスト',
      url: '/test',
    },
  ],
  externalLinks: [
    {
      label: '大会公式Twitter',
      url: 'https://twitter.com',
      icon: <IconBrandTwitter size={16} />,
    },
  ],
};

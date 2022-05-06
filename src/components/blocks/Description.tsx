import { Anchor, Text } from '@mantine/core';
import { format, isFuture } from 'date-fns';

import ExternalLink from 'components/atoms/ExternalLink';
import { siteData } from 'data/siteData';

import type { FC } from 'react';

const Description: FC = () => {
  const date = format(siteData.tournamentDate, 'yyyy年M月d日');
  const pastOrFuture = isFuture(siteData.tournamentDate) ? '行われる' : '行われた';

  return (
    <Text>
      {date}に{pastOrFuture} {siteData.tournamentName} の事前練習カスタム (スクリム)
      の試合結果一覧です。有志が非公式で作成し公開しています。<u>集計に誤りがある可能性があります</u>
      のでご了承ください。間違いに気づかれた方は、
      <Anchor<typeof ExternalLink> component={ExternalLink} href='https:twitter.com/Yuukin256'>
        Twitterアカウント
      </Anchor>
      のダイレクトメッセージでご連絡いただけますと幸いです。
      <Text size='xs'>
        試合結果を入力する作業の負担が大きいため、更新作業をお手伝いいただける方を募集しています
        (小声)。ご興味ありましたら先程のTwitterアカウントにご連絡ください (小声)。
      </Text>
    </Text>
  );
};

export default Description;

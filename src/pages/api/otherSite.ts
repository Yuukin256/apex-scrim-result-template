import { createClient } from 'microcms-js-sdk';

import type { NextApiHandler } from 'next';

const Api: NextApiHandler = async (_, res) => {
  try {
    if (!process.env['MICROCMS_DOMAIN'] || !process.env['MICROCMS_API_KEY']) {
      throw Error();
    }

    const client = createClient({
      serviceDomain: process.env['MICROCMS_DOMAIN'],
      apiKey: process.env['MICROCMS_API_KEY'],
    });

    const result = await client.get({ endpoint: 'list', queries: { limit: 100, orders: '-tournamentDate' } });
    if (!result.contents) {
      throw Error();
    }

    const data = result.contents;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal error has occurred.' });
  }
};

export default Api;

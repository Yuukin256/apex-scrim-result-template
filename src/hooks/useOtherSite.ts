import { useState } from 'react';
import useSWR from 'swr';

interface ApiResponseData {
  tournamentName: string;
  siteUrl: string;
  tournamentDate: Date;
}

export const useOtherSite = (shouldFetch: boolean): { data: ApiResponseData[] | undefined; error: unknown } => {
  const [state, setState] = useState<ApiResponseData[] | undefined>();

  const { data, error } = useSWR<ApiResponseData[]>(shouldFetch ? '/api/otherSite/' : null, (url) =>
    fetch(url).then((res) => res.json())
  );

  if (typeof data !== 'undefined' && typeof state === 'undefined') {
    setState(data);
  }

  if (typeof state !== 'undefined') {
    return { data: state, error: null };
  }

  return { data, error };
};

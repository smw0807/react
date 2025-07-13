import { NextApiRequest, NextApiResponse } from 'next';

/**
 * on-demand ISR
 * 1. 특정 페이지를 빌드하고 배포
 * 2. 특정 페이지를 수정하면, 해당 페이지를 다시 빌드하고 배포
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate('/');
    return res.json({ revalidated: true });
  } catch (e) {
    console.error(e);
    return res.status(500).send('Error revalidating');
  }
}

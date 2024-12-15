/* eslint-disable  */

import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth';

const handler = (req: Request, res: Response) => NextAuth(req as any, res as any, authOptions);

export { handler as GET, handler as POST };

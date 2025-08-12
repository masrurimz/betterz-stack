import { serverOnly } from '@tanstack/react-start';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { reactStartCookies } from 'better-auth/react-start';
import { env } from '../../env/server';
import { db } from '../db';
import { generateUUID } from '../db/schema';
import { user, session, account, verification } from '../db/schema/auth';

const getAuthConfig = serverOnly(() =>
  betterAuth({
    baseURL: env.BETTER_AUTH_URL || 'http://localhost:3000',
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: {
        user,
        session,
        account,
        verification,
      },
    }),

    // https://www.better-auth.com/docs/integrations/tanstack#usage-tips
    plugins: [reactStartCookies()],

    // https://www.better-auth.com/docs/concepts/session-management#session-caching
    // session: {
    //   cookieCache: {
    //     enabled: true,
    //     maxAge: 5 * 60, // 5 minutes
    //   },
    // },

    // https://www.better-auth.com/docs/concepts/oauth
    socialProviders: {
      // github: {
      //   clientId: env.GITHUB_CLIENT_ID,
      //   clientSecret: env.GITHUB_CLIENT_SECRET,
      // },
      // google: {
      //   clientId: env.GOOGLE_CLIENT_ID,
      //   clientSecret: env.GOOGLE_CLIENT_SECRET,
      // },
    },

    // https://www.better-auth.com/docs/authentication/email-password
    emailAndPassword: {
      enabled: true,
    },

    trustedOrigins: [env.CORS_ORIGIN || ''],
    secret: env.BETTER_AUTH_SECRET,
    advanced: {
      database: {
        generateId: generateUUID,
      },
    },
  })
);

export const auth = getAuthConfig();

import { ExpressAdapter } from '@uvue/server';

export default {
  adapter: ExpressAdapter,
  plugins: [
    ['@uvue/server/plugins/gzip',{
      filter: null,
      level: -1
    },],
    '@uvue/server/plugins/serverError',
    '@uvue/server/plugins/static',
    '@uvue/server/plugins/modernBuild',
    [
      '@uvue/server/plugins/cookie',
      {
        secret: 'aa2w'
      }
    ],
    './proxy'
  ]
}
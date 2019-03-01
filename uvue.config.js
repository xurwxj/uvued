import uuid from "./src/middleware/uuid";
export default {
  css: {
    normal: 'extract',
    vue: 'extract',
  },
  plugins: [
    '@uvue/core/plugins/asyncData',
    ['@uvue/core/plugins/middlewares',
    {
      middlewares: [uuid],
    },
  ],
    '@uvue/core/plugins/errorHandler',
    '@/plugins/navLoader',
    '@/plugins/axios'
  ]
}
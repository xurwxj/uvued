/**
 * This plugin create an axios HTTP client to do request.
 * It handles tokens too to acess to private routes on API.
 */

import axios from 'axios';

export default {
  beforeCreate(context, inject) {
    const { error, req } = context;

    const apiUrl = process.env.API_URL || 'http://localhost:8080';

    // Create axios client
    const httpClient = axios.create({
      // Change API url: depends on server side or client side
      baseURL: process.client ? '/' : apiUrl,
    });

    // Use request interceptors
    httpClient.interceptors.request.use(config => {
      let token = null;
      let uuid = null;
      let ua = null;

      // Get current token in cookies
      if (process.server) {
        token = req.cookies.token;
        uuid = req.cookies.uuid;
        ua = req.get('User-Agent');
      } else {
        token = require('js-cookie').get('token');
        uuid = require('js-cookie').get('uuid');
        ua = navigator.userAgent;
      }

      // If token: add header
      if (token) {
        config.headers['X-Auth-Token'] = `${token}`;
      }
      if (uuid) {
        config.headers['X-Client-ID'] = `${uuid}`;
      }
      if (ua) {
        config.headers['User-Agent'] = `${ua}`;
      }

      return config;
    });

    // Use response interceptor
    httpClient.interceptors.response.use(
      response => response,
      err => {
        if (err.response) {
          const { data } = err.response;
          // Catch error and use UVue error handler plugin to display it
          return error(data.error || 'Oups!', err.response.status);
        }
        return Promise.reject(err);
      },
    );

    // Inject httpClient eveywhere
    inject('axios', httpClient);

    // You can use it everywhere in your app:
    // - In UVue context: `context.$axios.get(...)`
    // - In your components: `this.$axios.get(...)`
    // - In your store actions: `this.$axios.get(...)`
  },
};
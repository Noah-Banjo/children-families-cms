export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'https://childrenandfamilieslr.com',
        'https://www.childrenandfamilieslr.com',
        'https://lr9childrenandfamilies.com',
        'https://www.lr9childrenandfamilies.com',
        'http://localhost:3000',
        'http://localhost:5173'
      ],
      credentials: true,
      headers: '*',
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

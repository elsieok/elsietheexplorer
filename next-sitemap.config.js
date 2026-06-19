export default {
  siteUrl: 'https://www.elsietheexplorer.com',
  generateRobotsTxt: true,
  exclude:['/admin', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: ['/admin', '/admin/*'] }, // block /admin from all bots
    ],
  },
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/'),
      await config.transform(config, '/about'),
      await config.transform(config, '/blog'),
      await config.transform(config, '/projects'),
      await config.transform(config, '/photography'),
    ];
  },
};
export default {
  siteUrl: 'https://www.elsietheexplorer.com',
  generateRobotsTxt: true,
  exclude:['/admin', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: ['/admin', '/admin/*'] }, // block /admin from all bots
    ],
  },
};
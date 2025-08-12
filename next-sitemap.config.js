export default {
  siteUrl: 'https://www.elsietheexplorer.com',
  generateRobotsTxt: true,
  exclude:['/admin'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: ['/admin'] }, // block /admin from all bots
    ],
  },
};
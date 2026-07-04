// PM2 ecosystem file for Hostinger Node.js hosting
module.exports = {
  apps: [
    {
      name: "gpubench",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};

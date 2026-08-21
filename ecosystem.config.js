module.exports = {
  apps: [{

    name: '3dpsh',
    script: '.output/server/index.mjs',
    // Resolve `script` relative to this file, not to whatever cwd PM2 was
    // invoked from (the deploy workflow runs `pm2 startOrRestart` over SSH).
    cwd: __dirname,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5001,
      HOST: '0.0.0.0'
    }
  }]
}
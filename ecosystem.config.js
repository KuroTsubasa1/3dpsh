module.exports = {
  apps: [{

    name: '3dpsh',
    script: '.output/server/index.mjs',
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
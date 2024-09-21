module.exports = {
    apps: [
        {
            name: 'illustry',
            script: './build-dist/illustry.js',
            instances: '1',
            exec_mode: 'fork',
            watch: true,
            restart_delay: 1000,
            max_restarts: 10,
            autorestart: true,
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            }
        }
    ]
};

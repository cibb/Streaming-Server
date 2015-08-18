'use strict';

module.exports = {
    api: {
        host: 'http://api.ncci.com.ar/'
    },
    server: {
        ip: process.env.IP || '127.0.0.1',
        port: process.env.PORT || 8080
    },
    cluster: {
        enabled: false
    },
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'eradio',
            charset: 'utf8'
        }
    }
};

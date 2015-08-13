'use strict';

module.exports = {
    api: {
        host: 'http://jw.ncci.com.ar/api/'
    },
    server: {
        ip: process.env.IP || '127.0.0.1',
        port: process.env.PORT || 4040
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
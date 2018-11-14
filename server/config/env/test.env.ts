module.exports = {
    env: 'development',
    db: 'ts_api_test',
    dialect: 'postgres',
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    serverPort: 3000,
    pgPort: 5432,
    dbUrl: 'postgres://postgres:root@localhost:5432/ts-api-test',
    secret: 's3cr3t',
    session: false,
    expTokenTime: '1m',
    expRefreshTokenTime: '10m'
}
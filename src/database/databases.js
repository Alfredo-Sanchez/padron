
require('dotenv').config()
const { Pool, Client } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URI || process.env.DATABASE_URI_LOCAL
})

pool.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})
module.exports = pool;
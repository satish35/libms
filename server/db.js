const Pool =require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "satish53",
    host: "localhost",
    port: 5432,
    database: "libms"
});

module.exports= pool;
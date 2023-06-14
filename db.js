import PG from 'pg';
const Pool = PG.Pool
const pool = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'hospital'
})

export default pool

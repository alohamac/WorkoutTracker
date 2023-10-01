import * as pg from 'pg'
const { Pool } = pg.default


const pool = new Pool({
    host: 'localhost',
    user: 'marcussagisi',
    port: 5432,
    database: 'chikaradb'
  });

export default pool;
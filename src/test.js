const pool = require('./db');

async function testDB() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Conexión exitosa a PostgreSQL:', res.rows[0]);
    } catch (err) {
        console.error('Error conectando a la base de datos:', err);
    }
}

testDB();
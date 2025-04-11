const { Pool } = require('pg');

const pool = new Pool({
  host: 'aws-0-us-east-1.pooler.supabase.com',
  user: 'postgres.easbqcmaeuociirekwxw',
  password: 'o7zQOi6KWQ2FtDvO',
  database: 'postgres',
  port: 5432,
  ssl: { rejectUnauthorized: false } // Esto es importante para conexión segura en Supabase
});

module.exports = pool;
const { Client } = require('pg');

const client = new Client({
  host: 'aws-0-us-east-1.pooler.supabase.com',
  port: 5432,
  user: 'postgres.easbqcmaeuociirekwxw',
  password: 'gKE63kRUQfrY70yI',
  database: 'postgres',
  ssl: { rejectUnauthorized: false } // necesario para Supabase
});

client.connect()
  .then(() => console.log('Conectado'))
  .catch(err => console.error('Error en la conexión:', err.message));

module.exports = client;
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/taskmanager',
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

export async function getUserByUsernameAndPassword(username: string, password: string) {
  const res = await query('SELECT * FROM users WHERE username = $1', [username]);
  return res.rows[0];
}

export async function getToken(token: string) {
  const res = await query('SELECT * FROM tokens WHERE token = $1', [token]);
  return res.rows[0];
}

export async function storeToken(userId: number, token: string): Promise<string> {
    await query('INSERT INTO tokens (user_id, token) VALUES ($1, $2)', [userId, token]);
    return token;
}

export default pool;

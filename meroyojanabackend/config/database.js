import pkg from 'pg'
const { Pool } = pkg
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'meroyojana',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
})

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database')
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export const connectDB = async () => {
  try {
    const client = await pool.connect()
    console.log('Database connection established')
    client.release()
    
    // Initialize tables if they don't exist
    await initializeTables()
  } catch (error) {
    console.error('Database connection error:', error.message)
  }
}

const initializeTables = async () => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'Ward Officer',
        office_type VARCHAR(100),
        office_name VARCHAR(255),
        jurisdiction VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create audit_logs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        action VARCHAR(255) NOT NULL,
        entity_type VARCHAR(100),
        entity_id INTEGER,
        details JSONB,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create default super admin if not exists
    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.default.hash('admin123', 10)
    
    await pool.query(`
      INSERT INTO users (username, email, password, role, is_active)
      VALUES ('admin', 'admin@meroyojana.gov.np', $1, 'Super Admin', true)
      ON CONFLICT (username) DO NOTHING
    `, [hashedPassword])

    console.log('Database tables initialized')
  } catch (error) {
    console.error('Error initializing tables:', error.message)
  }
}

export default pool


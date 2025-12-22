import { neon } from '@neondatabase/serverless';

// Initialize Neon client
const sqlClient = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Create visitors table if it doesn't exist
    await sqlClient`
      CREATE TABLE IF NOT EXISTS visitors (
        id SERIAL PRIMARY KEY,
        visit_type VARCHAR(50) NOT NULL,
        id_number VARCHAR(20),
        visit_date DATE NOT NULL,
        guest_name VARCHAR(255) NOT NULL,
        guest_phone VARCHAR(20) NOT NULL,
        escort_name VARCHAR(255) NOT NULL,
        escort_phone VARCHAR(20) NOT NULL,
        arrival_method VARCHAR(20) NOT NULL,
        vehicle_number VARCHAR(20),
        entry_gate VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create index on visit_date for faster sorting
    await sqlClient`
      CREATE INDEX IF NOT EXISTS idx_visit_date ON visitors(visit_date DESC, created_at DESC)
    `;

    return res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return res.status(500).json({ message: 'שגיאה באתחול מסד הנתונים', error: error.message });
  }
}



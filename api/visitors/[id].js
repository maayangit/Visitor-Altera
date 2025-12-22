import { neon } from '@neondatabase/serverless';

// Initialize Neon client
const sqlClient = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'DELETE') {
      const adminToken = req.headers['x-admin-token'];
      if (!process.env.ADMIN_TOKEN || adminToken !== process.env.ADMIN_TOKEN) {
        return res.status(403).json({ message: 'אין הרשאה למחוק רשומות' });
      }

      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: 'ID is required' });
      }

      const result = await sqlClient`
        DELETE FROM visitors 
        WHERE id = ${parseInt(id)}
        RETURNING *
      `;

      if (result.length === 0) {
        return res.status(404).json({ message: 'מבקר לא נמצא' });
      }

      return res.status(200).json({ message: 'מבקר נמחק בהצלחה' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'שגיאה בשרת', error: error.message });
  }
}



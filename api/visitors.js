import { neon } from '@neondatabase/serverless';

// Initialize Neon client
const sqlClient = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Get all visitors
      const visitors = await sqlClient`
        SELECT * FROM visitors 
        ORDER BY visit_date DESC, created_at DESC
      `;
      
      return res.status(200).json(visitors);
    }

    if (req.method === 'POST') {
      // Create new visitor
      const {
        visitType,
        idNumber,
        visitDate,
        guestName,
        guestPhone,
        escortName,
        escortPhone,
        arrivalMethod,
        vehicleNumber,
        entryGate
      } = req.body;

      // Validate required fields
      if (!visitType || !visitDate || !guestName || !guestPhone || !escortName || !escortPhone || !arrivalMethod) {
        return res.status(400).json({ message: 'יש למלא את כל השדות הנדרשים' });
      }

      // Validate contractor ID
      if (visitType === 'contractor' && !idNumber) {
        return res.status(400).json({ message: 'יש למלא תעודת זהות עבור קבלן חד יומי' });
      }

      // Validate vehicle fields
      if (arrivalMethod === 'vehicle') {
        if (!vehicleNumber || !entryGate) {
          return res.status(400).json({ message: 'יש למלא את כל שדות הרכב' });
        }
      }

      const result = await sqlClient`
        INSERT INTO visitors (
          visit_type, id_number, visit_date, guest_name, guest_phone,
          escort_name, escort_phone, arrival_method, vehicle_number, entry_gate
        ) VALUES (
          ${visitType}, ${idNumber || null}, ${visitDate}, ${guestName}, ${guestPhone},
          ${escortName}, ${escortPhone}, ${arrivalMethod}, ${vehicleNumber || null}, ${entryGate || null}
        )
        RETURNING *
      `;

      return res.status(201).json(result[0]);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'שגיאה בשרת', error: error.message });
  }
}


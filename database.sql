-- יצירת טבלת מבקרים עבור מערכת ניהול מבקרים - אלטרה
-- הרץ את הקוד הזה ב-Neon SQL Editor

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
);

-- יצירת אינדקס למיון מהיר לפי תאריך
CREATE INDEX IF NOT EXISTS idx_visit_date ON visitors(visit_date DESC, created_at DESC);

-- הערה: הטבלה מוכנה לשימוש!
-- כל המבקרים יישמרו כאן ויוצגו בטבלה מסודרת לפי תאריך (החדש ביותר ראשון)



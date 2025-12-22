# מערכת ניהול מבקרים - אלטרה

אפליקציית React לניהול מבקרים עם חיבור ל-Neon DB ופריסה ב-Vercel.

## תכונות

- ✅ טופס רישום מבקרים עם כל השדות הנדרשים
- ✅ שדות מותנים (ת.ז. עבור קבלן, פרטי רכב עבור הגעה ברכב)
- ✅ טבלת מבקרים מסודרת לפי תאריך (החדש ביותר ראשון)
- ✅ חיבור ל-PostgreSQL דרך Neon
- ✅ API routes עבור Vercel
- ✅ עיצוב מודרני ורספונסיבי

## דרישות

- Node.js 18+ 
- חשבון Neon (חינמי): https://neon.tech
- חשבון Vercel (חינמי): https://vercel.com
- חשבון GitHub

## התקנה מקומית

1. התקן את התלויות:
```bash
npm install
```

2. צור קובץ `.env` מהדוגמה:
```bash
cp .env.example .env
```

3. מלא את `DATABASE_URL` עם מחרוזת החיבור מ-Neon

4. אתחל את מסד הנתונים:
```bash
# הרץ את ה-API endpoint הזה פעם אחת:
# POST http://localhost:3000/api/init-db
# או השתמש ב-Neon SQL Editor ליצירת הטבלה
```

5. הרץ את השרת המקומי:
```bash
npm run dev
```

## יצירת מסד הנתונים ב-Neon

1. היכנס ל-https://console.neon.tech
2. צור פרויקט חדש
3. העתק את ה-Connection String
4. הרץ את ה-SQL הבא ב-SQL Editor:

```sql
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

CREATE INDEX IF NOT EXISTS idx_visit_date ON visitors(visit_date DESC, created_at DESC);
```

## פריסה ל-Vercel

### דרך 1: דרך GitHub (מומלץ)

1. העלה את הקוד ל-GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. היכנס ל-Vercel: https://vercel.com
3. לחץ על "New Project"
4. בחר את ה-repository שלך
5. הוסף Environment Variable:
   - Name: `DATABASE_URL`
   - Value: מחרוזת החיבור מ-Neon
6. לחץ על "Deploy"

### דרך 2: דרך Vercel CLI

```bash
npm i -g vercel
vercel
```

עקוב אחר ההוראות והוסף את `DATABASE_URL` ב-Vercel Dashboard.

## מבנה הפרויקט

```
.
├── api/                 # API routes עבור Vercel
│   ├── visitors.js      # GET, POST מבקרים
│   ├── visitors/[id].js # DELETE מבקר
│   └── init-db.js      # אתחול מסד הנתונים
├── src/
│   ├── components/
│   │   ├── VisitorForm.jsx    # טופס רישום
│   │   └── VisitorsTable.jsx   # טבלת מבקרים
│   ├── App.jsx          # קומפוננטה ראשית
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── vercel.json
```

## API Endpoints

- `GET /api/visitors` - קבלת כל המבקרים
- `POST /api/visitors` - יצירת מבקר חדש
- `DELETE /api/visitors/[id]` - מחיקת מבקר
- `POST /api/init-db` - אתחול מסד הנתונים (פעם אחת)

## תמיכה

לשאלות או בעיות, פתח issue ב-GitHub repository.

## רישיון

MIT



# הוראות פריסה - מערכת ניהול מבקרים

## שלב 1: יצירת מסד נתונים ב-Neon

1. היכנס ל-https://console.neon.tech
2. צור חשבון חדש (חינמי)
3. לחץ על "Create Project"
4. בחר שם לפרויקט (למשל: "visitors-altera")
5. לחץ על "Create Project"

### יצירת הטבלה:

1. לאחר יצירת הפרויקט, לחץ על "SQL Editor"
2. העתק והדבק את ה-SQL הבא:

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

3. לחץ על "Run" לביצוע

### קבלת Connection String:

1. לחץ על "Connection Details" או "Connection String"
2. העתק את ה-Connection String (נראה כך: `postgresql://user:password@host/database?sslmode=require`)
3. שמור אותו - תצטרך אותו בשלב הבא

## שלב 2: העלאת הקוד ל-GitHub

1. פתח את Git Bash או Terminal
2. נווט לתיקיית הפרויקט:
```bash
cd "C:\Projects Cursor\Visitors Altera JER"
```

3. אתחל Git repository:
```bash
git init
git add .
git commit -m "Initial commit - Visitors management system"
```

4. צור repository חדש ב-GitHub:
   - היכנס ל-https://github.com
   - לחץ על "+" > "New repository"
   - בחר שם (למשל: "visitors-altera")
   - אל תסמן "Initialize with README"
   - לחץ על "Create repository"

5. חבר את ה-local repository ל-GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/visitors-altera.git
git branch -M main
git push -u origin main
```

## שלב 3: פריסה ל-Vercel

1. היכנס ל-https://vercel.com
2. לחץ על "Sign Up" או "Log In" (ניתן להתחבר עם GitHub)
3. לחץ על "Add New..." > "Project"
4. בחר את ה-repository שיצרת ב-GitHub
5. לחץ על "Import"

### הגדרת Environment Variables:

1. בחלון ההגדרות, גלול למטה ל-"Environment Variables"
2. הוסף משתנה חדש:
   - **Name**: `DATABASE_URL`
   - **Value**: הדבק את ה-Connection String מ-Neon
   - סמן את כל הסביבות (Production, Preview, Development)
3. לחץ על "Add"

### Build Settings:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

4. לחץ על "Deploy"

5. המתן מספר דקות עד שהפריסה תסתיים

6. לאחר שהפריסה תסתיים, תקבל קישור (למשל: `https://visitors-altera.vercel.app`)

## שלב 4: בדיקה

1. פתח את הקישור שקיבלת מ-Vercel
2. נסה להוסיף מבקר חדש
3. ודא שהנתונים נשמרים ונצפים בטבלה

## פתרון בעיות

### הבעיה: "Database connection failed"
**פתרון**: ודא שה-`DATABASE_URL` מוגדר נכון ב-Vercel Environment Variables

### הבעיה: "Table does not exist"
**פתרון**: ודא שיצרת את הטבלה ב-Neon SQL Editor

### הבעיה: Build fails
**פתרון**: 
- ודא ש-`package.json` קיים ומוגדר נכון
- בדוק את ה-logs ב-Vercel Dashboard

## עדכונים עתידיים

לכל עדכון בקוד:
```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel יזהה את השינויים ויבצע פריסה אוטומטית!



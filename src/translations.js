export const translations = {
  he: {
    // Header
    'app.title': 'מערכת ניהול מבקרים',
    'app.subtitle': 'אלטרה - בקרת ביטחון ואישור מבקרים',
    'app.addVisit': 'הוסף ביקור חדש',
    'app.viewList': 'הצג רשימת מבקרים',
    
    // Form
    'form.title': 'טופס רישום מבקר',
    'form.visitType': 'סוג הביקור *',
    'form.selectVisitType': 'בחר סוג ביקור',
    'form.idNumber': 'תעודת זהות *',
    'form.idNumberPlaceholder': 'הזן תעודת זהות',
    'form.contractorNotice': 'לאישור סופי של הכנסת קבלן חד יומי יש לשלוח את מספר תעודת הזהות לאדמינית ולקבל אישור סופי במייל',
    'form.visitDate': 'תאריך הביקור *',
    'form.guestName': 'שם האורח *',
    'form.guestNamePlaceholder': 'הזן שם מלא',
    'form.guestPhone': 'טלפון האורח *',
    'form.guestPhonePlaceholder': 'הזן מספר טלפון',
    'form.escortName': 'מי המלווה (שם העובד) *',
    'form.escortNamePlaceholder': 'הזן שם העובד המלווה',
    'form.escortPhone': 'טלפון המלווה *',
    'form.escortPhonePlaceholder': 'הזן מספר טלפון',
    'form.arrivalMethod': 'באיזו דרך מגיע *',
    'form.selectArrival': 'בחר דרך הגעה',
    'form.foot': 'רגלית',
    'form.vehicle': 'רכב',
    'form.vehicleNumber': 'מספר רכב *',
    'form.vehicleNumberPlaceholder': 'הזן מספר רכב',
    'form.entryGate': 'מאיזה שער נכנס *',
    'form.selectGate': 'בחר שער כניסה',
    'form.submit': 'שמור מבקר',
    'form.submitting': 'שומר...',
    
    // Visit types
    'visitType.private': 'אורח פרטי',
    'visitType.business': 'ביקור עסקי',
    'visitType.interview': 'ראיון עבודה',
    'visitType.contractor': 'קבלן חד יומי',
    'visitType.supplier': 'ספק',
    
    // Gates
    'gate.main': 'שער ראשי אינטל',
    'gate.altera': 'שער דרום אלטרה',
    
    // Table
    'table.title': 'רשימת מבקרים',
    'table.loading': 'טוען נתונים...',
    'table.noData': 'אין מבקרים רשומים',
    'table.date': 'תאריך',
    'table.visitType': 'סוג ביקור',
    'table.guestName': 'שם האורח',
    'table.phone': 'טלפון',
    'table.escort': 'המלווה',
    'table.arrival': 'דרך הגעה',
    'table.details': 'פרטים נוספים',
    'table.actions': 'פעולות',
    'table.delete': 'מחק',
    'table.deleting': 'מוחק...',
    'table.vehicle': 'רכב',
    'table.gate': 'שער',
    'table.idNumber': 'ת.ז',
    'table.adminCode': 'קוד מנהל למחיקת רשומות',
    'table.adminConfirm': 'אישור',
    
    // Admin
    'admin.viewPrompt': 'יש להזין קוד מנהל לצפייה ברשימת מבקרים:',
    'admin.viewError': 'אין הרשאה לצפות ברשימת מבקרים. נא להזין קוד מנהל.',
    'admin.deleteError': 'רק מנהלים יכולים למחוק רשומות. נא להזין קוד מנהל למחיקה.',
    'admin.deleteCodeError': 'קוד מנהל שגוי או חסר. אין הרשאה למחוק רשומות.',
    'admin.deleteConfirm': 'האם אתה בטוח שברצונך למחוק את המבקר הזה?',
    'admin.deleteSuccess': 'מבקר נמחק בהצלחה',
    'admin.deleteFailed': 'שגיאה במחיקת המבקר',
    'admin.codeRequired': 'יש להזין קוד מנהל למחיקה',
    
    // Messages
    'message.success': 'המבקר נרשם בהצלחה!',
    'message.error': 'שגיאה בשמירת המבקר. נסה שוב.',
    'message.requiredFields': 'יש למלא את כל השדות הנדרשים',
    'message.vehicleFields': 'יש למלא את כל שדות הרכב',
    
    // Language
    'lang.hebrew': 'עברית',
    'lang.english': 'English'
  },
  en: {
    // Header
    'app.title': 'Visitor Management System',
    'app.subtitle': 'Altera - Security Control and Visitor Approval',
    'app.addVisit': 'Add New Visit',
    'app.viewList': 'View Visitors List',
    
    // Form
    'form.title': 'Visitor Registration Form',
    'form.visitType': 'Visit Type *',
    'form.selectVisitType': 'Select visit type',
    'form.idNumber': 'ID Number *',
    'form.idNumberPlaceholder': 'Enter ID number',
    'form.contractorNotice': 'For final approval of a daily contractor entry, send the ID number to the administrator and receive final email confirmation',
    'form.visitDate': 'Visit Date *',
    'form.guestName': 'Guest Name *',
    'form.guestNamePlaceholder': 'Enter full name',
    'form.guestPhone': 'Guest Phone *',
    'form.guestPhonePlaceholder': 'Enter phone number',
    'form.escortName': 'Escort (Employee Name) *',
    'form.escortNamePlaceholder': 'Enter escort employee name',
    'form.escortPhone': 'Escort Phone *',
    'form.escortPhonePlaceholder': 'Enter phone number',
    'form.arrivalMethod': 'How do they arrive? *',
    'form.selectArrival': 'Select arrival method',
    'form.foot': 'On Foot',
    'form.vehicle': 'Vehicle',
    'form.vehicleNumber': 'Vehicle Number *',
    'form.vehicleNumberPlaceholder': 'Enter vehicle number',
    'form.entryGate': 'Which gate do they enter? *',
    'form.selectGate': 'Select entry gate',
    'form.submit': 'Save Visitor',
    'form.submitting': 'Saving...',
    
    // Visit types
    'visitType.private': 'Private Guest',
    'visitType.business': 'Business Visit',
    'visitType.interview': 'Job Interview',
    'visitType.contractor': 'Daily Contractor',
    'visitType.supplier': 'Supplier',
    
    // Gates
    'gate.main': 'Main Intel Gate',
    'gate.altera': 'South Altera Gate',
    
    // Table
    'table.title': 'Visitors List',
    'table.loading': 'Loading data...',
    'table.noData': 'No visitors registered',
    'table.date': 'Date',
    'table.visitType': 'Visit Type',
    'table.guestName': 'Guest Name',
    'table.phone': 'Phone',
    'table.escort': 'Escort',
    'table.arrival': 'Arrival Method',
    'table.details': 'Additional Details',
    'table.actions': 'Actions',
    'table.delete': 'Delete',
    'table.deleting': 'Deleting...',
    'table.vehicle': 'Vehicle',
    'table.gate': 'Gate',
    'table.idNumber': 'ID',
    'table.adminCode': 'Admin code for deleting records',
    'table.adminConfirm': 'Confirm',
    
    // Admin
    'admin.viewPrompt': 'Enter admin code to view visitors list:',
    'admin.viewError': 'No permission to view visitors list. Please enter admin code.',
    'admin.deleteError': 'Only administrators can delete records. Please enter admin code for deletion.',
    'admin.deleteCodeError': 'Incorrect or missing admin code. No permission to delete records.',
    'admin.deleteConfirm': 'Are you sure you want to delete this visitor?',
    'admin.deleteSuccess': 'Visitor deleted successfully',
    'admin.deleteFailed': 'Error deleting visitor',
    'admin.codeRequired': 'Please enter admin code for deletion',
    
    // Messages
    'message.success': 'Visitor registered successfully!',
    'message.error': 'Error saving visitor. Please try again.',
    'message.requiredFields': 'Please fill all required fields',
    'message.vehicleFields': 'Please fill all vehicle fields',
    
    // Language
    'lang.hebrew': 'עברית',
    'lang.english': 'English'
  }
}

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || key
}


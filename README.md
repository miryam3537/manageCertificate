# Manage Certificate — מערכת לניהול תעודות

מערכת שכתבתי במסגרת פרקטיקום במשרד הדתות,
לניהול מלאי ועיבוד תעודות מסוגים שונים (רגילה, מהדרין ונישואין).
המטרה שלי הייתה ליצור כלי נוח למנהלי לשכות — עם ממשק מודרני,
חוויית משתמש פשוטה, וגישה ישירה לכל הנתונים בזמן אמת.

---

## ⚙️ טכנולוגיות

### צד שרת
- ‎.NET Core 
- Entity Framework (Database First)
- REST API
- SQL Server

### צד לקוח
- Angular 19
- RxJS
- Angular Material
- TypeScript, SCSS

---
## 🗃️ מבנה הפרויקט  

```
ManageCertificate/
├── ManageCertificate/        # צד שרת (API)
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Services/
│   ├── appsettings.json
│   └── Program.cs
│
├── wwwroot/
│   └── client/                # צד לקוח (Angular)
│       ├── src/
│       ├── angular.json
│       └── package.json
│
└── README.md
```


## 💡 מה אפשר לעשות במערכת

- לצפות בכל התעודות ולסנן לפי סוג, סטטוס, שנה ולשכה
- לבצע עדכונים ישירות מהמערכת
- להפיק נתונים וסטטיסטיקות בזמן אמת
- לנהל פעולות הדפסה ודוחות
- לעבוד בעיצוב רספונסיבי ונקי
---
## 🖼️ תצוגה חזותית

🔗 עיצוב Figma
צפו בעיצוב המקורי (רק צפייה): [Figma Link](https://www.figma.com/proto/p17DRJzpwOYmLfSha2xZ0N/%D7%A4%D7%A8%D7%A7%D7%98%D7%99%D7%A7%D7%95%D7%9D?node-id=725-1279&t=AJV7PXWiG8oOix3H-1&scaling=scale-down-width&content-scaling=fixed&page-id=426%3A1287&starting-point-node-id=438%3A25
### 🎬 סרטון / GIF
> GIF קצר שמראה שימוש בסיסי במערכת:

---

## 🚧 מצב נוכחי


הManage Certificate עדיין בפיתוח. אני ממשיכה לעבוד על פיצ'רים חדשים, שיפורי חוויית משתמש וסטטיסטיקות מתקדמות. הפרויקט מוכן להרצה בסביבת הפיתוח המקומית, אך חלק מהפיצ'רים עדיין בשלבי פיתוח.

---

## 🚀 איך מריצים

### צד שרת
1. פותחים את (`ManageCertificate.sln`) ב־Visual Studio
2. מוודאים שה־Connection String ב־`appsettings.json` מכוון למסד הנתונים המקומי
3. מריצים את הפרויקט דרך IIS Express או HTTP

### צד לקוח
1. נכנסים לתיקייה `wwwroot/client`
2. מריצים בטרמינל:
   ```bash
   npm install
   ng serve
   ```
3. ניגשים לדפדפן: [http://localhost:4200](http://localhost:4200)

---

## 🗃️ הערות על מסד הנתונים

הפרויקט עובד בגישת Database First. לסנכרון מודלים מחדש:
```bash
Scaffold-DbContext "ConnectionString" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force
```

---

## 👩‍💻 קצת עליי

אני מרים ילין, מפתחת Full Stack עם התמחות ב־.NET ו־Angular. הפרויקט הזה נבנה מתוך צורך אמיתי שעלה במהלך ההתמחות שלי — והיווה הזדמנות להעמיק בעבודה עם API, Angular Material ו־RxJS בצורה פרקטית.
## על הפרויקט

הפרויקט פותח **ביחד עם (https://github.com/YaelKug)**.  
הגרסה שלי בגיטהאב נוצרה כ־Fork מהריפו המקורי אצלה, לצורך עבודה משותפת והצגת הפרויקט גם בפרופיל שלי.  

 עבדנו יחד על הפיתוח, התכנון והמימוש במשותף.

📧 [miryam3537@gmail.com](mailto:miryam3537@gmail.com)

---

## 🧩 קבצים שבריפו

- קוד מלא צד שרת וצד לקוח
- הוראות הרצה
- עיצוב מבוסס Figma
- קובץ Database מקומי לדוגמה

---

## 📝 הערה קטנה לסיום

המערכת רצה באופן תקין על סביבת הפיתוח המקומית, אך ניתן להתאים אותה גם לפריסה בשרת חיצוני או ב־Docker במידת הצורך.

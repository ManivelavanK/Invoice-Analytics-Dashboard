@echo off
echo Setting up Invoice Analytics Dashboard...

echo.
echo 1. Installing root dependencies...
npm install

echo.
echo 2. Installing API dependencies...
cd apps\api
npm install
cd ..\..

echo.
echo 3. Installing Web dependencies...
cd apps\web
npm install
cd ..\..

echo.
echo 4. Generating Prisma client...
cd apps\api
npx prisma generate
cd ..\..

echo.
echo 5. Setting up Python environment...
cd services\vanna
pip install -r requirements.txt
cd ..\..

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Create PostgreSQL database: createdb invoice_analytics
echo 2. Update DATABASE_URL in apps\api\.env
echo 3. Update GROQ_API_KEY in services\vanna\.env
echo 4. Push database schema: cd apps\api && npx prisma db push
echo 5. Seed database: cd apps\api && npm run db:seed
echo 6. Start development: npm run dev
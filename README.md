# InvoiceHub

InvoiceHub is a modern invoice management system built with Next.js 14, Material UI, and PostgreSQL. This application allows users to create, manage, and track invoices efficiently.

## Live Demo
🚀 [InvoiceHub](https://invoice-hub-nextjs.vercel.app/)

## Tech Stack

- **Frontend:**
  - Next.js 14 (App Router)
  - Material UI (MUI)
  - TypeScript
  - React Query

- **Backend:**
  - Next.js API Routes
  - PostgreSQL Database
  - Prisma ORM

- **Deployment:**
  - Vercel
  - Vercel Postgres

## Features

- 📱 Responsive design for mobile and desktop
- 📊 Dashboard for invoice overview
- ➕ Create and manage invoices
- 📝 Edit existing invoices
- 🗑️ Delete invoices
- 📋 List view of all invoices
- 🔍 Search and filter capabilities

## Database Schema

### Table: invoices

```sql
CREATE TABLE "public"."invoices" (
  "id" int4 NOT NULL DEFAULT nextval('invoices_id_seq'::regclass),
  "name" varchar(255),
  "number" varchar(255),
  "due_date" date,
  "amount" float4,
  "status" varchar(25)
);

ALTER TABLE "public"."invoices" ADD CONSTRAINT "invoices_pkey" PRIMARY KEY ("id");
```

#### Columns Description:
- `id`: Auto-incrementing primary key
- `name`: Invoice name (VARCHAR 255)
- `number`: Invoice number (VARCHAR 255)
- `due_date`: Due date of the invoice (DATE)
- `amount`: Invoice amount (FLOAT4)
- `status`: Invoice status (VARCHAR 25) - Can be 'Paid', 'Pending', or 'Overdue'

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:5432/database_name"
DB_USER="your_database_user"
DB_HOST="your_database_host"
DB_NAME="your_database_name"
DB_PASSWORD="your_database_password"

# Optional: Add SSL configuration if needed
SSL_ENABLED=true
```

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/invoice-hub-nextjs.git
cd invoice-hub-nextjs
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
- Copy `.env.example` to `.env`
- Update the variables with your database credentials

4. **Set up the database**
- Create a PostgreSQL database
- Run the SQL schema provided above
- Update `.env` with your database credentials

5. **Run the development server**
```bash
npm run dev
```

6. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

## Deployment

This project is deployed on Vercel with automatic deployments from the main branch.

Visit: [https://invoice-hub-nextjs.vercel.app/](https://invoice-hub-nextjs.vercel.app/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

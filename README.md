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
Create a `.env` file in the root directory and add:
```env
DATABASE_URL="your-postgresql-connection-string"
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

## Database Schema

The application uses PostgreSQL with the following main tables:
- `invoices`
- `users`
- `invoice_items`

## Deployment

This project is deployed on Vercel with automatic deployments from the main branch.

Visit: [https://invoice-hub-nextjs.vercel.app/](https://invoice-hub-nextjs.vercel.app/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

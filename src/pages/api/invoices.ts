import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: true
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getInvoices(req, res);
    case 'POST':
      return addInvoice(req, res);
    case 'DELETE':
      return deleteInvoice(req, res);
    case 'PUT':
      return editInvoice(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getInvoices(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await pool.query('SELECT * FROM invoices');
    res.status(200).json(result.rows);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
}

async function addInvoice(req: NextApiRequest, res: NextApiResponse) {
  const { name, number, dueDate, amount, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO invoices (name, number, due_date, amount, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, number, dueDate, amount, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
}

async function deleteInvoice(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    await pool.query('DELETE FROM invoices WHERE id = $1', [id]);
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
}

async function editInvoice(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { name, number, dueDate, amount, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE invoices SET name = $1, number = $2, due_date = $3, amount = $4, status = $5 WHERE id = $6 RETURNING *',
      [name, number, dueDate, amount, status, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
}
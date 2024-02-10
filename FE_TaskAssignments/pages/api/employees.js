// pages/api/employees.js

import db from '../../utils/db'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.query(`SELECT * FROM newhireinfo;`);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Failed to load employees from the database' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method Not Allowed');
  }
}

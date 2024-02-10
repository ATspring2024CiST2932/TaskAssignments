// pages/api/mentors.js


import pool from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query(`
        SELECT DISTINCT e.EmployeeID, e.Name
        FROM newhireinfo e
        LEFT JOIN mentorassignments mma ON e.EmployeeID = mma.MentorID
        WHERE e.Mentor = 1 OR mma.MentorID IS NOT NULL;
      `);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Failed to fetch mentors:', error);
      res.status(500).json({ error: 'Failed to load data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

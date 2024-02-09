// pages/api/tasks.js
import pool from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Adjust the query to select from the Tasks table
      // This example selects all tasks for mentees (Employees not 'Full Time')
      const [rows] = await pool.query(`
        SELECT t.TaskID, t.Description, t.DueDate, t.EmployeeID
        FROM Tasks t
        INNER JOIN Employees e ON t.EmployeeID = e.EmployeeID
        WHERE e.EmploymentType <> 'Full Time';
      `);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      res.status(500).json({ error: 'Failed to load data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

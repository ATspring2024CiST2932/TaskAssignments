// pages/api/tasks.js
import pool from '../../utils/db';

export default async function handler(req, res) {
  const { mentorId } = req.query; // Extract mentorId from query parameters

  if (req.method === 'GET' && mentorId) {
    try {
      // Adjust the query to select tasks for the mentees of the specific mentor
      const [rows] = await pool.query(`
        SELECT t.TaskID, t.TaskNumber, t.Description, t.DueDate, t.EmployeeID
        FROM Tasks t
        INNER JOIN MentorMenteeAssignments mma ON t.EmployeeID = mma.MenteeID
        INNER JOIN Employees e ON mma.MenteeID = e.EmployeeID
        WHERE mma.MentorID = ? AND e.EmploymentType <> 'Full Time';
      `, [mentorId]); // Pass mentorId as a parameter to the query to prevent SQL injection

      res.status(200).json(rows);
    } catch (error) {
      console.error('Failed to fetch tasks for mentor:', error);
      res.status(500).json({ error: 'Failed to load data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    if (!mentorId) {
      res.status(400).json({ error: 'Mentor ID is required as a query parameter.' });
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}

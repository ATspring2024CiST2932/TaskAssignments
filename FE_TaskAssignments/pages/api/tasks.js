// pages/api/tasks.js
import pool from '../../utils/db';

export default async function handler(req, res) {
  const { mentorId } = req.query; // Extract mentorId from query parameters

  if (req.method === 'GET' && mentorId) {
    try {
      // Adjust the query to select tasks for the mentor and their mentees
      const [rows] = await pool.query(`
        SELECT t.task_id, t.task_url, t.task_number, t.task_type, t.EmployeeID
        FROM peercodingtasks t
        INNER JOIN mentorassignments mma ON t.EmployeeID IN (mma.MentorID, mma.MenteeID)
        WHERE mma.MentorID = ?;
      `, [mentorId]); // Pass mentorId as a parameter to the query to prevent SQL injection

      res.status(200).json(rows);
    } catch (error) {
      console.error('Failed to fetch tasks for mentor and mentees:', error);
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
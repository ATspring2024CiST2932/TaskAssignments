// pages/api/unassignedMentees.js
import pool from '../../utils/db';


export default async function handler(req, res) {
  const { mentorId } = req.query;

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query(`
        SELECT e.EmployeeID, e.Name
        FROM newhireinfo e
        WHERE e.Mentor = 0
        AND NOT EXISTS (
            SELECT 1
            FROM mentorassignments mma
            WHERE mma.MenteeID = e.EmployeeID
        );
      `, [mentorId]);

      res.status(200).json(rows);
    } catch (error) {
      console.error('Failed to fetch unassigned mentees:', error);
      res.status(500).json({ error: 'Failed to load data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// pages/api/unassigned-mentees.js
import pool from '../../utils/db';

export default async function handler(req, res) {
  // This route does not require a mentorId since it fetches unassigned mentees
  if (req.method === 'GET') {
    try {
      // Query to select employees who are not mentors and have not been assigned a mentor
      const [rows] = await pool.query(`
        SELECT e.EmployeeID, e.Name
        FROM newhireinfo e
        WHERE e.Mentor = 0
        AND NOT EXISTS (
            SELECT 1
            FROM temp_mentorassignments mma
            WHERE mma.MenteeID = e.EmployeeID
        );
      `);

      res.status(200).json(rows);
    } catch (error) {
      console.error('Failed to fetch unassigned mentees:', error);
      res.status(500).json({ error: 'Failed to load data' });
    }
  } else {
    // Handle non-GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

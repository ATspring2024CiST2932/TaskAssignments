// pages/api/mentees.js
import pool from '../../utils/db';

export default async function handler(req, res) {
  const mentorId = req.query.mentorId; // Assuming you pass mentorId as a query parameter

  try {
    let sql, params;
    if (mentorId) {
      // Fetching mentees for a specific mentor
      sql = `
        SELECT e.EmployeeID, e.Name
        FROM Employees e
        JOIN MentorMenteeAssignments mma ON e.EmployeeID = mma.MenteeID
        WHERE mma.MentorID = ?;
      `;
      params = [mentorId];
    } else {
      // Fetching all mentees (or based on a different condition)
      sql = `
        SELECT e.EmployeeID, e.Name
        FROM Employees e
        WHERE e.EmploymentType <> 'Full Time';
      `;
      params = [];
    }

    const [rows] = await pool.query(sql, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Failed to fetch mentees:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
}

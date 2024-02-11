// FE_TaskAssignments/pages/api/assign-mentee.js
import pool from '../../utils/db'; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Handle POST request
    res.status(200).json({ message: 'Post request received' });
  } else {
    // Respond with 405 Method Not Allowed if the method is not supported
    res.setHeader('Allow', ['POST']); // Indicates the allowed HTTP method
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { mentorName, menteeName } = req.body;

  try {
    // Fetch the EmployeeID for the mentor
    const mentorQuery = `SELECT EmployeeID FROM newhireinfo WHERE Name = ?;`;
    const [mentorResult] = await pool.query(mentorQuery, [mentorName]);
    if (mentorResult.length === 0) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    const mentorID = mentorResult[0].EmployeeID;

    // Fetch the EmployeeID for the mentee
    const menteeQuery = `SELECT EmployeeID FROM newhireinfo WHERE Name = ?;`;
    const [menteeResult] = await pool.query(menteeQuery, [menteeName]);
    if (menteeResult.length === 0) {
      return res.status(404).json({ error: "Mentee not found" });
    }
    const menteeID = menteeResult[0].EmployeeID;

    // Insert or update the mentor-mentee assignment
    const assignQuery = `
      INSERT INTO temp_mentorassignments (MentorID, MenteeID)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE MentorID = VALUES(MentorID), MenteeID = VALUES(MenteeID);
    `;
    await pool.query(assignQuery, [mentorID, menteeID]);

    res.status(200).json({ success: true, message: "Mentee has been successfully assigned to the mentor." });
  } catch (error) {
    console.error('Failed to assign mentee to mentor:', error);
    res.status(500).json({ error: "Failed to process assignment" });
  }
}

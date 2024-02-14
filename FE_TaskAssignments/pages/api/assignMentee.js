// FE_TaskAssignments/pages/api/assignMentee.js
import pool from '../../utils/db'; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { mentorID, menteeID } = req.body;
  console.log(`Assigning mentee ${menteeID} to mentor ${mentorID}`); // Log the IDs

  try {
    //Insert or update the mentor-mentee assignment
    const assignQuery = `
    INSERT INTO mentorassignments (MentorID, MenteeID)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE 
      MentorID = VALUES(MentorID), 
      MenteeID = VALUES(MenteeID);
    `;
    await pool.query(assignQuery, [mentorID, menteeID]);

    res.status(200).json({ success: true, message: "Mentee has been successfully assigned to the mentor." });
  } catch (error) {
    console.error('Failed to assign mentee to mentor:', error);
    res.status(500).json({ error: "Failed to process assignment" });
  }
}
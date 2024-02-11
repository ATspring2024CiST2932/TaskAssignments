// pages/api/update-mentor-assignments.js
import pool from '../../utils/db';

export default async function handler(req, res) {
    const { mentorId, menteeId } = req.body; // Extract mentorId and menteeId from request body

    if (req.method === 'POST' && mentorId && menteeId) {
        try {
            // Query to update the temp_mentorassignments table
            await pool.query(`
                INSERT INTO temp_mentorassignments (MentorID, MenteeID)
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE
                MentorID = VALUES(MentorID), MenteeID = VALUES(MenteeID);
            `, [mentorId, menteeId]); // Pass mentorId and menteeId as parameters to the query to prevent SQL injection

            res.status(200).json({ message: 'Mentor assignment updated successfully' });
        } catch (error) {
            console.error('Failed to update mentor assignment:', error);
            res.status(500).json({ error: 'Failed to update data' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        if (!mentorId || !menteeId) {
            res.status(400).json({ error: 'Mentor ID and mentee ID are required in the request body.' });
        } else {
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}
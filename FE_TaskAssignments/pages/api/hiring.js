// pages/api/hiring.js
import db from '../../utils/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { mentorName, menteeName } = req.body;

    try {
        // Replace this with your actual database query
        await db.query('INSERT INTO mentor_mentee (mentor_name, mentee_name) VALUES (?, ?)', [mentorName, menteeName]);
        res.status(200).json({ success: true, message: "Mentee has been successfully assigned to the mentor." });
    } catch (error) {
        console.error('Failed to assign mentee to mentor:', error);
        res.status(500).json({ error: "Failed to process assignment" });
    }
}
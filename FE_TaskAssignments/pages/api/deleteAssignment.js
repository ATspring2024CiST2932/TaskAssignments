// FE_TaskAssignments/pages/api/deleteAssignment.js

import pool from '../../utils/db'; 

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { menteeID } = req.query;

    try {
        const deleteQuery = `
            DELETE FROM mentorassignments
            WHERE MenteeID = ?
        `;
        await pool.query(deleteQuery, [menteeID]);

        res.status(200).json({ success: true, message: "Assignment has been successfully deleted." });
    } catch (error) {
        console.error('Failed to delete assignment:', error);
        res.status(500).json({ error: "Failed to delete assignment" });
    }
}
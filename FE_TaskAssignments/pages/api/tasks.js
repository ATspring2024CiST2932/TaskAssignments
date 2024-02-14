// pages/api/tasks.js
import pool from '../../utils/db';

export default async function handler(req, res) {
  const { mentorId } = req.query;

  if (req.method !== 'GET' || !mentorId) {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method Not Allowed or Mentor ID is missing' });
    return;
  }

  try {
    // Query to fetch tasks for the mentor
    const mentorTasksQuery = `
      SELECT DISTINCT task_id, task_url, task_number, task_type, EmployeeID
      FROM temp_peercodingtasks
      WHERE EmployeeID = ?;
    `;
    const [mentorTasks] = await pool.query(mentorTasksQuery, [mentorId]);

    // Query to fetch mentee IDs for this mentor
    const menteeIdsQuery = `
      SELECT MenteeID
      FROM mentorassignments
      WHERE MentorID = ?;
    `;
    const [menteeIds] = await pool.query(menteeIdsQuery, [mentorId]);

    // If there are mentees, fetch their tasks
    let menteeTasks = [];
    if (menteeIds.length > 0) {
      const menteeTasksQuery = `
        SELECT DISTINCT task_id, task_url, task_number, task_type, EmployeeID
        FROM temp_peercodingtasks
        WHERE EmployeeID IN (?);
      `;
      const menteeIdsArray = menteeIds.map(mentee => mentee.MenteeID);
      const [tasks] = await pool.query(menteeTasksQuery, [menteeIdsArray]);
      menteeTasks = tasks;
    }

    // Combine mentor and mentee tasks, removing duplicates
    const combinedTasks = [...mentorTasks, ...menteeTasks].reduce((acc, current) => {
      const x = acc.find(item => item.task_id === current.task_id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    res.status(200).json(combinedTasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
};

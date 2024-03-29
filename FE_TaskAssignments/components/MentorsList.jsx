// Task_Assignments/taskassignments/components/MentorsList.jsx
import React, { useState, useEffect } from 'react';

const MentorsList = () => {
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedMentorId, setSelectedMentorId] = useState(null);

  const [isLoadingMentors, setIsLoadingMentors] = useState(false);
  const [isLoadingMentees, setIsLoadingMentees] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  const [error, setError] = useState(null);
  const [errorMentees, setErrorMentees] = useState(null);
  const [errorTasks, setErrorTasks] = useState(null);

  useEffect(() => {
    setIsLoadingMentors(true);
    fetch('/api/mentors')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(setMentors)
      .catch((error) => {
        console.error("Failed to fetch mentors:", error);
        setError(error.toString());
      })
      .finally(() => setIsLoadingMentors(false));
  }, []);

  useEffect(() => {
    if (selectedMentorId) {
      setIsLoadingMentees(true);
      fetch(`/api/mentees/${selectedMentorId}`)
        .then((res) => res.json())
        .then(setMentees)
        .catch((error) => {
          console.error("Failed to fetch mentees:", error);
          setErrorMentees(error.toString());
        })
        .finally(() => setIsLoadingMentees(false));

      setIsLoadingTasks(true);
      fetch(`/api/tasks/${selectedMentorId}`)
        .then((res) => res.json())
        .then(setTasks)
        .catch((error) => {
          console.error("Failed to fetch tasks:", error);
          setErrorTasks(error.toString());
        })
        .finally(() => setIsLoadingTasks(false));
    }
  }, [selectedMentorId]);

  const handleMentorClick = (mentorId) => {
    setSelectedMentorId(mentorId);
  };

  return (
    <div>
      <h2>Mentors</h2>
      {isLoadingMentors ? <div>Loading mentors...</div> : error ? <div>Error: {error}</div> : (
        <ul>
          {mentors.map(mentor => (
            <li key={mentor.id} onClick={() => handleMentorClick(mentor.id)} style={{ backgroundColor: selectedMentorId === mentor.id ? 'yellow' : '' }}>
              {mentor.name}
            </li>
          ))}
        </ul>
      )}

      <h2>Mentees</h2>
      {isLoadingMentees ? <div>Loading mentees...</div> : errorMentees ? <div>Error: {errorMentees}</div> : (
        <ul>
          {mentees.map(mentee => (
            <li key={mentee.id} style={{ backgroundColor: mentee.mentorId === selectedMentorId ? 'yellow' : '' }}>
              {mentee.name}
            </li>
          ))}
        </ul>
      )}

      <h2>Tasks</h2>
      {isLoadingTasks ? <div>Loading tasks...</div> : errorTasks ? <div>Error: {errorTasks}</div> : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} style={{ backgroundColor: mentees.some(mentee => mentee.id === task.menteeId && mentee.mentorId === selectedMentorId) ? 'yellow' : '' }}>
              {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentorsList;

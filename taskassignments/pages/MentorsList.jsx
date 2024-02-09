// Task_Assignments/taskassignments/pages/MentorsList.jsx
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
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data); 
        setMentors(data);
      })
      .catch((error) => {
        console.error("Failed to fetch mentors:", error);
        setError(error.toString());
      })
      .finally(() => setIsLoadingMentors(false));
  }, []);

  useEffect(() => {
    if (selectedMentorId) {
      // Fetch mentees for the selected mentor
      setIsLoadingMentees(true);
      fetch(`/api/mentees/mentor/${selectedMentorId}`) // Adjusted endpoint to reflect fetching mentees by mentor
        .then((res) => res.json())
        .then((data) => {
          setMentees(data);
          // Optionally, trigger tasks fetching here for the first mentee or a specific mentee
        })
        .catch((error) => {
          console.error("Failed to fetch mentees:", error);
          setErrorMentees(error.toString());
        })
        .finally(() => setIsLoadingMentees(false));
    }
  }, [selectedMentorId]);
  
  useEffect(() => {
    // Assuming you keep track of a selected mentee in state, fetch tasks when a mentee is selected
    const selectedMenteeId = mentees[0]?.EmployeeID; // Example: automatically select the first mentee
    if (selectedMenteeId) {
      setIsLoadingTasks(true);
      fetch(`/api/tasks/mentee/${selectedMenteeId}`) // Assumes endpoint to fetch tasks by mentee
        .then((res) => res.json())
        .then(setTasks)
        .catch((error) => {
          console.error("Failed to fetch tasks:", error);
          setErrorTasks(error.toString());
        })
        .finally(() => setIsLoadingTasks(false));
    }
  }, [mentees]); // Rerun effect when mentees list changes
  

  const handleMentorClick = (mentorId) => {
    setSelectedMentorId(mentorId);
  };

  return (
    <div>
      <h2>Mentors</h2>
      {isLoadingMentors ? <div>Loading mentors...</div> : error ? <div>Error: {error}</div> : (
        <ul>
          {mentors.map(mentor => (
            <li 
              key={mentor.EmployeeID} 
              onClick={() => handleMentorClick(mentor.EmployeeID)} 
              style={{ backgroundColor: selectedMentorId === mentor.EmployeeID ? 'yellow' : '' }}>
              {mentor.Name}
            </li>
          ))}
        </ul>
      )}

      <h2>Mentees</h2>
      {isLoadingMentees ? <div>Loading mentees...</div> : errorMentees ? <div>Error: {errorMentees}</div> : (
        <ul>
          {mentees.map(mentee => (
            <li key={mentee.id} style={{ backgroundColor: mentee.mentorId === selectedMentorId ? 'yellow' : '' }}>
              {mentee.Name}
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

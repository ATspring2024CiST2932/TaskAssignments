// Task_Assignments/taskassignments/pages/MentorsList.jsx
import React, { useState, useEffect } from 'react';

const MentorsList = () => {
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedMentorId, setSelectedMentorId] = useState(null);
  const [selectedMenteeId, setSelectedMenteeId] = useState(null);

  const [isLoadingMentors, setIsLoadingMentors] = useState(false);
  const [isLoadingMentees, setIsLoadingMentees] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  const [errorMentors, setErrorMentors] = useState(null);
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

// Fetch mentees for the selected mentor
useEffect(() => {
  if (selectedMentorId) {
    setIsLoadingMentees(true);
    fetch(`/api/mentees?mentorId=${selectedMentorId}`) // Use the mentorId as a query parameter
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch mentees');
        return res.json();
      })
      .then(data => {
        setMentees(data);
      })
      .catch(error => {
        console.error("Failed to fetch mentees:", error);
        setErrorMentees(error.toString());
      })
      .finally(() => setIsLoadingMentees(false));
  }
}, [selectedMentorId]); // Re-fetch mentees when selectedMentorId changes

useEffect(() => {
  if (selectedMentorId) {
    setIsLoadingTasks(true);
    fetch(`/api/tasks?mentorId=${selectedMentorId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
        setErrorTasks(error.toString());
      })
      .finally(() => setIsLoadingTasks(false));
  }
}, [selectedMentorId]); // Fetch tasks when a mentor is selected
 
  const handleMentorClick = (mentorId) => {
    setSelectedMentorId(mentorId);
  };
  const handleMenteeClick = menteeId => {
    setSelectedMenteeId(menteeId);
  };
  
  

  return (
    <div>
      <h2>Mentors</h2>
      {isLoadingMentors ? <div>Loading mentors...</div> : errorMentors ? <div>Error: {errorMentors}</div> : (
        <ul>
          {mentors.map(mentor => (
            <li 
              key={mentor.EmployeeID} 
              onClick={() => handleMentorClick(mentor.EmployeeID)} 
              style={{ backgroundColor: selectedMentorId === mentor.EmployeeID ? '#BDE0FE' : '' }}>
              {mentor.Name}
            </li>
          ))}
        </ul>
      )}

      <h2>Mentees</h2>
      {isLoadingMentees ? <div>Loading mentees...</div> : errorMentees ? <div>Error: {errorMentees}</div> : (
        <ul>
          {mentees.map(mentee => (
            <li key={mentee.EmployeeID}
              onClick={() => handleMenteeClick(mentee.EmployeeID)}
              style={{ backgroundColor: mentee.EmployeeID === selectedMenteeId ? '#FED8B1' : '' }}>
              {mentee.Name}
            </li>
          ))}
        </ul>
      )}


      <h2>Tasks</h2>
      {isLoadingTasks ? (
        <div>Loading tasks...</div>
      ) : errorTasks ? (
  <div>Error: {errorTasks}</div>
      ) : (
  <ul>
    {tasks.map((task) => (
      <li
        key={task.TaskID}
        style={{ backgroundColor: task.EmployeeID === selectedMenteeId ? '#FFE5B4' : '' }}
      >
        Task<strong>{task.TaskNumber}</strong>: {task.TaskType} - {task.Description}
      </li>
    ))}
  </ul>
      )}

    </div>
  );
};

export default MentorsList;

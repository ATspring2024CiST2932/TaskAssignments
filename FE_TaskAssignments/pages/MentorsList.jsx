// Task_Assignments/taskassignments/pages/MentorsList.jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MentorsList = () => {
  // State for tracking lists of mentors, mentees, and tasks
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [tasks, setTasks] = useState([]);
  // States for tracking selected mentor or mentee
  const [selectedMentorId, setSelectedMentorId] = useState(null);
  const [selectedMenteeId, setSelectedMenteeId] = useState(null); // Declaration for tracking selected mentee ID
  const [unassignedMentees, setUnassignedMentees] = useState([]);
  // States for loading and error handling
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [draggingId, setDraggingId] = useState(null);

  const [isLoadingUnassignedMentees, setIsLoadingUnassignedMentees] = useState(false);
  const [errorUnassignedMentees, setErrorUnassignedMentees] = useState(null);

  // Fetch mentors, mentees, and tasks on component mount or when selectedMentorId changes
  useEffect(() => {
    setIsLoading(true);
    const fetchMentors = fetch('/api/mentors').then(res => res.json());
    const fetchUnassignedMentees = fetch('/api/unassigned-mentees')
    .then(response => {
      if (response.headers.get("Content-Type").includes("application/json")) {
        return response.json();
      } else {
        throw new Error('Expected JSON response but got HTML');
      }
    })
    .then(data => {
      // Handle your JSON data here
    })
    .catch(error => {
      console.error("Error fetching unassigned mentees:", error);
    });
    const promises = [fetchMentors, fetchUnassignedMentees];

    if (selectedMentorId) {
      const fetchMentees = fetch(`/api/mentees?mentorId=${selectedMentorId}`).then(res => res.json());
      const fetchTasks = fetch(`/api/tasks?mentorId=${selectedMentorId}`).then(res => res.json());
      promises.push(fetchMentees, fetchTasks);
    }

    Promise.all(promises)
      .then(([mentorsData, unassignedMenteesData, menteesData, tasksData]) => {
        setMentors(mentorsData);
        setMentees(menteesData || []);
        setTasks(tasksData || []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch data:", error);
        setError(error.toString());
        setIsLoading(false);
      });
  }, [selectedMentorId]);

  useEffect(() => {
    setIsLoadingUnassignedMentees(true); // Assuming you have a state to track loading status
    fetch('/api/unassigned-mentees')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUnassignedMentees(data); // Use setUnassignedMentees here to update state
        setIsLoadingUnassignedMentees(false);
      })
      .catch(error => {
        console.error("Failed to fetch unassigned mentees:", error);
        setErrorUnassignedMentees(error.toString());
        setIsLoadingUnassignedMentees(false);
      });
  }, []); // This effect runs once on component mount
  

  const handleMentorClick = (mentorId) => {
    setSelectedMentorId(mentorId);
  };
  // Define a function to handle mentee selection
  const handleMenteeClick = (menteeId) => {
    setSelectedMenteeId(menteeId); // Update the selectedMenteeId state
  };

  // Inside your handleDragEnd function in the React component
 
  const handleDragEnd = (result) => {
    const { destination, source } = result;
  
    if (!destination) {
      console.error("No destination found.");
      return;
    }
  
    // Assuming the draggableId and droppableId now represent names directly,
    // or you have a way to map these IDs back to names.
    let isMenteeBeingAssigned = false;
  
    // Check if the drag operation indicates a mentee assignment to a mentor
    if (source.droppableId === "unassignedMenteesList" && destination.droppableId === "mentorsList") {
      isMenteeBeingAssigned = true;
  }
  
  if (isMenteeBeingAssigned) {
    // The draggableId from the source should represent the mentee's name
    // The droppableId from the destination should represent the mentor's section,
    // but you'll need the mentor's name, which should be determined differently,
    // possibly from the destination context or stored state.
    const menteeName = source.draggableId;
    // Example to obtain the mentor's name. Adjust according to how you can obtain this name in your application.
    const mentorName = destination.droppableId; // This is a placeholder. You may need a different approach.

      // Proceed to use menteeId and mentorId for backend update
      fetch('/api/assign-mentee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ menteeName, mentorName }),
      })
      .then(response => response.json())
      .then(data => console.log('Assignment successful', data))
      .catch(error => console.error('Error:', error));
    }
  };
  
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2>Mentors</h2>
      <Droppable droppableId="mentors">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {mentors.map((mentor, index) => (
              <Draggable
                key={mentor.EmployeeID}
                draggableId={mentor.EmployeeID.toString()}
                index={index}
                onDragStart={() => setDraggingId(mentor.EmployeeID)}
                onDragEnd={() => setDraggingId(null)}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => handleMentorClick(mentor.EmployeeID)}
                    style={{
                      backgroundColor: selectedMentorId === mentor.EmployeeID ? '#BDE0FE' : '',
                      color: draggingId === mentor.EmployeeID ? 'red' : 'black',
                    }}
                  >
                    {mentor.Name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Unassigned Mentees List - Draggable to be dropped on a mentor 
      <Droppable droppableId="unassignedMentees">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <h2>Unassigned Mentees</h2>
            <ul>
              {unassignedMentees.map((mentee, index) => (
                <Draggable key={mentee.EmployeeID} draggableId={`unassigned-${mentee.EmployeeID}`} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {mentee.Name}
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
       */}             
      {/* Render Mentees list */}
      <div>
        <h2>Mentees</h2>
        <ul>
          {mentees.map((mentee, index) => (
            <li key={mentee.EmployeeID}
              onClick={() => handleMenteeClick(mentee.EmployeeID)}
              style={{ backgroundColor: mentee.EmployeeID === selectedMenteeId ? '#FED8B1' : '' }}>
              {mentee.Name}
            </li>
          ))}
        </ul>
      </div>

      {/* Render Tasks list */}
      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={task.task_id} 
              style={{ 
                backgroundColor: task.EmployeeID === selectedMentorId ? '#BDE0FE' : task.EmployeeID === selectedMenteeId ? '#FED8B1' : '' 
              }}>
              Task<strong>{task.task_number}</strong>: {task.task_type} - {task.task_url}
            </li>
          ))}
        </ul>
      </div>
    </DragDropContext>
  );
};

export default MentorsList;

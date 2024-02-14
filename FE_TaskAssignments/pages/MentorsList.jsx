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
  const [unassignedMentees, setUnassignedMentees] = useState([null]);
  // States for loading and error handling
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [draggingId, setDraggingId] = useState(null);

  const [isLoadingUnassignedMentees, setIsLoadingUnassignedMentees] = useState(false);
  const [errorUnassignedMentees, setErrorUnassignedMentees] = useState(null);

  // Fetch mentors, mentees, and tasks on component mount or when selectedMentorId changes
  useEffect(() => {
    setIsLoading(true);
    const fetchMentors = fetch('/api/mentors').then(res => res.json()).then(data => { console.log('Mentors:', data); return data; });
    const fetchUnassignedMentees = fetch('/api/unassignedMentees')
      .then(response => {
        if (response.headers.get("Content-Type").includes("application/json")) {
          return response.json();
        } else {
          throw new Error('Expected JSON response but got HTML');
        }
      })
      .then(data => {
        console.log('Unassigned mentees:', data); // Log the response
        setUnassignedMentees(data);
        return data;
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
    .then((data) => {
      setMentors(data[0]);
      setUnassignedMentees(data[1]);
      if (selectedMentorId) {
        setMentees(data[2] || []);
        setTasks(data[3] || []);
      }
      setIsLoading(false);
    })
    .catch(error => {
      console.error("Failed to fetch data:", error);
      setError(error.toString());
      setIsLoading(false);
    });
  }, [selectedMentorId]);

  // useEffect(() => {
  //   setIsLoadingUnassignedMentees(true);
  //   fetch('/api/unassignedMentees')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setUnassignedMentees(data);
  //       setIsLoadingUnassignedMentees(false);
  //     })
  //     .catch(error => {
  //       console.error("Failed to fetch unassigned mentees:", error);
  //       setErrorUnassignedMentees(error.toString());
  //       setIsLoadingUnassignedMentees(false);
  //     });
  // }, []); // This effect runs once on component mount
  

  const handleMentorClick = (mentorId) => {
    setSelectedMentorId(mentorId);
  };
  // Define a function to handle mentee selection
  const handleMenteeClick = (menteeId) => {
    setSelectedMenteeId(menteeId); // Update the selectedMenteeId state
  };

  // Inside your handleDragEnd function in the React component
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId.startsWith('mentor-')) {
      const mentorID = destination.droppableId.split('-')[1];
      const menteeID = draggableId.split('-')[1];

      console.log(`Drag ended. Assigning mentee ${menteeID} to mentor ${mentorID}`); // Log the IDs

      const response = await fetch('/api/assignMentee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mentorID, menteeID }),
      });

      if (!response.ok) {
        console.error('Failed to assign mentee to mentor:', await response.text());
      } else {
        // Fetch unassigned mentees again after successful assignment
        fetch('/api/unassignedMentees')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setUnassignedMentees(data);
          })
          .catch(error => {
            console.error("Failed to fetch unassigned mentees:", error);
          });
      }
    }
  };
  // Define a function to handle right-click on a mentee
  // const handleContextMenu = (event, menteeID) => {
  //   event.preventDefault();

  // // Define a function to Delete the Mentor-Mentee Assignment
  //   const deleteAssignment = async (menteeID) => {
  //   const response = await fetch(`/api/deleteAssignment?menteeId=${menteeID}`, {
  //     method: 'DELETE',
  //   });

  //   if (!response.ok) {
  //     console.error('Failed to delete assignment:', await response.text());
  //   } else {
  //     // Refresh the mentees list after the assignment is deleted
  //     fetchMentees();
  //   }
  // };

  //   // Open your custom context menu here
  //   // You'll need to store the menteeID in state so you can use it in the delete function
  // };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}></div>
      <div>
      <h2>Mentors</h2>
          {mentors.map((mentor, index) => (
        <Droppable key={mentor.EmployeeID} droppableId={`mentor-${mentor.EmployeeID}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'white',
                // Add other styles as needed
              }}
            >
              <Draggable
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
      </div>
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
      
      {/* Unassigned Mentees List - Draggable to be dropped on a mentor */} 
      <div>
        <ul>
      <Droppable droppableId="unassignedMentees">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <h2>Unassigned Mentees</h2>
            <ul>
            {Array.isArray(unassignedMentees) && unassignedMentees.map((mentee, index) => (
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
        </ul> 
      </div>       


      
    </DragDropContext>
  );
}


export default MentorsList;
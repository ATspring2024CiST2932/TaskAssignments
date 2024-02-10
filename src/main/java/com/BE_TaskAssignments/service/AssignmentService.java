// In src/main/java/com/TaskAssignments/service/AssignmentService.java
package com.TaskAssignments.service;

import com.TaskAssignments.model.Employee;
import com.TaskAssignments.model.Task;
import com.TaskAssignments.repository.EmployeeRepository;
import com.TaskAssignments.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {
    
    private final EmployeeRepository employeeRepository;

    @Autowired
    public AssignmentService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllMentors() {
        // Assuming "FULL_TIME" represents mentors
        return employeeRepository.findByEmploymentType(Employee.EmploymentType.FULL_TIME);
    }

    public List<Employee> getMenteesByMentor(Long mentorId) {
        return employeeRepository.findByMentorId(mentorId);
    }
    
    @Autowired
    private TaskRepository taskRepository; // Autowire the TaskRepository

    public List<Task> getTasksByEmployee(Long employeeId) {
        return taskRepository.findByEmployeeEmployeeId(employeeId);
    }

    
    // Add additional methods as needed...
}

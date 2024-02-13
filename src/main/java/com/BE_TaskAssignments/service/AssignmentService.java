// In src/main/java/com/TaskAssignments/service/AssignmentService.java
package com.BE_TaskAssignments.service;

import com.BE_TaskAssignments.model.Employee;
import com.BE_TaskAssignments.model.Task;
import com.BE_TaskAssignments.repository.EmployeeRepository;
import com.BE_TaskAssignments.repository.TaskRepository;
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

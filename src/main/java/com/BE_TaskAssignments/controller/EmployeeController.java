// Task_Assignments/src/main/java/com/TaskAssignments/controller/EmployeeController.java
package com.TaskAssignments.controller;

import com.TaskAssignments.model.Employee;
import com.TaskAssignments.service.AssignmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final AssignmentService assignmentService;

    @Autowired
    public EmployeeController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    // Endpoint to get all mentors
    @GetMapping("/mentors")
    public ResponseEntity<List<Employee>> getAllMentors() {
        List<Employee> mentors = assignmentService.getAllMentors();
        return ResponseEntity.ok(mentors);
    }

    // Endpoint to get mentees for a mentor
    @GetMapping("/{mentorId}/mentees")
    public ResponseEntity<List<Employee>> getMenteesForMentor(@PathVariable Long mentorId) {
        List<Employee> mentees = assignmentService.getMenteesByMentor(mentorId);
        return ResponseEntity.ok(mentees);
    }

    // Additional endpoints as needed...
}

// Task_Assignments/src/main/java/com/TaskAssignments/controller/TaskController.java
package com.BE_TaskAssignments.controller;

import com.BE_TaskAssignments.model.Task;
import com.BE_TaskAssignments.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

        // Generalized endpoint to get tasks for any employee (mentor or mentee)
        @GetMapping("/employee/{employeeId}")
        public ResponseEntity<List<Task>> getTasksForEmployee(@PathVariable Long employeeId) {
            List<Task> tasks = taskRepository.findByEmployeeEmployeeId(employeeId);
            return ResponseEntity.ok(tasks);
        }
    
        // Add other endpoints as needed
    }
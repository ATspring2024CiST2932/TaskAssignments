// Task_Assignments/src/main/java/com/TaskAssignments/controller/TaskController.java
package com.TaskAssignments.controller;

import com.TaskAssignments.model.Task;
import com.TaskAssignments.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // Endpoint to get tasks for a mentee
    @GetMapping("/mentee/{menteeId}")
    public ResponseEntity<List<Task>> getTasksForMentee(@PathVariable Long menteeId) {
        List<Task> tasks = taskRepository.findByEmployeeEmployeeId(menteeId);
        return ResponseEntity.ok(tasks);
    }

    // Add other endpoints as needed...
}

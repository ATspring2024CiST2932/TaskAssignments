// Task_Assignments/src/main/java/com/TaskAssignments/repository/TaskRepository.java
package com.BE_TaskAssignments.repository;

import com.BE_TaskAssignments.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Find tasks by the ID of the associated employee
    List<Task> findByEmployeeEmployeeId(Long employeeId);
}

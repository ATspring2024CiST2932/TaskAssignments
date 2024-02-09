// Task_Assignments/src/main/java/com/TaskAssignments/repository/EmployeeRepository.java
package com.TaskAssignments.repository;

import com.TaskAssignments.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List; // Import statement for List

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByEmploymentType(Employee.EmploymentType employmentType);
    List<Employee> findByMentorId(Long mentorId);

}

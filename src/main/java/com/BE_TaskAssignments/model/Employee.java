// Task_Assignments/src/main/java/com/TaskAssignments/model/Employee.java
// Employee.java
package com.TaskAssignments.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "newhireinfo")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    private String name;

    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    public enum EmploymentType {
        FULL_TIME, CONTRACTOR, APPRENTICE, INTERN;

        // You can add methods if necessary, like toString(), etc.
    }

   // Standard getters and setters for all fields

   public Long getEmployeeId() {
    return employeeId;
}

public void setEmployeeId(Long employeeId) {
    this.employeeId = employeeId;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public EmploymentType getEmploymentType() {
    return employmentType;
}

public void setEmploymentType(EmploymentType employmentType) {
    this.employmentType = employmentType;
}

public List<Task> getTasks() {
    return tasks;
}

public void setTasks(List<Task> tasks) {
    this.tasks = tasks;
}
}
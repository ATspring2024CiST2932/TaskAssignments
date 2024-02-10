//  Task_Assignments/src/main/java/com/TaskAssignments/model/Task.java
package com.TaskAssignments.model;

import java.util.Date;
import com.TaskAssignments.model.Task;
import javax.persistence.*;


@Entity
@Table(name = "peercodingtasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EmployeeID")
    private Employee employee;

    private String taskNumber;
    private String taskURL;
    private String description;
    private Date dueDate;

    @Enumerated(EnumType.STRING)
    private TaskType taskType;

    // Getters and setters...

    public enum TaskType {
        UI, CYPRESS, JUNIT, SERVICE;
        // You can add methods if necessary, like toString(), etc.
    }

    // Getters and setters...

    // Example of a getter for the taskType field
    public TaskType getTaskType() {
        return taskType;
    }

    // Example of a setter for the taskType field
    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public String getTaskNumber() {
        return taskNumber;
    }
    
    public void setTaskNumber(String taskNumber) {
        this.taskNumber = taskNumber;
    }
    
    public String getTaskURL() {
        return taskURL;
    }
    
    public void setTaskURLn(String taskURL) {
        this.taskURL = taskURL;
    }

    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDueDate() {
        return dueDate;
    }
    
    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
    

    // Ensure you have getters and setters for the `employee` relationship as well
}      

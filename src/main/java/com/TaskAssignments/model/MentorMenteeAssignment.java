// In src/main/java/com/TaskAssignments/model/Models.java
package com.TaskAssignments.model;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import javax.persistence.*;

// Mentor Entity
@Entity
@Table(name = "mentors")
class Mentor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Getters and setters for Mentor
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

// Mentee Entity
@Entity
@Table(name = "mentees")
class Mentee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "mentor_id")
    private Long mentorId;

    // Getters and setters for Mentee
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Long getMentorId() { return mentorId; }
    public void setMentorId(Long mentorId) { this.mentorId = mentorId; }
}

// Task Entity
@Entity
@Table(name = "tasks")
class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Column(name = "mentee_id")
    private Long menteeId;

    // Getters and setters for Task
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Long getMenteeId() { return menteeId; }
    public void setMenteeId(Long menteeId) { this.menteeId = menteeId; }
}

// Mentor Repository
@Repository
interface MentorRepository extends JpaRepository<Mentor, Long> {}

// Mentee Repository
@Repository
interface MenteeRepository extends JpaRepository<Mentee, Long> {
    List<Mentee> findByMentorId(Long mentorId);
}

// Task Repository
@Repository
interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByMenteeId(Long menteeId);
}

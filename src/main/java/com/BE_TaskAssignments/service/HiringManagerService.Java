import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class HiringManagerService {

    // Method to add a new hire to the system
    public void addNewHire(String name, String employmentType, String mentorName, Connection connection) throws SQLException {
        // SQL query to insert a new hire into the newhireinfo table
        String insertQuery = "INSERT INTO newhireinfo (name, employment_type, mentor_name) VALUES (?, ?, ?)";

        try {
            // Create a prepared statement with the insert query
            PreparedStatement preparedStatement = connection.prepareStatement(insertQuery);

            // Set the parameters for the prepared statement
            preparedStatement.setString(1, name);
            preparedStatement.setString(2, employmentType);
            preparedStatement.setString(3, mentorName);

            // Execute the query to insert the new hire into the database
            int rowsAffected = preparedStatement.executeUpdate();

            // Check if the insertion was successful
            if (rowsAffected > 0) {
                System.out.println("New hire added successfully.");
            } else {
                System.out.println("Failed to add new hire.");
            }
        } catch (SQLException e) {
            // Handle any SQL exceptions
            e.printStackTrace();
        }
    }
}
public static void main(String[] args) {

    Connection connection = null;

    try {
        // Replace "url", "username", and "password" with your actual database connection details
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/database", "username", "password");
    } catch (SQLException e) {
        e.printStackTrace();
    }
}
// Create an instance of HiringManagerService
HiringManagerService hiringManagerService = new HiringManagerService();

// Example usage: adding a new hire
hiringManagerService.addNewHire("John Doe", "Intern", "Mentor Name", connection);
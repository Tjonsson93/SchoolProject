
package com.company;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.sql.*;
import java.time.Instant;
import java.util.List;

public class Database {

    private Connection conn;

    public Database() {

        try {
            conn = DriverManager.getConnection("jdbc:sqlite:NoteApp.db");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void createNote(Notes note) {

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO notes (title, text, timestamp) VALUES (?, ?, ?)");
            stmt.setString(1, note.getTitle());
            stmt.setString(2, note.getText());
            stmt.setLong(3, Instant.now().toEpochMilli());
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

    }

    public void createFile(Files file) {
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO files (myFile, notesId) VALUES (?, ?)");
            stmt.setString(1, file.getMyFile());
            stmt.setInt(2, Integer.parseInt(getCrossId()));
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public String getCrossId() {
        String crossId = null;
        try {
            PreparedStatement statement = conn.prepareStatement("SELECT id FROM notes");
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                crossId = String.valueOf(resultSet.getInt("id"));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return crossId;
    }


    public String uploadFile(FileItem file) {
        String myFile = "/uploads/" + file.getName();

        try (var os = new FileOutputStream(Paths.get("src/Frontend/uploads" + myFile).toString())) {
            os.write(file.get());
        } catch (Exception e) {
            e.printStackTrace();

            return null;
        }
        return myFile;
    }

    public void updateNote(Notes note) {
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE notes SET text = ? WHERE id = ?");
            stmt.setString(1, note.getText());
            stmt.setInt(2, note.getId());
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public List<Notes> getNotes() {
        List<Notes> notes = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM notes");
            ResultSet rs = stmt.executeQuery();
            Notes[] notesFromRs = (Notes[]) Utils.readResultSetToObject(rs, Notes[].class);
            notes = List.of(notesFromRs);
        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }

        return notes;
    }

    public List<Files> getFiles() {
        List<Files> arrayOfFiles = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM files");
            ResultSet rs = stmt.executeQuery();
            Files[] filesFromRs = (Files[]) Utils.readResultSetToObject(rs, Files[].class);
            arrayOfFiles = List.of(filesFromRs);

        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }
        return arrayOfFiles;
    }


    public void deleteNotes(Notes note) {

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM notes WHERE id = ?");
            stmt.setInt(1, note.getId());
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void deleteFiles(Notes note) {
        try {
            PreparedStatement statement = conn.prepareStatement("DELETE FROM files WHERE notesID = ?");
            statement.setInt(1, note.getId());
            statement.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void deleteFileDB(Files file) {
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM files WHERE id=?");
            stmt.setInt(1, file.getId());
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
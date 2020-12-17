package com.company;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.sql.*;
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

    public String uploadFile(FileItem file) {
        String myFile = "/uploads/" + file.getName();

        try (var os = new FileOutputStream(Paths.get("src/Frontend" + myFile).toString())) {
            os.write(file.get());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return myFile;
    }

    public void updateNote(Notes note) {

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO notes (title, text, timestamp, fileUrl) VALUES (?, ?, ?, ?)");
            PreparedStatement stmt = conn.prepareStatement("UPDATE notes SET title = ?, text = ?, timestamp = ?, myFile = ? WHERE id = ?");
            stmt.setString(1, note.getTitle());
            stmt.setString(2, note.getText());
            stmt.setLong(3, note.getTimestamp());
            stmt.setString(4, note.getFileUrl());
            stmt.setString(4, note.getMyFile());


            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public String uploadFile(FileItem file) {
        String fileUrl = "/files/" + file.getName();

        try (var os = new FileOutputStream(Paths.get("src/Frontend" + fileUrl).toString())) {
            os.write(file.get());
        } catch (IOException throwables) {
            throwables.printStackTrace();
            return null;
        }

        return fileUrl;
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

    public Notes getNoteById(int id) {
        Notes note = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM notes WHERE id = ?");
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();

            Notes[] notesFromRs = (Notes[]) Utils.readResultSetToObject(rs, Notes[].class);

            note = notesFromRs[0];

        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }

        return note;
    }

    public void updateNote(Notes note) {

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT title FROM notes WHERE id = ?");
            stmt.setInt(1, id);
            stmt.setString(2, title);

            ResultSet rs = stmt.executeQuery();

            Notes[] notesFromRs = (Notes[]) Utils.readResultSetToObject(rs, Notes[].class);

            note = notesFromRs[0];

        } catch (Exception e) {
            e.printStackTrace();
        }

        return note;
    }

    public void createNote(Notes note) {

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO notes (title, text, timestamp, myFile) VALUES (?, ?, ?, ?)");
            PreparedStatement stmt = conn.prepareStatement("UPDATE notes SET title = ?, text = ?, timestamp = ?, fileUrl = ? WHERE id = ?");
            stmt.setString(1, note.getTitle());
            stmt.setString(2, note.getText());
            stmt.setLong(3, Instant.now().toEpochMilli());
            stmt.setString(4, note.getMyFile());
            stmt.setLong(3, note.getTimestamp());
            stmt.setString(4, note.getFileUrl());


            stmt.executeUpdate();
        } catch (SQLException throwables) {
        throwables.printStackTrace();
    }

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
}
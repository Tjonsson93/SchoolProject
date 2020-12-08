package com.company;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;

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

    public List<Notes> getNotes() {
        List<Notes> notes = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM notes");
            ResultSet rs = stmt.executeQuery();

            Notes[] notesFromRs = (Notes[]) Utils.readResultSetToObject(rs, Notes[].class);
            notes = List.of(notesFromRs);

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
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

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return note;
    }

    public void createNote(Notes note) {

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO notes (title, text, timestamp, imageUrl, fileUrl) VALUES (?, ?, ?, ?, ?)");
            stmt.setString(1, note.getTitle());
            stmt.setString(2, note.getText());
            stmt.setInt(3, note.getTimestamp());
            stmt.setString(4, note.getImageUrl());
            stmt.setString(5, note.getFileUrl());

            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void deleteNotes(Notes note) {

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM notes WHERE i = ?");
            stmt.setInt(1, note.getId());

            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }

}

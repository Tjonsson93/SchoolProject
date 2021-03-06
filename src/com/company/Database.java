
package com.company;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.FileOutputStream;
import java.io.IOException;
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

    public String getMaxId(){
        String max_id = null;
        try {
            PreparedStatement statement = conn.prepareStatement("SELECT MAX(id) FROM notes");
            ResultSet resultSet = statement.executeQuery();



            while (resultSet.next()){
                max_id = String.valueOf(resultSet.getInt("MAX(id)"));
                System.out.println("i am max " + max_id);

            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return max_id;
    }

    public void createFile(Files file) {
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO files (myFile, notesId) VALUES (?, ?)");
            stmt.setString(1, file.getMyFile());
            stmt.setInt(2,Integer.parseInt(getMaxId()));

            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void deleteFiles(Files files) {

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM files WHERE notesId = ?");
            stmt.setInt(1, files.getNotesId());

            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

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

    public List<Files> getFiles(){
        List<Files> arrayOfFiles = null;

        try{
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM files");
            ResultSet rs = stmt.executeQuery();

            Files [] filesFromRs = (Files[]) Utils.readResultSetToObject(rs, Files[].class);
            arrayOfFiles = List.of(filesFromRs);

        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }
        return arrayOfFiles;
    }
    public List<Files> getFilesByNotesId(int notesId) {
        List<Files> filesById = null;

        try{
            PreparedStatement stmt = conn.prepareStatement("SELECT files.myFile FROM notes, files WHERE files.notesId = ?");
            stmt.setInt(1, notesId);
            ResultSet rs = stmt.executeQuery();

            Files[] filesFromRs = (Files[]) Utils.readResultSetToObject(rs, Files[].class);
            filesById = List.of(filesFromRs);
        }catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }

        return filesById;
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


    public void deleteNotes(Notes note) {

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM notes WHERE id = ?");
            stmt.setInt(1, note.getId());

            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

 /*OutputStream out = new BufferedOutputStream(.getOutputStream());
        out.write(.getBytes());
        out.close() ; */

}

package com.company;

import express.Express;
import express.middleware.Middleware;
import org.apache.commons.fileupload.FileItem;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {

    public static void main(String[] args) {
    Express app = new Express();
    Database db = new Database();

        app.post("/rest/notes", (req, res) -> {
            Notes note = (Notes) req.getBody(Notes.class);
            System.out.println(note.toString());
            db.createNote(note);
        });

        app.post("/rest/files", (req, res) -> {
            Files file = (Files) req.getBody(Files.class);
            System.out.println(file.toString());
            db.createFile(file);
        });

        app.post("/api/file-upload", (req, res) -> {
            String myFile = null;
            try {
                List<FileItem> files = req.getFormData("files");
                for(int i = 0; i < files.size(); i++) {
                    myFile = db.uploadFile(files.get(i));
                    System.out.println("File: " + i + myFile);

                    res.send(myFile);
                }
            } catch (Exception e) {
                e.printStackTrace();
                res.send(myFile);
            }
        });

        app.get("/rest/notes", (req, res) -> {
            List<Notes> notes = db.getNotes();
            res.json(notes);
        });

        app.get("/rest/files",(request, response) -> {
            List<Files> arrayOfFiles = db.getFiles();
            response.json(arrayOfFiles);
        });


        app.put("/rest/notes/:id", (req, res) -> {
            Notes note = (Notes) req.getBody(Notes.class);
            db.updateNote(note);
            res.send("Note updated");

        });


        app.delete("/rest/notes/:id", (req, res) -> {
            Notes note = (Notes) req.getBody(Notes.class);
            System.out.println("Delete Notes: " + note.toString());
            db.deleteNotes(note);
            db.deleteFiles(note);
            res.send("Deleted");
        });


        app.delete("/rest/files/:id", (req, res) -> {
            Files file = (Files) req.getBody(Files.class);
            System.out.println("Delete File" + file.toString());
            db.deleteFileDB(file);

            res.send("Deleted");
        });

        try {
            app.use(Middleware.statics(Paths.get("src/Frontend").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(5000);
        System.out.println("server started at port 5000");

    }
}
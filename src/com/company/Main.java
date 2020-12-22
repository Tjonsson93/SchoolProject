package com.company;

import express.Express;
import express.middleware.Middleware;
import org.apache.commons.fileupload.FileItem;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.OutputStream;
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

        app.post("/rest/files", (request, response) -> {
            Files file = (Files) request.getBody(Files.class);

            System.out.println(file.toString());

            db.createFile(file);
        });
        app.post("/api/file-upload", (req, res) -> {
            String myFile = null;

            try {
                List<FileItem> files = req.getFormData("files");
                if(files != null) {
                    myFile = db.uploadFile(files.get(0));
                } else {
                    myFile = null;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            res.json(myFile);
        });

        app.get("/rest/notes", (req, res) -> {
            List<Notes> notes = db.getNotes();
            res.json(notes);
        });

        app.get("/rest/files",(request, response) -> {
            List<Files> arrayOfFiles = db.getFiles();
            response.json(arrayOfFiles);
        });

        app.get("/rest/notes/:id", (req, res) -> {
            int id = Integer.parseInt(req.getParam("id"));

            Notes notes = db.getNoteById(id);
            res.json(notes);
        });

        app.get("/rest/files/:notesId", (request, response) -> {
            int notesId = Integer.parseInt(request.getParam("notesId"));

            List<Files> filesById = db.getFilesByNotesId(notesId);
            response.json(filesById);
        });

        app.put("/rest/notes/:id", (req, res) -> {
            Notes notes = (Notes) req.getBody(Notes.class);
            db.updateNote(notes);
            res.send("Note updated");

        });


        app.delete("/rest/notes/:id", (req, res) -> {
            Notes notes = (Notes) req.getBody(Notes.class);
            System.out.println("Delete Notes: " + notes.toString());
            db.deleteNotes(notes);
        });

        app.delete("/rest/files/:id", (req, res) -> {
            Files files = (Files) req.getBody(Files.class);
            System.out.println("Delete files: " + files.toString());
            db.deleteFiles(files);
        });

        try {
            app.use(Middleware.statics(Paths.get("src/Frontend").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(5500);
        System.out.println("server started at port 5500");

    }
}
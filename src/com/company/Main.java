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
            Notes notes = (Notes) req.getBody(Notes.class);

            System.out.println(notes.toString());

            db.createNote(notes);
        });

        app.post("/rest/files", (req, res) -> {
            Files files = (Files) req.getBody(Files.class);
            res.send("File uploaded");
            db.createFile(files);
        });

        app.post("/api/file-upload", (req, res) -> {
            String myFile = null;

            try {
                List<FileItem> files = req.getFormData("files");
                myFile = db.uploadFile(files.get(0));
            } catch (Exception e) {
                e.printStackTrace();
            }

            res.send(myFile);
        });

        app.get("/rest/notes", (req, res) -> {
            List<Notes> notes = db.getNotes();
            res.json(notes);
        });

        app.get("/rest/files", (req, res) -> {
            List<Files> files = db.getFiles();
            res.json(files);
        });

        app.get("/rest/notes/:id", (req, res) -> {
            int id = Integer.parseInt(req.getParam("id"));

            Notes notes = db.getNoteById(id);
            res.json(notes);
        });

        app.put("/rest/notes/:id", (req, res) -> {
            Notes notes = (Notes) req.getBody(Notes.class);
            db.updateNote(notes);
            res.send("Note updated");
        });

        app.delete("/rest/notes/:id", (req, res) -> {
            Notes notes = (Notes) req.getBody(Notes.class);
            System.out.println(notes);
            db.deleteNotes(notes);
        });

        app.delete("rest/files/:id", (req, res) -> {
            Files files = (Files) req.getBody(Files.class);
            System.out.println(files);
            db.deleteFiles(files);
        });

        try {
            app.use(Middleware.statics(Paths.get("src/Frontend").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(5501);
        System.out.println("server started at port 5501");
    }
}

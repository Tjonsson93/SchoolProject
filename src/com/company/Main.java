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

        app.post("/api/file-upload", (req, res) -> {
            String imageUrl = null;

            try {
                List<FileItem> files = req.getFormData("files");
                imageUrl = db.uploadImage(files.get(0));
            } catch (Exception e) {
                e.printStackTrace();
            }

            res.send(imageUrl);
        });

        app.get("/rest/notes", (req, res) -> {
            List<Notes> notes = db.getNotes();
            res.json(notes);
        });

        app.get("/rest/notes/:id", (req, res) -> {
            int id = Integer.parseInt(req.getParam("id"));

            Notes notes = db.getNoteById(id);
            res.json(notes);
        });

        app.post("/rest/notes", (req, res) -> {
           Notes notes = (Notes) req.getBody(Notes.class);

            System.out.println(notes.toString());

            db.createNote(notes);
        });

        app.delete("/rest/notes:id", (req, res) -> {
            Notes notes = (Notes) req.getBody(Notes.class);

            db.deleteNotes(notes);
        });

        app.put("/rest/notes:id", (req, res) -> {
            Notes notes = (Notes) req.getBody(Notes.class);
            db.updateNote(notes);
            res.send("Note updated");
        });

        try {
            app.use(Middleware.statics(Paths.get("src/frontend").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(5500);
        System.out.println("server started at port 3000");
    }
}

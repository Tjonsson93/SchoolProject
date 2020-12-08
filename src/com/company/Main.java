package com.company;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        Express app = new Express();
        Database db = new Database();

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

            res.send("post ok");
        });

        app.delete("/rest/notes/:id", (req, res) -> {
            Notes note = (Notes) req.getBody(Notes.class);
            db.deleteNotes(note);
        });
        
        try {
            app.use(Middleware.statics(Paths.get("src/frontend").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(3000);
        System.out.println("server started at port 3000");
    }
}

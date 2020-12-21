package com.company;

public class Files {

    private int id;
    private String myFile;
    private int notes_id;



    public Files() {
    }

    public Files(String myFile) {
        this.myFile = myFile;
    }

    public Files(String myFile, int notes_id) {
        this.myFile = myFile;
        this.notes_id = notes_id;
    }

    public Files(int id, String myFile, int notes_id) {
        this.id = id;
        this.myFile = myFile;
        this.notes_id = notes_id;
    }

    public int getId() {
        return id;
    }

    public int getNotes_id() {
        return notes_id;
    }

    public void setNotes_id(int notes_id) {
        this.notes_id = notes_id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMyFile() {
        return myFile;
    }

    public void setMyFile(String myFile) {
        this.myFile = myFile;
    }

    @Override
    public String toString() {
        return "Files{" +
                "id=" + id +
                ", myFile='" + myFile + '\'' +
                ", notes_id=" + notes_id +
                '}';
    }
}

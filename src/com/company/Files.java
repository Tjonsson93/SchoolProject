package com.company;

public class Files {

    private int id;
    private String myFile;
    private int notesId;

    public Files() {}

    public Files(String myFile, int notesId) {
        this.myFile = myFile;
        this.notesId = notesId;
    }

    public Files(int id, String myFile, int notesId) {
        this.id = id;
        this.myFile = myFile;
        this.notesId = notesId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getMyFile(){
        return myFile;
    }

    public void setMyFile(String myFile){
        this.myFile = myFile;
    }

    public int getNotesId(){
        return notesId;
    }

    public void setNotesId(int notesId){
        this.notesId = notesId;
    }

    @Override
    public String toString() {
        return "Files{" +
                "id=" + id +
                ", myFile='" + myFile + '\'' +
                ",notesId=" + notesId + '}';

    }

}


package com.company;

public class Notes {

    private int id;
    private String title;
    private String text;
    private int timestamp;
    private String imageUrl;
    private String fileUrl;

    public Notes() { }

    public Notes(String title, String text, int timestamp) {
        this.title = title;
        this.text = text;
        this.timestamp = timestamp;
    }

    public Notes(String title, String text, int timestamp, String imageUrl, String fileUrl) {
        this.title = title;
        this.text = text;
        this.timestamp = timestamp;
        this.imageUrl = imageUrl;
        this.fileUrl = fileUrl;
    }

    public Notes(int id, String title, String text, int timestamp, String imageUrl, String fileUrl) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.timestamp = timestamp;
        this.imageUrl = imageUrl;
        this.fileUrl = fileUrl;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(int timestamp) {
        this.timestamp = timestamp;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    @Override
    public String toString() {
        return "Notes{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", timestamp=" + timestamp +
                ", imageUrl='" + imageUrl + '\'' +
                ", fileUrl='" + fileUrl + '\'' +
                '}';
    }
}

package com.company;

public class Notes {

    private int id;
    private String title;
    private String text;
    private long timestamp;
    private String imageUrl;


    public Notes() { }

    public Notes(String title, String text, long timestamp) {
        this.title = title;
        this.text = text;
        this.timestamp = timestamp;
    }

    public Notes(String title, String text, long timestamp, String imageUrl) {
        this.title = title;
        this.text = text;
        this.timestamp = timestamp;
        this.imageUrl = imageUrl;

    }

    public Notes(int id, String title, String text, long timestamp, String imageUrl) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.timestamp = timestamp;
        this.imageUrl = imageUrl;
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

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    @Override
    public String toString() {
        return "Notes{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", timestamp=" + timestamp +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }


}



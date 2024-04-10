package com.example.bazaradmin;


public class Quote {

    int id;
    String author;
    String series;
    String quote;

    public Quote(int id, String author, String series, String quote) {
        this.id = id;
        this.author = author;
        this.series = series;
        this.quote = quote;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }
}

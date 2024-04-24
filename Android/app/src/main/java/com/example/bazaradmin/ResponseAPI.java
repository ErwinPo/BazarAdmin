package com.example.bazaradmin;

public class ResponseAPI {
    String message;

    public ResponseAPI(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

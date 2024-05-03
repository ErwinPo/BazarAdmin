package com.example.bazaradmin;

public class RankedUser {

    int user;
    String username;
    float amount;

    public RankedUser(int user, String username, float amount) {
        this.user = user;
        this.username = username;
        this.amount = amount;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }
}

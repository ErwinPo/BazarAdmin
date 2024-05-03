package com.example.bazaradmin;


import java.sql.Timestamp;

public class GetVenta {

    int amount;
    int quantity;
    int user_id;
    Timestamp date;
    int id;

    public GetVenta(int amount, int quantity, int user_id, Timestamp date, int id) {
        this.amount = amount;
        this.quantity = quantity;
        this.user_id = user_id;
        this.date = date;
        this.id = id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public int get_id() {
        return id;
    }

    public void set_id(int id) {
        this.id = id;
    }

}

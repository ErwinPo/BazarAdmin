package com.example.bazaradmin;


import java.sql.Timestamp;

public class Venta {

    int amount;
    int quantity;
    int user_id;
    Timestamp date;

    public Venta(int amount, int quantity, int user_id) {
        this.user_id = user_id;
        this.amount = amount;
        this.quantity = quantity;
    }

    public Venta(int monto, int cantidad, int user_id, Timestamp date) {
        this.amount = monto;
        this.quantity = cantidad;
        this.user_id = user_id;
        this.date = date;
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
}
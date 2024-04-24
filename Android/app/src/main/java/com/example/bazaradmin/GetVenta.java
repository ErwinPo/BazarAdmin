package com.example.bazaradmin;


import java.sql.Timestamp;

public class GetVenta {

    int amount;
    int quantity;
    int user_id;
    Timestamp date;
    int sale_id;
    Boolean is_active;

    public GetVenta(int amount, int quantity, int user_id, Timestamp date, int sale_id, Boolean is_active) {
        this.amount = amount;
        this.quantity = quantity;
        this.user_id = user_id;
        this.date = date;
        this.sale_id = sale_id;
        this.is_active = is_active;
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

    public int getSale_id() {
        return sale_id;
    }

    public void setSale_id(int sale_id) {
        this.sale_id = sale_id;
    }

    public Boolean getIs_active() {
        return is_active;
    }

    public void setIs_active(Boolean is_active) {
        this.is_active = is_active;
    }
}

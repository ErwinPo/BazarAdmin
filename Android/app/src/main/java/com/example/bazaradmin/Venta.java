package com.example.bazaradmin;


import java.sql.Timestamp;

public class Venta {

    int amount;
    int quantity;

    public Venta(int amount, int quantity) {
        this.amount = amount;
        this.quantity = quantity;
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
    
}

package com.example.bazaradmin;


import java.sql.Timestamp;

public class Venta {

    int venta_id;
    int monto;
    int cantidad;
    int user_id;
    Timestamp fecha;
    boolean active;

    public Venta(int monto, int cantidad, int user_id) {
        this.monto = monto;
        this.cantidad = cantidad;
        this.user_id = user_id;
    }

    public Venta(int venta_id, int monto, int cantidad, int user_id, Timestamp fecha, boolean active) {
        this.venta_id = venta_id;
        this.monto = monto;
        this.cantidad = cantidad;
        this.user_id = user_id;
        this.fecha = fecha;
        this.active = active;
    }

    public int getVenta_id() {
        return venta_id;
    }

    public void setVenta_id(int venta_id) {
        this.venta_id = venta_id;
    }

    public int getMonto() {
        return monto;
    }

    public void setMonto(int monto) {
        this.monto = monto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public Timestamp getFecha() {
        return fecha;
    }

    public void setFecha(Timestamp fecha) {
        this.fecha = fecha;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}

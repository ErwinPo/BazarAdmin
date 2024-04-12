package com.example.bazaradmin;

public class Usuario {
    int user_id;
    String nombre;
    String contrasena;
    String correo;
    int ventas_semana;
    boolean supermodel;
    boolean active;

    public Usuario(int user_id, String nombre, String contrasena, String correo, int ventas_semana, boolean supermodel, boolean active) {
        this.user_id = user_id;
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.correo = correo;
        this.ventas_semana = ventas_semana;
        this.supermodel = supermodel;
        this.active = active;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public int getVentas_semana() {
        return ventas_semana;
    }

    public void setVentas_semana(int ventas_semana) {
        this.ventas_semana = ventas_semana;
    }

    public boolean isSupermodel() {
        return supermodel;
    }

    public void setSupermodel(boolean supermodel) {
        this.supermodel = supermodel;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}

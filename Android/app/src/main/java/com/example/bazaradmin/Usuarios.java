package com.example.bazaradmin;

import java.util.List;

public class Usuarios {

    List<Usuario> registros;

    String message;

    public Usuarios(List<Usuario> registros, String message) {
        this.registros = registros;
        this.message = message;
    }

}

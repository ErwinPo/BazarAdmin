package com.example.bazaradmin;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

public class Ventas {

    List<Venta> registros;

    String message;

    public Ventas(List<Venta> registros, String message) {
        this.registros = registros;
        this.message = message;
    }
}

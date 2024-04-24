package com.example.bazaradmin;
import com.google.gson.Gson;

import java.util.Date;
import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiService {
    @GET("ventas/")
    Call<Ventas> getVentas();

    @GET("ventas/")
    Call<GetVenta> getLastVenta(@Query("sale_id") int sale_id);

    @POST("registroventa/")
    Call<Venta> createVenta(@Body Venta venta);

}
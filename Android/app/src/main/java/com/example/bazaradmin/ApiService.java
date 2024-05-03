package com.example.bazaradmin;
import android.text.GetChars;

import com.google.gson.Gson;

import java.util.Date;
import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiService {
    @GET("ventas/")
    Call<Ventas> getVentas();

    //@GET("sales//")
    //Call<GetVenta> getLastVenta(@Query("sale_id") int sale_id);

    @POST("registroventa/")
    Call<Venta> createVenta(@Body Venta venta);

    @DELETE("sales//{id}/")
    Call<Venta> deleteVenta(@Path("id") int id);

    @POST("api/login/")
    Call<User> login(@Body Login login);
}


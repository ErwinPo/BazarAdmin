package com.example.bazaradmin;
import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.text.GetChars;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiService{

    //SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(this);
    @GET("sales//")
    Call<ArrayList<GetVenta>> getVentas();

    //@GET("sales//")
    //Call<GetVenta> getLastVenta(@Query("sale_id") int sale_id);

    @POST("registroventa/")
    Call<Venta> createVenta(@Body Venta venta);

    @DELETE("sales//{id}/")
    Call<Venta> deleteVenta(@Path("id") int id);

    @POST("api/login/")
    Call<User> login(@Body Login login);

    @GET("ranking/")
    Call<ArrayList<RankedUser>> getRanking();

    @GET("sales-per-user/?id={id}")
    Call<ArrayList<Ventas>> getVentasUser(@Path("id") int id, @Header("access") String access);
}


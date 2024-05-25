package com.example.bazaradmin;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ApiService{

    @POST("sales//")
    Call<Venta> postVenta(@Body Venta venta, @Header("Authorization") String access);

    @DELETE("sales//{id}/")
    Call<Venta> deleteVenta(@Path("id") int id);

    @POST("api/login/")
    Call<User> login(@Body Login login);

    @GET("ranking/")
    Call<ArrayList<RankedUser>> getRanking(@Header("Authorization") String access);

    @GET("sales-per-user/")
    Call<ArrayList<GetVenta>> getVentasUser(@Header("Authorization") String access);

    @POST("password-reset/")
    Call<Email> changepassword(@Body Email email);
}


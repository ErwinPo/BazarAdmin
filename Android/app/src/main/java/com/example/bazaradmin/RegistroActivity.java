package com.example.bazaradmin;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import  retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RegistroActivity extends AppCompatActivity{
    Button register;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registro);

        register = findViewById(R.id.registrar);


        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api.seriesquotes.10cyrilc.me").addConverterFactory(GsonConverterFactory.create()).build();

        ApiService service = retrofit.create(ApiService.class);

        Call<Quote> call = service.getPost();

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                call.enqueue(new Callback<Quote>() {
                    @Override
                    public void onResponse(Call<Quote> call, Response<Quote> response) {

                        Gson gson = new Gson();
                        String json = response.body();
                        JsonArray array = gson.fromJson(json, JsonArray.class);
                        for (JsonElement element : array) {
                            Quote qoute = gson.fromJson(element,Quote.class);
                        }

                        if (response.isSuccessful()) {
                            Quote quote = response.body();
                            Log.i("QUOTE", quote.quote);
                        }
                    }
                    @Override
                    public void onFailure(Call<Quote> call, Throwable t) {
                        Log.i("QUOTE", t.toString());
                        call.cancel();
                        };
                });
            }
        });
}}

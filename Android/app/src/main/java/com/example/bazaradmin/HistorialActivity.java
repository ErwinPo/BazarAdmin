package com.example.bazaradmin;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.tabs.TabLayout;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class HistorialActivity extends AppCompatActivity {

    RecyclerView recyclerView;
    Ventas salesList;
    SalesAdapter myAdapter;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_historial);


        myAdapter = new SalesAdapter(HistorialActivity.this, salesList);

        recyclerView = findViewById(R.id.historialRecyclerView);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));


        SalesChangeListener();

    }

    Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("http://18.222.68.166:8000/bazar/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();

    private void SalesChangeListener() {
        ApiService service = retrofit.create(ApiService.class);
        Call<Ventas> call = service.getVentas();
        Log.i("2","2");
        call.clone().enqueue(new Callback<Ventas>() {
            @Override
            public void onResponse(Call<Ventas> call, Response<Ventas> response) {
                String responseString = "RCode: " + response.code();
                Log.i("RCODE", responseString);
                if (response.isSuccessful()) {

                    Ventas ventas = response.body();

                    myAdapter = new SalesAdapter(getApplicationContext(), ventas);
                    recyclerView.setAdapter(myAdapter);
                    Log.i("ID OF LAST SALE", String.valueOf(ventas.registros.get(ventas.registros.size()-1).sale_id));

                }
            }
            @Override
            public void onFailure(Call<Ventas> call, Throwable t) {
                Log.i("QUOTE", t.toString());
                call.cancel();
            };
        });
    }


}
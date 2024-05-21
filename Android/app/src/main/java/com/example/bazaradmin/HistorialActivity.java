package com.example.bazaradmin;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;

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
    Button logout;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_historial);

        BottomNavigationView navigation = findViewById(R.id.barra_Menu);
        navigation.setSelectedItemId(R.id.secondFragment);

        myAdapter = new SalesAdapter(HistorialActivity.this, salesList);
        logout = findViewById(R.id.logout);
        recyclerView = findViewById(R.id.historialRecyclerView);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        SharedPreferences sp = getSharedPreferences("UserPreferences", Context.MODE_PRIVATE);

        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sp.edit().remove("access").commit();
                sp.edit().remove("refresh").commit();
                startActivity(new Intent(getApplicationContext(), LoginActivity.class));
                overridePendingTransition(0,0);
            }
        });

        SalesChangeListener();

        navigation.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {

                int itemId = item.getItemId();
                if (itemId == R.id.firstFragment) {
                    startActivity(new Intent(getApplicationContext(), RegistroActivity.class));
                    overridePendingTransition(0,0);
                    finish();
                    return true;
                } else if (itemId == R.id.secondFragment) {
                    return true;
                } else if (itemId == R.id.thirdFragment) {
                    startActivity(new Intent(getApplicationContext(), RankingActivity.class));
                    overridePendingTransition(0,0);
                    finish();
                    return true;
                }
                return false;
            }
        });

    }

    Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("http://3.146.65.111:8000/bazar/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();


    private void SalesChangeListener() {
        ApiService service = retrofit.create(ApiService.class);
        Call<ArrayList<GetVenta>> call = service.getVentas();
        Log.i("2","2");
        call.clone().enqueue(new Callback<ArrayList<GetVenta>>() {
            @Override
            public void onResponse(Call<ArrayList<GetVenta>> call, Response<ArrayList<GetVenta>> response) {
                String responseString = "RCode: " + response.code();
                Log.i("RCODE", responseString);
                if (response.isSuccessful()) {
                    ArrayList<GetVenta> ventas = response.body();
                    Ventas adapterlist = new Ventas(ventas, "");

                    myAdapter = new SalesAdapter(getApplicationContext(), adapterlist);
                    recyclerView.setAdapter(myAdapter);
                    assert ventas != null;
                    Log.i("ID OF LAST SALE", String.valueOf(ventas.get(ventas.size()-1).id));
                }
            }
            @Override
            public void onFailure(Call<ArrayList<GetVenta>> call, Throwable t) {
                Log.i("QUOTE", t.toString());
                call.cancel();
            };
        });
    }

}
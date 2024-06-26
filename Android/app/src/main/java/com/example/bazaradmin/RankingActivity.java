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
import android.widget.Toast;

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

public class RankingActivity extends AppCompatActivity {

    RecyclerView recyclerView;
    ArrayList<RankedUser> rankedList;
    RankingAdapter myAdapter;
    Button logout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ranking);

        BottomNavigationView navigation = findViewById(R.id.barra_Menu);
        navigation.setSelectedItemId(R.id.thirdFragment);

        myAdapter = new RankingAdapter(RankingActivity.this, rankedList);

        recyclerView = findViewById(R.id.rankingRecycler);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        logout = findViewById(R.id.logout);
        SharedPreferences sp = getSharedPreferences("UserPreferences", Context.MODE_PRIVATE);
        timeout(sp);
        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sp.edit().remove("access").commit();
                sp.edit().remove("refresh").commit();
                startActivity(new Intent(getApplicationContext(), LoginActivity.class));
                overridePendingTransition(0,0);
            }
        });

        RankingChangeListener(sp);

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
                    startActivity(new Intent(getApplicationContext(), HistorialActivity.class));
                    overridePendingTransition(0,0);
                    finish();
                    return true;
                } else if (itemId == R.id.thirdFragment) {
                    return true;
                }
                return false;
            }
        });

    }

    Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("http://3.144.21.179:8000/bazar/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();


    private void timeout(SharedPreferences sp){
        Long accesstime = sp.getLong("accesstime", 0);
        Log.i("CURRENTTIME", String.valueOf(System.currentTimeMillis()));
        Log.i("LOGINTIME", String.valueOf(sp.getLong("accesstime", 0)));
        if (System.currentTimeMillis() > accesstime + 14400000){
            sp.edit().remove("access").commit();
            sp.edit().remove("refresh").commit();
            Toast.makeText(RankingActivity.this, "Sesion Timed Out", Toast.LENGTH_LONG).show();
            startActivity(new Intent(getApplicationContext(), LoginActivity.class));
            overridePendingTransition(0,0);
        }
    }

    private void RankingChangeListener(SharedPreferences sp) {
        ApiService service = retrofit.create(ApiService.class);
        String accesString = "Bearer " + sp.getString("access", "");

        Call<ArrayList<RankedUser>> call = service.getRanking(accesString);
        Log.i("2","2");
        call.clone().enqueue(new Callback<ArrayList<RankedUser>>() {
            @Override
            public void onResponse(Call<ArrayList<RankedUser>> call, Response<ArrayList<RankedUser>> response) {
                String responseString = "RCode: " + response.code();
                Log.i("RCODE", responseString);
                if (response.isSuccessful()) {

                    ArrayList<RankedUser> ranking = response.body();

                    myAdapter = new RankingAdapter(getApplicationContext(), ranking);
                    recyclerView.setAdapter(myAdapter);
                    //Log.i("RANKING", String.valueOf(ranking.rankedUsers.get(ranking.rankedUsers.size()-1).user));

                }
            }
            @Override
            public void onFailure(Call<ArrayList<RankedUser>> call, Throwable t) {
                Log.i("RANK FAIL", t.toString());
                call.cancel();
            };
        });
    }

}
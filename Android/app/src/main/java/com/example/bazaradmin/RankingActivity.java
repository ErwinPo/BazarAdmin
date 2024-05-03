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

public class RankingActivity extends AppCompatActivity {

    RecyclerView recyclerView;
    ArrayList<RankedUser> rankedList;
    RankingAdapter myAdapter;


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


        RankingChangeListener();

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
            .baseUrl("http://3.146.65.111:8000/bazar/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();


    private void RankingChangeListener() {
        ApiService service = retrofit.create(ApiService.class);
        Call<ArrayList<RankedUser>> call = service.getRanking();
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
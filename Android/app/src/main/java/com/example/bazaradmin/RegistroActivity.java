package com.example.bazaradmin;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import  retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RegistroActivity extends AppCompatActivity{
    Button register, delete;
    EditText monto, cantidad;
    TextView ventanumber, ventadate, ventaquantity, ventasale;
    int user_id = 1;

    Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("http://3.146.65.111:8000/bazar/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();

    ApiService service = retrofit.create(ApiService.class);
    GetVenta lastventa;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registro);

        BottomNavigationView navigation = findViewById(R.id.barra_Menu);
        navigation.setSelectedItemId(R.id.firstFragment);

        register = findViewById(R.id.registrar);
        delete = findViewById(R.id.delete);
        monto = findViewById(R.id.monto);
        cantidad = findViewById(R.id.cantidad);

        ventanumber = findViewById(R.id.ventaid);
        ventadate = findViewById(R.id.fecha);
        ventaquantity = findViewById(R.id.cantidadsmall);
        ventasale = findViewById(R.id.amount);

        getLastSale();
        //Log.i("LastSALE", String.valueOf(lastventa.sale_id));
        //ventanumber.setText(lastventa.sale_id);
        //ventadate.setText(lastventa.date.toString());
        //ventaquantity.setText(lastventa.quantity);
        //ventasale.setText(lastventa.amount);

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                try{
                    createSale();
                    getLastSale();
                } catch (Exception e) {
                    Log.i("Error", e.toString());
                };
            }
        });

        delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i("DELETE", "DELETING");
                getLastSale();
                Log.i("LASTSALE", String.valueOf(lastventa.id));
                deleteSale();
            }
        });

        navigation.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {

                int itemId = item.getItemId();
                if (itemId == R.id.firstFragment) {
                    return true;
                } else if (itemId == R.id.secondFragment) {
                    startActivity(new Intent(getApplicationContext(), HistorialActivity.class));
                    overridePendingTransition(0,0);
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

    private void deleteSale(){

        Call<Venta> call = service.deleteVenta(lastventa.id);
        Log.i("1","1");
        call.clone().enqueue(new Callback<Venta>() {
            @Override
            public void onResponse(Call<Venta> call, Response<Venta> response) {
                String responseString = "RCode: " + response.code();
                Log.i("RCODE", responseString);
                if (response.isSuccessful()) {
                    getLastSale();
                    Log.i("DELETED", "DELETED SALE: " + String.valueOf(lastventa.id));
                }
            }
            @Override
            public void onFailure(Call<Venta> call, Throwable t) {
                Log.i("QUOTE", t.toString());
                call.cancel();
            };
        });
    }

    private void createSale(){
        int quantity = Integer.parseInt(cantidad.getText().toString());
        int amount = Integer.parseInt(monto.getText().toString());

        Venta venta = new Venta(amount, quantity, user_id);
        Gson gson = new Gson();

        Call<Venta> call = service.createVenta(venta);
        Log.i("1","1");
        call.clone().enqueue(new Callback<Venta>() {
            @Override
            public void onResponse(Call<Venta> call, Response<Venta> response) {
                String responseString = "RCode: " + response.code();
                Log.i("RCODE", responseString);
                if (response.isSuccessful()) {
                    Log.i("Response", "1");
                }
            }
            @Override
            public void onFailure(Call<Venta> call, Throwable t) {
                Log.i("QUOTE", t.toString());
                call.cancel();
            };
        });
    }

    private void getLastSale(){

        Call<Ventas> call = service.getVentas();
        Log.i("2","2");
        call.clone().enqueue(new Callback<Ventas>() {
            @Override
            public void onResponse(Call<Ventas> call, Response<Ventas> response) {
                String responseString = "RCode: " + response.code();
                Log.i("RCODE", responseString);
                if (response.isSuccessful()) {
                    Ventas ventas = response.body();
                    lastventa = ventas.registros.get(ventas.registros.size()-1);
                    Log.i("ID OF LAST SALE", String.valueOf(lastventa.id));

                    ventasale.setText("$"+String.valueOf(lastventa.amount));

                    SimpleDateFormat dateFormat = new SimpleDateFormat("d/M - hh:mm", new Locale("es","ES"));
                    ventadate.setText(dateFormat.format(lastventa.date));
                    ventaquantity.setText(String.valueOf(lastventa.quantity));
                    ventanumber.setText("#"+String.valueOf(lastventa.id));
                }
            }
            @Override
            public void onFailure(Call<Ventas> call, Throwable t) {
                Log.i("FAIL", t.toString());
                call.cancel();
            };
        });
    }

}
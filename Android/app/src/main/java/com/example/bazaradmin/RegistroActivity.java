package com.example.bazaradmin;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import  retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RegistroActivity extends AppCompatActivity{
    Button register;
    EditText monto, cantidad;
    TextView ventanumber, ventadate, ventaquantity, ventasale;
    int user_id = 1;

    Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("http://18.222.68.166:8000/BAZARAPI/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();

    ApiService service = retrofit.create(ApiService.class);
    GetVenta lastventa;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registro);

        register = findViewById(R.id.registrar);
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
                    Log.i("ID OF LAST SALE", String.valueOf(lastventa.sale_id));
                    ventadate.setText(lastventa.date.toString());
                    ventanumber.setText(String.valueOf(lastventa.sale_id));
                    ventaquantity.setText(String.valueOf(lastventa.quantity));
                    ventasale.setText(String.valueOf(lastventa.amount));
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
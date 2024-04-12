package com.example.bazaradmin;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import  retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RegistroActivity extends AppCompatActivity{
    Button register;
    EditText monto, cantidad;

    int user_id = 5;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registro);

        register = findViewById(R.id.registrar);
        monto = findViewById(R.id.monto);
        cantidad = findViewById(R.id.cantidad);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://127.0.0.1:8000/BAZARAPI/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        ApiService service = retrofit.create(ApiService.class);

        Call<List<Venta>> call = service.getVentas();

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int cantidadventa = Integer.parseInt(cantidad.getText().toString());
                int montoventa = Integer.parseInt(monto.getText().toString());

                Venta venta = new Venta(montoventa, cantidadventa, user_id);
                Gson gson = new Gson();
                String ventajson = gson.toJson(venta);
                Log.i("JSONVENTA", ventajson);
            }
                /*
                call.clone().enqueue(new Callback<List<Venta>>() {
                    @Override
                    public void onResponse(Call<List<Venta>> call, Response<List<Venta>> response) {

                        if (response.isSuccessful()) {
                            List<Venta> ventas = response.body();
                            Log.i("VENTA", Integer.toString(ventas.get(0).getMonto()));

                        }
                    }
                    @Override
                    public void onFailure(Call<List<Venta>> call, Throwable t) {
                        Log.i("QUOTE", t.toString());
                        call.cancel();
                        };
                });
            } */
        });
}}
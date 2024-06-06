package com.example.bazaradmin;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import  retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ResetActivity extends AppCompatActivity{
    Button change, cancel;
    EditText correo;
    String correoStr;

    Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("http://3.144.21.179:8000/bazar/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();
    ApiService service = retrofit.create(ApiService.class);
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reset);

        correo = findViewById(R.id.correo);
        change = findViewById(R.id.ingresar);
        cancel = findViewById(R.id.recuperar);

        change.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                correoStr = correo.getText().toString();
                changepassword(correoStr);
            }
        });

        cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getApplicationContext(), LoginActivity.class));
                overridePendingTransition(0,0);
            }
        });
    }

    private void changepassword(String correoStr){

        Email email = new Email(correoStr);
        Call<Email> call = service.changepassword(email);

        call.clone().enqueue(new Callback<Email>() {
            @Override
            public void onResponse(Call<Email> call, Response<Email> response) {
                if (response.isSuccessful()){
                    Toast.makeText(ResetActivity.this, "Correo enviado, si es la primera vez es posible que se necesite mandar la solicitud de nuevo.", Toast.LENGTH_LONG);
                    startActivity(new Intent(getApplicationContext(), LoginActivity.class));
                    overridePendingTransition(0,0);
                }
            }
            @Override
            public void onFailure(Call<Email> call, Throwable t) {
                Log.i("QUOTE", t.toString());
                call.cancel();
            }
        });
    }
}
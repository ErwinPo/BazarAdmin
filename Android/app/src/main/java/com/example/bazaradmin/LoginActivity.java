package com.example.bazaradmin;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import  retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity{
    Button login, changepassword;
    EditText correologin, password;
    SharedPreferences sp;
    String correoStr, passStr;

    Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("http://3.146.65.111:8000/bazar/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();
    ApiService service = retrofit.create(ApiService.class);
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        login = findViewById(R.id.ingresar);
        correologin = findViewById(R.id.correologin);
        password = findViewById(R.id.password);
        changepassword = findViewById(R.id.recuperar);

        sp = getSharedPreferences("UserPreferences", Context.MODE_PRIVATE);
        SharedPreferences sp2 = getApplicationContext().getSharedPreferences("UserPreferences", Context.MODE_PRIVATE);
        String access = sp2.getString("access", "");

        changepassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getApplicationContext(), ResetActivity.class));
                overridePendingTransition(0,0);
            }
        });

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                correoStr = correologin.getText().toString();
                passStr = password.getText().toString();
                login(correoStr,passStr);
                String access = sp2.getString("access", "");
                Log.i("USER", access);
                if(!access.equals("")) {
                    Toast.makeText(LoginActivity.this, "ACCESSED", Toast.LENGTH_LONG).show();

                    startActivity(new Intent(getApplicationContext(), RegistroActivity.class));
                    overridePendingTransition(0,0);
                }
            }
        });

    }

    private void login(String correo, String password){
        Login login = new Login(correo,password);

        Call<User> call = service.login(login);
        Log.i("CORREO",correo);
        Log.i("PASSWD",password);
        call.clone().enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                String responseString = "RCode: " + response.errorBody();
                Log.i("RCODE", responseString);
                if (response.isSuccessful()) {
                    Log.i("Response", response.body().access.toString());
                    SharedPreferences.Editor editor = sp.edit();
                    editor.putString("refresh", response.body().refresh);
                    editor.putString("access", response.body().access);
                    editor.putLong("accesstime", System.currentTimeMillis());
                    editor.commit();

                    startActivity(new Intent(getApplicationContext(), RegistroActivity.class));
                    overridePendingTransition(0,0);
                }
            }
            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.i("QUOTE", t.toString());
                call.cancel();
            };
        });
    }

}
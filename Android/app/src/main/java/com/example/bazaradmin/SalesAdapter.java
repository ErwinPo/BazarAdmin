package com.example.bazaradmin;
import android.content.Context;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;


public class SalesAdapter extends RecyclerView.Adapter<SalesAdapter.MyViewHolder> {

    Context context;
    Ventas SalesList;


    public SalesAdapter(Context context, Ventas SalesArrayList) {
        this.context = context;
        this.SalesList = SalesArrayList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View v = LayoutInflater.from(context).inflate(R.layout.registroitem, parent, false);

        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        GetVenta sale = SalesList.registros.get(position);
        holder.amount.setText("$"+String.valueOf(sale.amount));

        SimpleDateFormat dateFormat = new SimpleDateFormat("d/M - hh:mm", new Locale("es","ES"));
        holder.fecha.setText(dateFormat.format(sale.date));
        holder.quantity.setText(String.valueOf(sale.quantity));
        holder.sale_id.setText("#"+String.valueOf(sale.id));
        Log.i("ID OF SALE", String.valueOf(sale.id));
    }


    @Override
    public int getItemCount() {
        return SalesList.registros.size();
    }

    public  static class MyViewHolder extends RecyclerView.ViewHolder{
        TextView sale_id,fecha,quantity, amount;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            sale_id = itemView.findViewById(R.id.ventaid);
            fecha = itemView.findViewById(R.id.fecha);
            quantity = itemView.findViewById(R.id.cantidad);
            amount = itemView.findViewById(R.id.amount);
        }
    }
}
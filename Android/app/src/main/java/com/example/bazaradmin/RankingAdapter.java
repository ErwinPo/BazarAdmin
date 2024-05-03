package com.example.bazaradmin;
import android.content.Context;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;


public class RankingAdapter extends RecyclerView.Adapter<RankingAdapter.MyViewHolder> {

    Context context;
    Ranking RankedList;


    public RankingAdapter(Context context, Ranking RankedArrayList) {
        this.context = context;
        this.RankedList = RankedArrayList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View v = LayoutInflater.from(context).inflate(R.layout.rankingitem, parent, false);

        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        RankedUser user = RankedList.rankedUsers.get(position);

        holder.amount.setText(String.valueOf(user.amount));
        holder.name.setText(user.user);
        holder.placement.setText(String.valueOf(position + 1));
    }


    @Override
    public int getItemCount() {
        return RankedList.rankedUsers.size();
    }

    public  static class MyViewHolder extends RecyclerView.ViewHolder{
        TextView placement,name,amount;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            placement = itemView.findViewById(R.id.placement);
            name = itemView.findViewById(R.id.name);
            amount = itemView.findViewById(R.id.amount);
        }
    }
}
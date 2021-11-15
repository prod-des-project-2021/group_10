package com.pdiproject;

import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Icon;
import android.os.Build;
import android.service.quicksettings.TileService;

import androidx.annotation.RequiresApi;

@RequiresApi(api = Build.VERSION_CODES.N)
public class QuicksettingService extends TileService {


    private static final int OPEN_CAMERA_CODE = 10;

    public QuicksettingService(){

    }
    public void updateIcon() {
        Context context = getApplicationContext();
        Icon icon = Icon.createWithResource(context, R.drawable.ic_flag_off);
        getQsTile().setIcon(icon);
        getQsTile().updateTile();
    }

    @Override
    public void onClick() {
        updateIcon();
        Context context = getApplicationContext();

        Intent closeIntent = new Intent(Intent.ACTION_CLOSE_SYSTEM_DIALOGS);
        context.sendBroadcast(closeIntent);

        Intent intent = new Intent(context, CameraActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra("code", OPEN_CAMERA_CODE);
        context.startActivity(intent);

    }
}

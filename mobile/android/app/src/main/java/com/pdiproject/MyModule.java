package com.pdiproject;

import android.content.Intent;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

public class MyModule extends ReactContextBaseJavaModule {

    ReactApplicationContext context = getReactApplicationContext();
    public MyModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "MyModule";
    }

    @ReactMethod
    public void navigateToNative() {
        Intent intent = new Intent(context, CameraActivity.class);
        if (intent.resolveActivity(context.getPackageManager()) != null) {
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
        }
    }

    @ReactMethod
    public void getPictureDir(Callback callback) {
        String dir = getReactApplicationContext().getExternalFilesDir(Environment.DIRECTORY_PICTURES) + "/PDIProject";
        Log.d("juu", dir);
        callback.invoke(dir);
    }
}

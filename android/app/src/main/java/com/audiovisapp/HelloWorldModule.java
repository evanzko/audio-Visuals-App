//HelloWorldModule.java
package com.audiovisapp; //replace com.thebhwgroup.demo with the package name in MainApplication.java

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class HelloWorldModule extends ReactContextBaseJavaModule {
    public HelloWorldModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }

    @Override
    public String getName() {
        return "HelloWorld"; //HelloWorld is how this module will be referred to from React Native
    }

    @ReactMethod
    public void helloWorld(Promise promise) { //this method will be called from JS by React Native
        promise.resolve("Hello World!");
    }
}

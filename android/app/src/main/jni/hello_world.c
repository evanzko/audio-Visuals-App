//hello_world.c
#include <jni.h>

jstring Java_com_audiovisapp_HelloWorldModule_helloWorldJNI(JNIEnv* env, jobject thiz) {
  return (*env)->NewStringUTF(env, "Hello  C World!");
}

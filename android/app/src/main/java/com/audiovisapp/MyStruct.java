//MyStruct.java
package com.audiovisapp;

public class MyStruct {
    int vector_count;
    MyVector[] vectors;
    MyVector pos;

    public MyStruct() {}

    public MyStruct(int vector_count, MyVector[] vectors, MyVector pos) {
        this.vector_count = vector_count;
        this.vectors = vectors;
        this.pos = pos;
    }
}

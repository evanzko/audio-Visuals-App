//defs.h
#ifndef DEFS_H
#define DEFS_H

typedef struct
{
    double x;
    double y;
} MyVector, *pMyVector;

typedef struct
{
    int vector_count;
    MyVector* vectors;
    MyVector position;
} MyStruct, *pMyStruct;

#endif

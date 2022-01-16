package com.exam.backendexam.bean;

public class GenException extends RuntimeException{
    String message;

    public GenException(String message) {
        this.message = message;
    }
}

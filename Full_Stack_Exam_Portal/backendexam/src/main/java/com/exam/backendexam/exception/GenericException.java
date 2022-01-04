package com.exam.backendexam.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Data
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class GenericException extends RuntimeException {
    private String message;
    public GenericException(String message) {
        super(message);
        this.message = message;
    }
}

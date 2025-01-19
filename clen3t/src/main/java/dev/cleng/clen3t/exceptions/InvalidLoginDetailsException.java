package dev.cleng.clen3t.exceptions;

public class InvalidLoginDetailsException extends RuntimeException {
    public InvalidLoginDetailsException(String message) {
        super(message);
    }
}

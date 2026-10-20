package com.restaurant.dto.response;

import java.time.OffsetDateTime;
import java.util.List;

public class ApiErrorResponse {

    private boolean success = false;
    private String errorCode;
    private String message;
    private List<ValidationError> errors;
    private OffsetDateTime timestamp;

    public ApiErrorResponse() {
        this.timestamp = OffsetDateTime.now();
    }

    public ApiErrorResponse(String errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
        this.timestamp = OffsetDateTime.now();
    }

    public ApiErrorResponse(String errorCode, String message, List<ValidationError> errors) {
        this.errorCode = errorCode;
        this.message = message;
        this.errors = errors;
        this.timestamp = OffsetDateTime.now();
    }

    public boolean isSuccess() {
        return success;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<ValidationError> getErrors() {
        return errors;
    }

    public void setErrors(List<ValidationError> errors) {
        this.errors = errors;
    }

    public OffsetDateTime getTimestamp() {
        return timestamp;
    }

    public static class ValidationError {
        private String field;
        private Object rejectedValue;
        private String message;

        public ValidationError(String field, Object rejectedValue, String message) {
            this.field = field;
            this.rejectedValue = rejectedValue;
            this.message = message;
        }

        public String getField() {
            return field;
        }

        public Object getRejectedValue() {
            return rejectedValue;
        }

        public String getMessage() {
            return message;
        }
    }
}

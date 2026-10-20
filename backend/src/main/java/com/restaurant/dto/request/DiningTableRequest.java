package com.restaurant.dto.request;

import com.restaurant.enums.TableStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class DiningTableRequest {

    @NotBlank(message = "Mã bàn không được để trống")
    @Size(max = 30, message = "Mã bàn không vượt quá 30 ký tự")
    private String code;

    @NotBlank(message = "Tên bàn không được để trống")
    @Size(max = 100, message = "Tên bàn không vượt quá 100 ký tự")
    private String name;

    @NotNull(message = "Sức chứa/Số ghế không được để trống")
    @Min(value = 1, message = "Sức chứa bàn tối thiểu là 1 người")
    private Integer capacity = 4;

    private TableStatus status = TableStatus.EMPTY;

    public DiningTableRequest() {
    }

    public DiningTableRequest(String code, String name, Integer capacity, TableStatus status) {
        this.code = code;
        this.name = name;
        this.capacity = capacity;
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public TableStatus getStatus() {
        return status;
    }

    public void setStatus(TableStatus status) {
        this.status = status;
    }
}

package com.restaurant.service;

import com.restaurant.dto.request.DiningTableRequest;
import com.restaurant.dto.response.DiningTableResponse;
import com.restaurant.enums.TableStatus;

import java.util.List;

public interface DiningTableService {
    List<DiningTableResponse> getAllTables();
    DiningTableResponse getTableById(Long id);
    DiningTableResponse createTable(DiningTableRequest request);
    DiningTableResponse updateTable(Long id, DiningTableRequest request);
    void deleteTable(Long id);
    DiningTableResponse updateTableStatus(Long id, TableStatus status);
}

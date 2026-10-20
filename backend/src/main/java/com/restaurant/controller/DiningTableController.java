package com.restaurant.controller;

import com.restaurant.dto.request.DiningTableRequest;
import com.restaurant.dto.response.ApiResponse;
import com.restaurant.dto.response.DiningTableResponse;
import com.restaurant.enums.TableStatus;
import com.restaurant.service.DiningTableService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class DiningTableController {

    private final DiningTableService diningTableService;

    public DiningTableController(DiningTableService diningTableService) {
        this.diningTableService = diningTableService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DiningTableResponse>>> getAllTables() {
        List<DiningTableResponse> tables = diningTableService.getAllTables();
        return ResponseEntity.ok(ApiResponse.success(tables));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DiningTableResponse>> getTableById(@PathVariable Long id) {
        DiningTableResponse table = diningTableService.getTableById(id);
        return ResponseEntity.ok(ApiResponse.success(table));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DiningTableResponse>> createTable(@Valid @RequestBody DiningTableRequest request) {
        DiningTableResponse created = diningTableService.createTable(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Thêm bàn ăn thành công", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DiningTableResponse>> updateTable(@PathVariable Long id,
                                                                        @Valid @RequestBody DiningTableRequest request) {
        DiningTableResponse updated = diningTableService.updateTable(id, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật thông tin bàn ăn thành công", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteTable(@PathVariable Long id) {
        diningTableService.deleteTable(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa bàn ăn thành công", null));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<DiningTableResponse>> updateTableStatus(@PathVariable Long id,
                                                                              @RequestParam TableStatus status) {
        DiningTableResponse updated = diningTableService.updateTableStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật trạng thái bàn thành công", updated));
    }
}

package com.restaurant.repository;

import com.restaurant.entity.CategoryEntity;
import com.restaurant.entity.DiningTableEntity;
import com.restaurant.entity.UserEntity;
import com.restaurant.enums.RoleEnum;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class DatabaseIntegrationTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private DiningTableRepository diningTableRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("Verify Flyway migration executed and initial categories seeded")
    void shouldFindSeededCategories() {
        List<CategoryEntity> categories = categoryRepository.findAll();
        assertThat(categories).isNotEmpty();
        assertThat(categories.size()).isGreaterThanOrEqualTo(4);

        boolean hasMonChinh = categories.stream().anyMatch(c -> c.getName().contains("Món Chính"));
        assertThat(hasMonChinh).isTrue();
    }

    @Test
    @DisplayName("Verify Flyway migration executed and initial dining tables seeded")
    void shouldFindSeededTables() {
        List<DiningTableEntity> tables = diningTableRepository.findAll();
        assertThat(tables).isNotEmpty();
        assertThat(tables.size()).isGreaterThanOrEqualTo(10);

        Optional<DiningTableEntity> b01 = diningTableRepository.findByCode("B01");
        assertThat(b01).isPresent();
        assertThat(b01.get().getName()).contains("Bàn 01");
    }

    @Test
    @DisplayName("Verify admin user exists in users table")
    void shouldFindAdminUser() {
        Optional<UserEntity> adminUser = userRepository.findByUsername("admin");
        assertThat(adminUser).isPresent();
        assertThat(adminUser.get().getRole()).isEqualTo(RoleEnum.ADMIN);
    }
}

-- ====================================================================
-- V3__seed_menu_items.sql: Khởi tạo các món ăn mẫu cho thực đơn
-- ====================================================================

INSERT INTO menu_items (category_id, name, description, price, image_url, status) VALUES
(1, 'Salad Cá Hồi Sốt Mè', 'Cá hồi Na Uy áp chảo nhẹ kèm xà lách tươi và sốt mè rang', 85000.00, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500', 'AVAILABLE'),
(1, 'Gỏi Bò Bóp Thấu', 'Thịt bò non tái chanh trộn hành tây, bắp chuối và đậu phộng', 95000.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', 'AVAILABLE'),
(2, 'Bò Lúc Lắc Khoai Tây', 'Bò phi-lê thái quân cờ xào tiêu đen ăn kèm khoai tây chiên giòn', 125000.00, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500', 'AVAILABLE'),
(2, 'Lẩu Hải Sản Chua Cay', 'Tôm càng, mực ống, nghêu ngọt trong nước lẩu chua cay đậm đà', 280000.00, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500', 'AVAILABLE'),
(2, 'Cơm Chiên Dương Châu', 'Cơm chiên tơi xốp với lạp xưởng, tôm, trứng và đậu Hà Lan', 65000.00, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500', 'AVAILABLE'),
(3, 'Trà Đào Cam Sả', 'Trà thanh nhiệt thơm hương sả và cam tươi kèm đào miếng giòn', 35000.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500', 'AVAILABLE'),
(3, 'Bia Heineken Bạc', 'Bia lon 330ml ướp lạnh sảng khoái', 25000.00, 'https://images.unsplash.com/photo-1608270119853-93d39535bfd3?w=500', 'AVAILABLE'),
(4, 'Chè Hạt Sen Long Nhãn', 'Hạt sen bùi béo nấu cùng long nhãn ngọt thanh và đường phèn', 30000.00, 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500', 'AVAILABLE');

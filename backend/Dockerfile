# Stage 1: Runtime image using Eclipse Temurin 21 JRE
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Tạo non-root user để tăng tính bảo mật
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Sao chép file JAR đã đóng gói vào image
COPY target/restaurant-backend-0.0.1-SNAPSHOT.jar app.jar

USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]

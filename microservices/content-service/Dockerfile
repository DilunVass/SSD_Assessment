# Use the official OpenJDK 17 Alpine Linux image as the base
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle project files
COPY build.gradle settings.gradle gradle gradlew./

# Copy the entire project (including source code) into the container
COPY . .

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the builder stage
COPY ./build/libs/*.jar app.jar

EXPOSE 8089
# Specify the entry point to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
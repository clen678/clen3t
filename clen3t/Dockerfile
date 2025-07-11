# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Package stage
FROM openjdk:17-jdk-slim

# Install CA certificates (this installs system-wide ones, which Java often picks up)
RUN apt-get update && apt-get install -y ca-certificates --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /clen3t

# Copy the built jar from the build stage
COPY --from=build /app/target/clen3t-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Start the app forcing TLS 1.2 for MongoDB SSL handshake
ENTRYPOINT ["java", "-Djdk.tls.client.protocols=TLSv1.2", "-jar", "app.jar"]
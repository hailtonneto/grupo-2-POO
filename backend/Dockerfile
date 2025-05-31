# Usa imagem base com Java 17
FROM openjdk:17-jdk-slim

# Define diretório de trabalho
WORKDIR /app

# Copia o JAR para o container
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Comando para executar o JAR
ENTRYPOINT ["java", "-jar", "app.jar"]

FROM openjdk:17-jdk
CMD ["./gradlew", "clean", "build"]
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8081
# ENTRYPOINT ["java","-jar","/app.jar"]
ENTRYPOINT ["java","-DSpring.profiles.active=prod","-jar","/app.jar"]

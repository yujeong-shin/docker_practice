FROM openjdk:11 as stage1

WORKDIR /app

# gradle 빌드 시에 필요한 파일들을 Docker의 workdir로 copy
COPY gradlew .
# 일반적으로 폴더 전체를 복사할 때는 폴더 이름을 같이 적어줌 : gradle 폴더를 gradle이라는 이름으로 COPY
COPY gradle gradle 
COPY build.gradle .
COPY settings.gradle .
COPY src src

# bootJar : plain jar만 얻음
# /app/build/libs/*.jar 파일 아래 명령어를 통해 생성
RUN ./gradlew bootJar

# 새로운 스테이지 시작
FROM openjdk:11

WORKDIR /app

COPY --from=stage1 /app/build/libs/*.jar app.jar

# docker run -d -p 8080:8080 -v C:/Users/Playdata/Desktop/tmp:/tmp ordering:v1
VOLUME /tmp

# CMD 또는 ENTRYPOINT를 통해 컨테이너 실행
# 프로젝트 때 버전관리 어떻게 할 것인가?
ENTRYPOINT ["java", "-jar", "app.jar"]

# docker 실행 시 db 정보를 환경변수로 주입
# docker run -d -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:mariadb://host.docker.internal:3306/spring_order -v C:/Users/Playdata/Desktop/tmp:/tmp ordering:v1
package com.b306.gongcha.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Configuration
public class FcmConfig {

    @Bean
    FirebaseMessaging firebaseMessaging() throws IOException {

        // Firebase Admin SDK의 서비스 계정 키 파일 위치를 지정
        ClassPathResource resource = new ClassPathResource("gongcha-adminsdk.json");

        // 서비스 계정 키 파일을 읽어옴
        InputStream refreshToken = resource.getInputStream();

        FirebaseApp firebaseApp = null;
        List<FirebaseApp> firebaseAppList = FirebaseApp.getApps();

        // 이미 등록된 FirebaseApp 인스턴스가 있는지 확인
        if (firebaseAppList != null && !firebaseAppList.isEmpty()){
           for (FirebaseApp app : firebaseAppList){
               if(app.getName().equals(FirebaseApp.DEFAULT_APP_NAME)){
                   firebaseApp = app;  // 기존 인스턴스를 사용
                   break;
               }
           }
        }
        // 등록된 FirebaseApp 인스턴스가 없으면 새 인스턴스를 생성.
        else {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(refreshToken))  // 서비스 계정 키로 인증 정보를 설정.
                    .build();
            firebaseApp = FirebaseApp.initializeApp(options);
        }

        return FirebaseMessaging.getInstance(firebaseApp);
    }
}

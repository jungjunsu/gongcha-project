package com.b306.gongcha.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AmazonS3ResourceStorage {

    private final AmazonS3 amazonS3;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;

    public String store(String path, MultipartFile multipartFile) {

        String uuidFilename = path + UUID.randomUUID();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        try {
            amazonS3.putObject(bucket, uuidFilename, multipartFile.getInputStream(), metadata);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.FILE_UPLOAD_FAIL);
        }

        return amazonS3.getUrl(bucket, uuidFilename).toString();
    }

    public void delete(String imageURL) {

        /**
         * https://s3.amazonaws.com/my-bucket/images/profile.jpg
         * 에 대한 bucket image 를 가지고 온다고 가정하면, path 는 /images/profile.jpg가 되고
         * 앞에 '/'를 제거하기 위해서 subString 으로 1번 자리를 제거한다.
         */

        try {
            URL url = new URL(imageURL);
            String key = url.getPath().substring(1);

            amazonS3.deleteObject(bucket, key);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.FILE_DELETE_FAIL);
        }
    }

}

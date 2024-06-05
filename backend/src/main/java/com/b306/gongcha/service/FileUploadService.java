package com.b306.gongcha.service;

import com.amazonaws.SdkBaseException;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileUploadService {

    private final AmazonS3ResourceStorage amazonS3ResourceStorage;

    /**
     * save 로 들어오는 이미지의 multipartFile 의 타입을 jpeg, png 타입인지 확인하고 aws s3의 버킷에 저장한다.
     */
    public String save(String path, MultipartFile multipartFile) {

        if(multipartFile.isEmpty()) {
            throw new CustomException(ErrorCode.EMPTY_FILE);
        }
        verifyExtension(multipartFile);
        return amazonS3ResourceStorage.store(path, multipartFile);
    }

    public void delete(String fileURL) throws SdkBaseException {
        amazonS3ResourceStorage.delete(fileURL);
    }

    public void verifyExtension(MultipartFile multipartFile) {

        String contentType = multipartFile.getContentType();

        // jpeg 랑 png 형식의 이미지가 아니면 에러 처리
        if(ObjectUtils.isEmpty(contentType) || (!contentType.contains("image/jpeg") && !contentType.contains("image/png"))) {
            throw new CustomException(ErrorCode.NOT_VALID_EXTENSION);
        }
    }
}


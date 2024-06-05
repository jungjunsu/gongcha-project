package com.b306.gongcha.repository;

import com.b306.gongcha.entity.SmsInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SmsInfoRepository extends CrudRepository<SmsInfo, Long> {

    Optional<SmsInfo> findByPhoneNumber(@Param("phoneNumber") String phoneNumber);
}

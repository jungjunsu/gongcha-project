package com.b306.gongcha.repository;


import com.b306.gongcha.entity.RefreshToken;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {

    Boolean existsByRefreshToken(String refreshToken);
    void deleteByRefreshToken(String refreshToken);
}

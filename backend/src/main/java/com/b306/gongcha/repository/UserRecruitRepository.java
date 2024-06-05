package com.b306.gongcha.repository;

import com.b306.gongcha.entity.UserRecruit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRecruitRepository extends JpaRepository<UserRecruit, Long> {

    List<UserRecruit> findAllByRecruitId(Long recruitId);

    List<UserRecruit> findAllByUserId(Long userId);

    Optional<UserRecruit> findByRecruitIdAndUserId(Long recruitId, Long userId);

    void deleteAllByRecruitId(Long recruitId);

}

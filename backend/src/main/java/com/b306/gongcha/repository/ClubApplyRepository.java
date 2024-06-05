package com.b306.gongcha.repository;

import com.b306.gongcha.entity.ClubApply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClubApplyRepository extends JpaRepository<ClubApply, Long> {

    Optional<ClubApply> findByUserId(Long userId);

}

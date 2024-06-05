package com.b306.gongcha.repository;

import com.b306.gongcha.entity.Transfer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
    Page<Transfer> findAllByIsJoinedIsTrue(Pageable pageable);
    Optional<Transfer> findByUserId(Long userId);
}

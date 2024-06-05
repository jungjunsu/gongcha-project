package com.b306.gongcha.repository;

import com.b306.gongcha.entity.UserTransfer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserTransferRepository extends JpaRepository<UserTransfer, Long> {

    List<UserTransfer> findAllByTransferId(Long transferId);
    List<UserTransfer> findAllByUserId(Long userId);
    Optional<UserTransfer> findByTransferIdAndUserId(Long transferId, Long userId);
}

package com.b306.gongcha.repository;

import com.b306.gongcha.entity.Notice;
import com.b306.gongcha.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    List<Notice> findAllByToUserId(Long fromUserId);
}

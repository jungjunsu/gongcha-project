package com.b306.gongcha.repository;

import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.num.ClubRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserInfo(String userInfo);

    User findByClubIdAndClubRole(Long id, ClubRole role);

    Optional<User> findByName(String name);

    List<User> findAllByName(String name);

}

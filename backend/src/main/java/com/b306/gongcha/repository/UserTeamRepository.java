package com.b306.gongcha.repository;

import com.b306.gongcha.dto.response.CardResponse;
import com.b306.gongcha.entity.Card;
import com.b306.gongcha.entity.Role;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {

    Optional<UserTeam> findByTeamIdAndUserId(Long teamId, Long userId);

    // 승인 여부와 상관없이 신청한 모든 유저 정보 반환
    List<UserTeam> findAllByTeamId(Long teamId);

    List<UserTeam> findByUserId(Long userId);

    // 팀에 승인된 선수들만 보여주기 
    List<UserTeam> findAllByTeamIdAndPermitIsTrue(Long teamId);

    // 승인 대기 목록 선수들만 보여주기
    List<UserTeam> findAllByTeamIdAndPermitIsFalse(Long teamId);

    // 팀 id로 유저 정보 목록 불러오기
    @Query("select u from User u left outer join UserTeam ut on u.id = ut.user.id where ut.team.id = :teamId")
    List<User> findUsersByTeamId(Long teamId);

    // 팀 id로 유저 카드 목록을 불러오기
    @Query("select c from Card c left outer join UserTeam ut on c.user.id = ut.user.id where ut.team.id = :teamId")
    List<Card> findCardsByTeamId(Long teamId);

    // 유저 id와 역할로 찾기
    List<UserTeam> findAllByUserIdAndRole(Long userId, Role role);

    Optional<UserTeam> findByTeamIdAndRole(Long teamId, Role role);

    List<UserTeam> findAllByUserId(Long userId);

}

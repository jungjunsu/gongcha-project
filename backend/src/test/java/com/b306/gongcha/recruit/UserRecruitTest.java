// package com.b306.gongcha.recruit;

// import com.b306.gongcha.entity.*;
// import com.b306.gongcha.repository.RecruitRepository;
// import com.b306.gongcha.repository.UserRepository;
// import com.b306.gongcha.service.RecruitService;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.transaction.annotation.Transactional;

// import static org.assertj.core.api.Assertions.assertThat;

// @SpringBootTest
// @Transactional
// public class UserRecruitTest {

//     @Autowired
//     private RecruitService recruitService;

//     @Autowired
//     private RecruitRepository recruitRepository;

//     @Autowired
//     private UserRepository userRepository;

//     @Test
//     public void createUserRecruit() {
//         User user = User.builder().id(1L).build();
//         userRepository.save(user);
// //        Recruit recruit = new Recruit(1L, "2024-04-26 12:34","유성구", "유성 풋살장", "선수 모집합니다.", Gender.valueOf("남성"), Indoor.valueOf("실내"), Difficulty.valueOf("초급"), Status.valueOf("모집중"),5, 6);
// //        recruitRepository.save(recruit);

// //        recruitService.requestRecruit(recruit.getId(), user.getId());
//     }

// }

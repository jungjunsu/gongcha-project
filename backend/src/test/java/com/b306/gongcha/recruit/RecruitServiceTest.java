// package com.b306.gongcha.recruit;

// import com.b306.gongcha.dto.request.RecruitRequest;
// import com.b306.gongcha.dto.response.RecruitResponse;
// import com.b306.gongcha.entity.Difficulty;
// import com.b306.gongcha.entity.Gender;
// import com.b306.gongcha.entity.Indoor;
// import com.b306.gongcha.service.RecruitService;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.transaction.annotation.Transactional;

// import java.util.List;

// import static org.assertj.core.api.Assertions.assertThat;

// @SpringBootTest
// @Transactional
// public class RecruitServiceTest {

//     @Autowired
//     private RecruitService recruitService;

//     @Test
//     public void createRecruitTest() {
//         RecruitRequest recruitRequest = RecruitRequest.builder()
//                 .date("2024-04-26 12:34")
//                 .address("대전 유성구")
//                 .field("유성 풋살장")
//                 .info("인원 모집합니다.")
//                 .gender(Gender.valueOf("남성"))
//                 .indoor(Indoor.valueOf("실내"))
//                 .difficulty(Difficulty.valueOf("초급"))
//                 .currentPlayers(5)
//                 .allPlayers(6)
//                 .build();

//         recruitService.createRecruit(recruitRequest);
//         Long recruitId = 1L;
//         RecruitResponse recruitResponse = recruitService.getRecruit(recruitId);
//         assertThat(recruitResponse.getField()).isEqualTo(recruitRequest.getField());
//     }

//     @Test
//     public void getRecruitListTest() {
//         RecruitRequest recruitRequest = RecruitRequest.builder()
//                 .date("2024-04-26 12:34")
//                 .address("대전 유성구")
//                 .field("유성 풋살장")
//                 .info("인원 모집합니다.")
//                 .gender(Gender.valueOf("남성"))
//                 .indoor(Indoor.valueOf("실내"))
//                 .difficulty(Difficulty.valueOf("초급"))
//                 .currentPlayers(5)
//                 .allPlayers(6)
//                 .build();
//         recruitService.createRecruit(recruitRequest);

//         List<RecruitResponse> recruitList = recruitService.getAllRecruits();
//         for(RecruitResponse r : recruitList) {
//             System.out.println("recruit 목록 정보: " + r);
//         }
//     }

//     @Test
//     public void getRecruitTest() {
//         RecruitRequest recruitRequest = RecruitRequest.builder()
//                 .date("2024-04-26 12:34")
//                 .address("대전 유성구")
//                 .field("유성 풋살장")
//                 .info("인원 모집합니다.")
//                 .gender(Gender.valueOf("남성"))
//                 .indoor(Indoor.valueOf("실내"))
//                 .difficulty(Difficulty.valueOf("초급"))
//                 .currentPlayers(5)
//                 .allPlayers(6)
//                 .build();
//         recruitService.createRecruit(recruitRequest);

//         Long recruitId = 1L;
//         RecruitResponse recruitResponse = recruitService.getRecruit(recruitId);
//         System.out.println("recruit 정보: " + recruitResponse);
//     }

//     @Test
//     public void updateRecruitTest() {
//         // 오류 발생 원인 - MySQL에서는 save 시 id값이 없으면 Auto Increment로 생성됨
//         // Test 환경에서는 id값이 들어가지 않아 id는 null 상태로, 전체 조회는 가능하나 상세 조회가 불가능
//         RecruitRequest recruitRequest = RecruitRequest.builder()
//                 .date("2024-04-26 12:34")
//                 .address("대전 유성구")
//                 .field("유성 풋살장")
//                 .info("인원 모집합니다.")
//                 .gender(Gender.valueOf("남성"))
//                 .indoor(Indoor.valueOf("실내"))
//                 .difficulty(Difficulty.valueOf("초급"))
//                 .currentPlayers(5)
//                 .allPlayers(6)
//                 .build();
//         recruitService.createRecruit(recruitRequest);

//         Long recruitId = 1L;
//         RecruitResponse recruitResponse = recruitService.getRecruit(recruitId);
//         RecruitRequest updateRecruitRequest = RecruitRequest.builder()
//                 .date(recruitResponse.getDate())
//                 .address("대전 서구")
//                 .field("서구 풋살장")
//                 .info(recruitResponse.getInfo())
//                 .gender(recruitResponse.getGender())
//                 .indoor(recruitResponse.getIndoor())
//                 .difficulty(Difficulty.valueOf("중급"))
//                 .currentPlayers(recruitResponse.getCurrentPlayers())
//                 .allPlayers(recruitResponse.getAllPlayers())
//                 .build();
//         recruitService.updateRecruit(recruitId, updateRecruitRequest);
//         assertThat(recruitService.getRecruit(recruitId).getAddress()).isNotEqualTo(recruitResponse.getAddress());
//         assertThat(recruitService.getRecruit(recruitId).getAddress()).isEqualTo(updateRecruitRequest.getAddress());
//     }

//     @Test
//     public void deleteRecruitTest() {
//         RecruitRequest recruitRequest = RecruitRequest.builder()
//                 .date("2024-04-26 12:34")
//                 .address("대전 유성구")
//                 .field("유성 풋살장")
//                 .info("인원 모집합니다.")
//                 .gender(Gender.valueOf("남성"))
//                 .indoor(Indoor.valueOf("실내"))
//                 .difficulty(Difficulty.valueOf("초급"))
//                 .currentPlayers(5)
//                 .allPlayers(6)
//                 .build();
//         recruitService.createRecruit(recruitRequest);

//         Long recruitId = 1L;
//         recruitService.deleteRecruit(recruitId);
//         assertThat(recruitService.getRecruit(recruitId)).isNull();
//     }

// }

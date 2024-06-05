<!-- ![alt]() -->

# ⚽공차⚽

## 서비스 소개

<mark>풋살인들을 위한 웹앱 서비스</mark>

자신만의 <mark>**선수카드**</mark>를 만들어 <mark>**게임처럼**</mark>즐겨 보세요!

선수를 구하고, 매칭까지! <mark>**다같이 풋살**</mark>을 즐겨 보세요!

**선수모집과 매칭, 나만의 선수카드 까지**, 풋살인을 위한 공차 서비스
</br></br>

# 📙 기술 스택 📙

<center>

### **BackEnd**

  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
  <img src="https://img.shields.io/badge/spring Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> 
  <img src="https://img.shields.io/badge/spring security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> 
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

### **FrontEnd**

  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/zustand-3578E5?style=for-the-badge&logo=recoil&logoColor=white">

### **co-op**

  <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">
  <img src="https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white">
  <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jirasoftware&logoColor=white">

### **Infra**

  <img src="https://img.shields.io/badge/amazon ec2-EF9900?style=for-the-badge&logo=amazonec2&logoColor=black">
  <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=black">
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=black">

</center>

<br/><br/><br/>

## 🙋‍♂️ 기획 배경

### 1. 풋살을 하려는데, 인원이 부족하다!

### 2. 매칭 상대를 구하고 싶다!

### 3. 나의 성장을 확인하고 싶다!

### 4. 클럽에 가입해 함께 하고 싶다!

<br/><br/><br/>

## 핵심 기능

### 1. 풋살을 같이 즐길 인원을 모집

### 2. 상대팀과의 매칭 신청

### 3. 나만의 선수카드로 게임처럼 즐기는 스포츠

### 4. 클럽원들과 함께하는 경기

<br/><br/><br/>

# ✍ 설계 ✍

## ERD

![공차 erd](/etc/assets/공차%20수정%20ERD.png){: width="50%"}

<br/><br/>

## 시스템 아키텍쳐

![공차 아키텍쳐](/etc/assets/공차%20아키텍쳐.png){: width="50%"}

-   jenkins와 docker-compose를 활용해 배포를 했습니다.<br/><br/>
-   리버스 프록시, 로드 밸런싱, ssl 보안을 위해 Nginx를 사용했습니다.<br/><br/>
-   소셜 로그인을 위해 spring security, oauth2, jwt를 사용했습니다.<br/><br/>
-   jira의 이슈관리 등을 사용해 팀 프로젝트의 효율을 높였습니다.<br/><br/>

<br/><br/>

## API 설계

![api1](/etc/assets/공차API1.PNG){: width="50%"}
![api2](/etc/assets/공차API2.PNG){: width="50%"}
![api3](/etc/assets/공차API3.PNG){: width="50%"}

<br/><br/>

# 서비스 시연 사진

## 🏳️‍🌈 메인화면

![메인화면](/etc/assets/공차%20메인화면.gif)

<br/><br/>

<!-- ### 화면

![]()

> **설명**
>
> **설명**
>
> **설명** -->

<!-- <br/><br/> -->

## 매칭기능

### 매칭게시글

![매칭 게시글 조회](/etc/assets/매칭게시판조회.PNG){: width="30%"}

> **설명**
> 매칭 게시글을 조회합니다

![매칭 게시글 등록](/etc/assets/매칭게시글등록.PNG){: width="30%"}

> **설명**
> 매칭 게시글을 등록합니다

![매칭 게시글 상세조회](/etc/assets/매칭게시판상세조회.PNG){: width="30%"}

> **설명**
> 매칭하려는 팀의 정보와 해당 팀의 선수카드들을 볼 수 있습니다

## 마이 페이지

### 나의 팀 보기

![나의팀보기](/etc/assets/나의팀보기.PNG){: width="30%"}

### 나의 팀 전력보기

![나의팀전력보기](/etc/assets/나의팀전력보기.PNG){: width="30%"}

### 나의 팀 카드보기

![나의팀카드보기](/etc/assets/나의팀카드보기.PNG){: width="30%"}

### 내 경기내역 보기

![내경기내역](/etc/assets/내경기내역.PNG){: width="30%"}

### 내 카드 보기

![내카드보기](/etc/assets/내카드보기.PNG){: width="30%"}

### 신고하기

![신고하기](/etc/assets/신고하기.PNG){: width="30%"}

### 평가하기

![평가하기](/etc/assets/평가하기.PNG){: width="30%"}

<br/><br/><br/>

## 클럽

### 클럽 생성

![클럽 생성1](/etc/assets/클럽생성1.PNG)
![클럽 생성2](/etc/assets/클럽생성2.PNG)
![클럽 생성3](/etc/assets/클럽생성3.PNG)
![클럽 생성4](/etc/assets/클럽생성4.PNG)

> **설명**
> 클럽을 생성합니다.

### 클럽 조회

![클럽 조회](/etc/assets/클럽조회.PNG)
![클럽 상세 조회](/etc/assets/클럽상세조회.PNG)

<br/><br/>

### 클럽 가입 신청

![클럽 가입 신청](/etc/assets/클럽가입신청.PNG)

> **설명**
> 클럽 가입 신청을 합니다.

### 클럽 구성원 조회

![클럽 구성원 조회](/etc/assets/클럽구성원조회.PNG)

> **설명**
> 클럽 구성원의 선수카드를 조회 가능합니다.

<br/><br/><br/>

## 개발 기간 및 참여 인원+

## 👨‍💻 개발기간

### **2024.04.08 ~ 2024.05.17 ( 6주 )**

<br>

## ✨ 팀 소개 ✨

|   **Name**   |      정준수      |        우찬명        |  오치승  |       김현준        | 정인상  | 박하윤  |
| :----------: | :--------------: | :------------------: | :------: | :-----------------: | :-----: | :-----: |
| **Position** | Team <br> Leader | Frontend <br> Leader | Frontend | Backend <br> Leader | Backend | Backend |

<br>

# 향:해

`향수를 해석하다`  `향수 고수를 향해 가다`

![image-20220407220905087](./docs/images/image-20220407220905087.png)

**향기는 기억이다. 좋았던 그 시절, 그 공간, 그 사람에게로 빠르게 추억 시계를 되감아 주는 태엽 장치다.**

> 어떤 향수를 써야할지 모르겠나요? 나한테 딱 맞는 향수를 찾고 싶나요?<br>
>
> 나의 패션, 라이프스타일, 관심사에 따라 향수를 찾아보세요.<br>
> 향수만큼 취향을 타는 것도 없어요!
>
> ''향린이''에서 ''향잘알''을 **향해** Go Go !
> 
> [향해 서비스 바로가기](https://j6d104.p.ssafy.io/) 

<br><br>

## 목차
- [향:해](#향해)
  - [목차](#목차)
  - [서비스 소개](#서비스-소개)
    - [📋 기술 스택](#-기술-스택)
  - [프로젝트 파일 구조](#프로젝트-파일-구조)
  - [산출물](#산출물)
  - [결과물](#결과물)

- [📺 프로젝트 UCC](https://drive.google.com/drive/folders/19nDtGa64AudWwS5Fxjrk2entle-rCwhH)
  <br><br>

## 서비스 소개

1. 개발 기간 : 2022.02.28 ~ 2022.04.08 (총 6주)
   - Sub1 : 2022.02.28 ~ 2022.03.04
   - Sub2 : 2022.03.07 ~ 2022.03.18
   - Sub3 : 2022.03.21 ~ 2022.04.08
2. 인원 (총 6인)
	 - 김다은 (Alice) : 팀장, Back-end, Machine Learning, Spring Boot
	 - 김민성 (Scarlet) : Front-end 테크리더, React, TypeScript, Jest
	 - 김서인 (Wendy) : Front-end, Design, Test, UCC
	 - 김은준 (David) : Back-end 테크리더, DB 모델링, Spring Boot
	 - 문관필 (Woody) : Back-end, AWS EC2, Spring Boot
	 - 박창건 (Jackson) : Front-end, Design, Redux

<br><br>

### 📋 기술 스택

1. 이슈관리 : ![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
2. 형상관리 : ![GitLab](https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white)
3. 커뮤니케이션 : <img src ="https://img.shields.io/badge/Mattermost-blue">![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
4. 개발 환경
	- OS : ![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)10
	- IDE
	  -  <img src="https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white" alt="IntelliJ IDEA" style="zoom:80%;" />2021.3.1
	  -  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="Visual Studio Code" style="zoom:80%;" />1.66.0
	  - UI/UX : ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
	- Database : <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" alt="MariaDB" style="zoom:80%;" />
	- Server : ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
		-  ![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white) 
5. 상세 사용
	- Backend
		-  <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white" alt="Java" style="zoom:80%;" /> (Zulu Open JDK 11)
		-  <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" alt="Spring" style="zoom: 80%;" /> (Spring Boot 2.4.5)
		-  ![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white)7.4
		-  <img src ="https://img.shields.io/badge/Lombok-pink"></img>, <img src ="https://img.shields.io/badge/Swagger-green"></img>3.0.0, <img src ="https://img.shields.io/badge/Querydsl-JPA-pink"></img>
	- Frontend
		-   ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" style="zoom:80%;" />(ES6)
		-   <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" style="zoom:80%;" />![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
		-   ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
		-   ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
	-  AWS EC2
	  -   ![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white)
	  -   ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
	- Big Data/ML
	  -   <img src="https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white" alt="TensorFlow" style="zoom:80%;" />1.6.0
	  -   ![Anaconda](https://img.shields.io/badge/Anaconda-%2344A833.svg?style=for-the-badge&logo=anaconda&logoColor=white)
	  -   ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)3.6

<br><br>

## 프로젝트 파일 구조

- Backend

```
main
├─generated
├─java
│  └─com
│      └─idle
│          ├─api
│          │  ├─controller
│          │  ├─request
│          │  ├─response
│          │  └─service
│          ├─common
│          │  ├─jwt
│          │  │  └─dto
│          │  ├─oauth
│          │  │  └─dto
│          │  └─perfume
│          ├─config
│          └─db
│              ├─entity
│              └─repository
└─resources
   ├─keystore
   ├─perfume
   ├─pytorch
   ├─sql
   ├─static
   └─templates
```

- Frontend

```
components
├─bestProduct
├─find
├─landing
├─loginSignup
├─navigation
├─perfumeDetail
├─perfumeList
├─perfumeListHeader
├─perfumeSearchHeader
├─recentReviews
├─seasonalProduct
├─survey
│  ├─component
│  ├─slideNav
│  ├─survey1
│  ├─survey2
│  │  └─component
│  └─survey3
├─ui
│  ├─container
│  ├─homePageBanner
│  ├─perfumeListFilter
│  ├─productCard
│  ├─reviewCard
│  └─slider
└─userDetail
    └─main
        └─umodify
```

<br><br>

## 산출물
- [프로젝트 메모 및 공유 : Notion](https://www.notion.so/19a527a3f924466f9d3154969c78695c)
- [프로젝트 회의록](https://www.notion.so/f4eae148d8054706806e4ef2961e853d?v=3ab42d956592499eac3af07526819c7a)

<br>

- [프로젝트 컨벤션 목록](./docs/컨벤션목록.md)
- [기획서](./docs/기획서.md)
- [API Docs](https://www.notion.so/API-728975bfa8f44525ba1f2e844a89dd9f)
- [와이어 프레임](./docs/와이어프레임.md)
- [서비스 아키텍처](./docs/아키텍처.md)
- [기능 명세서](https://docs.google.com/spreadsheets/d/1lWWXGaQs7ZBLh66agpLzvLOfw_XZBKUen1zjCfxpx40/edit?usp=sharing)
- [데이터베이스:ERD](./docs/ERD.md)
- [시퀀스 다이어그램](./docs/시퀀스다이어그램.md)
- [Git 협업](./docs/Git-관리.md)
- [Jira 이슈관리](./docs/Jira-이슈관리.md)
- [AWS EC2 환경 설정](./docs/AWS-EC2.md)

<br><br>

## 결과물
- [포팅메뉴얼](./exec/포팅메뉴얼.md)
- [시연시나리오](./exec/시연시나리오.md)
- [중간발표자료](./pt/[중간발표]특화_PJT_구미1반_D104.pdf)
- [최종발표자료](./pt/[최종발표]특화_PJT_구미1반_D104.pdf)

- [Project Root로 돌아가기](../../README.md)
- [AWS EC2 Notion에서 보기](https://www.notion.so/CI-CD-39c99c2910284952858d892af72b2568) : Ubuntu, WSL2 설치 및 pem.key 세팅 등

<br><br>

# 🧑‍💻 How to Deploy

<br>

### 💡EC2 포트

- Jenkins : 8081
- Next.js : 3001
- REST API (Spring Boot) : 8443
- MariaDB : 3306
- 웹서버 기본 포트(nginx) : 80

<br><br>

### 🛠 Version

- IDE
  - BE : IntelliJ IDEA 2021.3.1
  - FE : VSCode 1.66.0
- BackEnd
  - Zulu Open JDK 11
  - Spring Boot
- FrontEnd
  - Next.js
- Database
  - MariaDB

<br><br>

### 💻 AWS EC2 접속 방법

```
ssh -i J6D104T.pem ubuntu@j6d104.p.ssafy.io
```

- 단, J6D104T.pem 파일이 사용자의 컴퓨터에 있어야 합니다.
- Git bash나 Putty를 사용해 원격 접속이 가능합니다.

<br><br>

### ⚙ PM2 설치

``` 
npm install pm2 -g
```

<br><br>

##### 추가적인 pm2 명령어

```
# pm2로 돌아가는 프로세스 목록 출력
pm2 list

# pm2 실행
pm2 start [process 이름]

# pm2 실행 중지
pm2 stop [process 이름 or id]

# pm2 재시작
pm2 restart [process 이름 or id]

# pm2 삭제
pm2 delete [process 이름 or id]

```

<br><br>

### ⚙ NGINX 설치

- Update

```java
apt-get update
```

- NGINX Install

```
apt-get install nginx
```

- 설치 후 서비스 상태 확인

```
systemctl status nginx
```

<br><br>

### ⚙ NGINX 설정

```java
sudo vim /etc/nginx/sites-available/default
```

```java
server {
	server_name j6d104.p.ssafy.io;

	location / {
	 proxy_pass http://localhost:3001;
	 proxy_set_header Host $host;
	}

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/j6d104.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/j6d104.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = j6d104.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

	listen 80;
	listen [::]:80;
    	return 404; # managed by Certbot

}
```

- j6d104.p.ssafy.io 로 접속 시 Next.js 서버인 3001번 Port로 연결합니다.
- HTTPS 적용을 위해 Certbot을 사용합니다.
- 만약, http://j6d104.p.ssafy.io로 접근 시 https로 들어갈 수 있도록 리다이렉트 해줍니다.

<br><br>

##### 추가적인 NGINX 명령어

```java
# 상태확인
systemctl status nginx

# 웹서버 정지(Stop)
sudo systemctl stop nginx

# 웹서버 시작(Start)
sudo systemctl start nginx

# 웹서버 재시작(restart)
sudo systemctl restart nginx

# 설정 리로드(reload)
sudo systemctl reload nginx
```

<br><br>

### ⚙ Docker로 Jenkins 설치

- Docker 설치에 선행되어야 하는 패키지 설치

```java
sudo apt-get update && sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
```

- Docker의 공식 GPG 키와 저장소를 추가

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

- Docker 설치

```
sudo apt-get update && sudo apt-get install docker
```

- 일반 사용자 권한으로 docker 명령어를 사용하기 위해서 아래의 명령어를 적용합니다.

```
sudo usermod -aG docker $USER
```

<br><br>

- Jenkins 이미지 다운로드

```
docker pull jenkins/jenkins:lts
```

- Jenkins 컨테이너 실행

```
docker run -d -p 8081:8080 -v /app/swim:/var/jenkins_home --name
swim_jenkins -u ubuntu jenkins/jenkins:lts
```

- 컨테이너 작동 확인

```
docker ps
```

- Jenkins 웹 페이지 초기 설정

  - http://도메인:8081로 접속하여 설정 웹페이지에 접속합니다.
  - 초기 비밀번호를 입력하란 창이 나오는데 초기 비밀번호는 아래의 명령어로 확인합니다.

  ```
  docker exec -it swim_jenkins bash
  
  cat /var/lib/secrets/initialAdminPassword
  ```


<br><br>

### ⚙ Jenkins 설정

- Jenkins Item 등록

  - 새로운 Item -> 원하는 Item name 입력 -> FreeStyle Project 클릭

- Gitlab, Nodejs, SSH 플러그인 설치

  - Jenkins 관리 -> 플러그인 관리 -> 설치가능 -> Publish Over SSH 검색 후 설치
  - Jenkins 관리 -> 플러그인 관리 -> 설치가능 -> Gitlab 검색 후 설치
  - Jenkins 관리 -> 플러그인 관리 -> 설치가능 -> Nodejs 검색 후 설치

- Publish Over SSH 설정

  - Jenkins 관리 -> 시스템 설정 -> Publish Over SSH 설정
  - key 항목에 EC2에 접근하기 위해 필요한 pem 파일 내용을 복사 / 붙여넣기
  - Name : 원하는 이름으로 입력
  - Hostname : 제공받은 도메인(j6d104.p.ssafy.io)
  - Username : ubuntu

- Gitlab 플러그인 설정

  - Jenkins 관리 -> 시스템 설정 -> Gitlab 설정
  - Connection name : 원하는 이름으로 설정
  - Gitlab host URL : Gitlab 사이트 주소(https://lab.ssafy.com)
  - Credentials : Gitlab API Token으로 인증

- NodeJS 플러그인 설정

  - Name : 원하는 이름으로 입력
  - Version : 프로젝트에 필요한 사양으로 선택(이 프로젝트에선 16.13.0 사용)

- Item 설정

  - 만든 Item -> 구성

  - 소스 코드 관리

    - Git 선택
    - Repository URL : 레포지토리 URL 입력
    - Credential : Username, Password로 인증
    - Branch Specifier : 배포하고 싶은 브랜치로 입력

  - 빌드 유발

    - Build when a change is pushed to GitLab ... 선택
    - 고급 -> Secret token은 Gitlab Webhook 설정 시 필요하므로 복사
      - Gitlab 로그인 -> setting -> integrations
      - URL : Jenkins 주소
      - Secret token : Jenkins에서 복사한 토큰 값

  - 빌드 환경

    - 프로젝트가 만약 Node를 사용한다면 Provide Node & npm bin/.. 선택
      - NodeJS Installation : NodeJS 플러그인에서 설정한 이름 체크

  - 빌드

    - Excute shell 선택

      - Frontend

        ```
        cd FE
        npm i
        npm run build:production
        ```

      - Backend

        ````
        cd BE
        chmod 755 gradlew
        ./gradlew clean build
        ````

    - 빌드 후 조치

      - Send build artififact over SSH 선택

        - Frontend

          - Name : Publish Over SSH 설정 시에 입력했던 이름 선택
          - Source files : FE/**
          - Exec command : cd /home/ubuntu/FE; pm2 restart next

        - Backend

          - Name : Publish Over SSH 설정 시에 입력했던 이름 선택
          - Source files : BE/**
          - Exec command : nohup java -jar /home/ubuntu/BE/build/libs/빌드산출물(이 프로젝트에선 idle-0.0.1-SNAPSHOT.jar)

          

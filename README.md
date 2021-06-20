# VocBackEnd
문의 등록/답변 시스템의 프론트엔드 프로젝트로 백엔드 프로젝트와(https://github.com/StarYankie/VocBackEnd) 사용 가능하도록 개발하였습니다.

## 문의 등록 및 답변 시나리오
1. 고객이 고객페이지 - 문의등록 메뉴에서 문의를 등록합니다.
2. 상담사가 관리자 페이지 - 미답변 목록조회 메뉴에서 답변이 이뤄지지 않은 문의를 접수합니다.
3. 상담사가 관리자페이지- 문의 답변 메뉴에서 본인이 접수한 문의에 대한 답변을 작성합니다. 

작성된 답변은 고객페이지 - 문의 목록 메뉴에서 본인이 작성한 문의를 포함한 모든 문의와 답변을 확인 가능합니다.

## 1. 프로젝트 구성
- 개발 환경
  - IDE: Visual Studio Code
  - OS: Windows 10
- Frontend
  - Vue.js 3
  - Webpack
  - Babel
  - EsLint
  - SCSS
- UnitTest
  - Jest

## 2. 실행 방법
NPM과 Git이 설치 된 환경의 터미널에서 아래 명령어를 순서대로 실행한다.
```
$ git clone https://github.com/StarYankie/VocFrontEnd.git
$ cd VocFrontEnd
$ npm install
$ npm run serve -- --port 8081
```
기본실행 URI : http://localhost:8081
고객 Home : http://localhost:8081/customer
상담사 Home : http://localhost:8081/manager

## 3. 문제 해결 전략

- 상담사용 페이지의(/manager 및 하위 URI) 경우 네비게이션 가드를 통해 로그인을 통해 얻은 jwt Token이 쿠키에 저장 되어있는 지 체크하여 비정상 접근을 막았다.
- 
- 문의 및 답변 등록시 validation method를 만들어 필수 입력 필드가 누락된 채로 등록되지 않도록 막았다.
- 
- 고객페이지 - 문의 목록 메뉴는 5초마다 미답변 문의를 조회하여 페이지에 업데이트 하도록 구현했다.
- 
- 문의 접수 메뉴의 레이스 컨디션 상황에서 폴링 간격 내에 두 상담사가 접수 시도하는 경우가 생길 수 있는데, 백엔드에서 PATCH Request를 받을 때 충돌을 처리한다.



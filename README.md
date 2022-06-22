# wanted_pre_onboarding ✨
프리온보딩 백엔드 코스 3차 선발과제 / 염하늘 /
- 최초 제출일 : 2022 / 06 / 15
- Framework : Nest js (v 8.2.3)
- Language : Node js (v17.9.1)
- volta 로 고정 세팅 (pin) 한 값 package.json에서 확인 가능합니다.

### 프로젝트 실행
    - git clone 'https://github.com/everchloe97/wanted_pre_onboarding'
    - cd wanted_pre_onboarding
    - yarn install
    - yarn start:dev 
    - app module > synchronize : true (db setting)

### swagger 문서 (api 명세화)
- localhost:8082/apiDoc (포트 번호는 env/development.env 의 SERVER_PORT) 에서 확인 가능합니다.
- api를 손쉽게 테스트할 수 있도록 세팅하였습니다.

### 요구사항 분석 및 구현 과정 ✨
- 기본적으로 entity는 회사 (Company) / 사용자 (User) / 지원(Application) 으로 구성하였으며
company - application - user 는 각각 One To Many / One To One 관계입니다.

0. 회사 정보를 등록합니다. (company)
1. 등록된 회사 정보의 id를 입력하여 채용 공고를 등록합니다. (posting)
2. 채용공고 id 로 수정합니다. 
3. 채용공고 id 로 삭제합니다.
4-1. 채용공고 및 회사 정보를 모두 조회할 수 있습니다.
4-2. 채용공고 검색 기능은 position (채용 포지션) 별로 검색되도록 설정하였습니다.
* 검색어 없이 보내면 전체 목록이 조회되며, 검색어에 해당하지 않는 키워드가 입력되면 빈 배열 형태로 return됩니다.
5. 상세 정보 보기
기존 채용공고에 content (채용 공고 상세 정보)를 추가하여 볼 수 있게끔 하였습니다.
6. 사용자는 채용공고에 1회만 지원 가능하기에 One To One 모델을 사용했습니다.
- 또한 어떤 사용자가 채용공고에 지원하면, 해당 사용자의 id로 채용 공고의 userId가 변경되어 지원자:채용공고 간 1:1 관계를 유지할 수 있도록 처리하였습니다.

## ETC
- 실 서비스에서와는 달리 회원가입/인증/로그인 등의 처리가 생략된 코드입니다.
- Request 와 Response는 되도록 명확히 구분되도록 작성하였습니다.
1. status Code : 200 / 201 에 해당하는 경우, 그 결과 값만 response로 보여집니다. 삭제의 경우 status code만 보여집니다.
2. error의 경우 어떤 error에 해당하는지 message도 함께 response로 확인 가능합니다.
3. error-type 등은 enum 처리하였습니다.
모두 http > dto > XXXX.dto 파일 형식으로 모듈화했습니다.

## commit convention
- ADD : 기능 신규 개발
- MODIFY : 기존 기능 수정
- REFACTOR : 기존 기능 개선
- FIX : 버그 픽스
- REMOVE : 불필요한 로직 제거
- COMMENT : 코드 리뷰 반영 결과

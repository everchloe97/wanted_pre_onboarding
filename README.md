# wanted_pre_onboarding
프리온보딩 백엔드 코스 3차 선발과제

Framework : Nest js (v 8.2.3)
Language : Node js (v17.9.1)
volta 로 고정 세팅 (pin) 한 값 package.json에서 확인 가능

### 실행
yarn install
yarn start:dev

### swagger 문서 (api 명세화)
localhost:8082/apiDoc (포트 번호는 env/development.env 의 SERVER_PORT)
api를 손쉽게 테스트할 수 있도록 세팅함.

### 요구사항 분석 및 구현 과정
- 기본적으로 entity는 회사 (Company) / 사용자 (User) 로 구성함.

- 4-2 채용공고 검색 기능은 position (채용 포지션) 별로 검색되도록 설정하였으며
주석 처리한 코드에는 그 외 회사명/국가/지역/사용기술도 검색 가능하도록 설정함.
검색어 없이 보내면 전체 목록이 조회되며, 검색어에 해당하지 않는 키워드가 입력되면 빈 배열 형태로 return됨.

- 단위 테스트는 현 제출 시점 6/15 22:30 기준 진행 X

- status Code : 200 / 201 에 해당하는 경우, 그 결과 값만 response로 보여지고 error의 경우 어떤 error에 해당하는지 message도 함께 response로 확인 가능함. 해당 response의 경우 자주 쓰이기에 http > dto > 0000.dto 파일 형식으로 모듈화함.


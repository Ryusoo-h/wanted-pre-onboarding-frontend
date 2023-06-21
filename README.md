# 프리온보딩 프론트엔드 인턴십 (6월)

지원자 : 류수현

제작 기간 : 2023.06.18 ~ 2023.06.21 (4일)

TODO LIST 과제를 하며 : 
<br>인턴십을 늦게 발견해 4일간 바짝 만들었습니다. 여유없이 제출해야하지만 수업 커리큘럼이 프론트엔드로서 알아야할 다양한 과정을 담고있어 수강하고 싶고, 인턴십을 통해 이번 여름엔 프론트엔드 신입으로 취업합격 하고싶어 신청했습니다

Todo List는 만들어본 적이 있어서 이번에는 사용하기 편하고 익숙한 모습으로 구현 해보고싶어 종이 메모장처럼 만들었습니다. 시간이 빠듯해 조금만 더 만들고 자야지 하면서 만들다 보면 재밌어서 정신차려보면 아침이 오더라구요. 아직 코드를 작성하며 어떻게 컴포넌트를 분리할지, 함수로 만들어 재사용하는게 좋을지 고민도 많이하고, 실수도 해서 해메이기도 하지만 그 과정을 통해 새로운 학습을 하고 문제를 해결하며 점차 원하는대로 만들어낼 수 있어 즐거웠습니다.

## 디자인

Figma로 디자인을 정리한 후 구현했습니다
 👉[디자인 보기](https://www.figma.com/file/X9dSzejU8tlSRuNXYt4yPG/6%EC%9B%94-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9?type=design&node-id=12%3A1030&t=44NaOT4ur7flB0RG-1)

<br>

## 실행방법
```
$ npm start
```
- 실행 영상
    ![실행](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/1dae3811-f8e1-4e06-a708-12532349a3c0)

<br>

## 기능구현 데모영상

<br>

### 👥 회원가입 / 로그인

<br>

- 로그인 페이지에서 회원가입 페이지로 이동

    ![01로그인에서 회원가입 페이지로 이동](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/5d627a1f-ade8-46dc-90a8-1b19215dd0e7)

<br>

- 유효성 검사 기능 구현

    - 조건
        - 이메일 조건 : `@` 포함
        - 비밀번호 조건 : 8자 이상
        - 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 `disabled` 속성을 부여

    - 회원가입 유효성 검사

        ![02-1회원가입 유효성 검사](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/00683a5d-9d0d-452b-b128-e3e30b5544ac)

    - 로그인 유효성 검사

        ![02-2로그인 유효성 검사](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/987f82de-8cb4-456c-aa33-eb56faf9509e)

<br>

- 회원가입 / 로그인 요청 구현

    - 회원가입 실패

        ![03-2회원가입 실패](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/cb631d5e-f8e8-48eb-a54e-d4a008502856)

    - 회원가입 성공
    <br> : button클릭 → 회원가입 진행 → 회원가입 정상 완료 → `/signin` 경로로 이동

        ![03-1회원가입 성공](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/ee29c8f6-73f5-400f-bf5d-e08f06f37c8b)
    
    - 로그인 실패

        ![04-2로그인 실패](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/2b9d808b-c076-4bd3-9943-f5ecbe32c58d)

    - 로그인 성공
    <br> button클릭 → 로그인 진행 → 로그인 정상 완료 → `/todo` 경로로 이동

        ![04-1로그인 성공](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/bdbb347d-afd0-488a-9b59-362b22bb5a79)

- 로그인 여부에 따른 리다이렉트 처리 구현
    
    - 토큰이 있을때
    <br>`/signin` 또는 `/signup` 페이지에 접속 시 ⇒ `/todo` 경로로 리다이렉트

        ![06-1토큰이있을때](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/c6b4a361-416c-42b7-804e-237aa581b8cf)
    
    - 토큰이 없을때
    <br>`/todo` 페이지에 접속 시 ⇒ `/signin` 경로로 리다이렉트

        ![06-2토큰이 없을때](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/64388673-2ac7-4e65-b4bd-afb95c20df33)

<br>
<hr>
<br>

### ✅ TODO LIST

- 새 TODO 입력 구현

    ![07-1입력](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/c71e3938-b490-46fd-85f3-4b7fe2b2e48c)

- 완료 여부 수정 구현

    ![07-2 완료여부구현](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/a964336c-5b6c-4fe2-9bfd-e74ad96eb69d)

- 수정 모드 구현
    - "수정 버튼" 클릭 -> 수정모드 활성화
    - "수정 취소 버튼" 클릭 -> 수정 취소 (수정내용 초기화, 수정모드 비활성화)
    - "수정 확인 버튼" 클릭 -> 수정 업데이트
    
    ![수정모드 테스트](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/a6956d57-4b56-4488-9670-ff82ed2ec9b9)
    
    ![수정모드 테스트2](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/00320ce5-e878-4331-ac93-3fc7f19efe4c)

- 삭제 기능 구현
    - 삭제도 수정처럼 삭제 모드로 구현하여 사용자가 확인후 삭제할 수 있도록 했습니다.

    ![삭제모드 테스트](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/2b7f8928-0e73-4fc5-84bf-c807ad85fca5)


### 추가 구현
[구현 목록 노션 기록](https://www.notion.so/ryu-soohyeon/6-db4198b4cd8041eea643617c9ab407c8?pvs=4#bec260a251b24e3aba5b0335c18ab309)


- 리팩토링
    - [x] 커스텀훅으로 로직과 뷰 분리
    - [ ] 커스텀훅으로 재사용성 고려하여 수정

- Todo List 정렬 구현
    - [x] 최근 작성순 / 오래된순 토글 버튼 구현하기

        ![최신순정렬](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/6feceb67-fde1-4957-8929-e424f789d30a)
        ![최신순정렬-스크롤이동](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/85c36c92-6529-452a-8615-7d78df483bed)

    - [ ] 체크한것만 보기, 체크 안한것만 보기 버튼 구현하기

- [x] 만들지않은 페이지로 이동했을때, 404띄우기

    ![404페이지 구현](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/2ee86e68-b547-441b-ac2d-ba6b809275d4)

- [ ] Todo list 스크롤 UI 수정
    - 스크롤 가능한 방향에 그림자 표시하기
- [ ] 회원가입 페이지 → 로그인 페이지 으로 가는 버튼 만들기
- [ ] 시계 구현하기
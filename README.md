# 프리온보딩 프론트엔드 인턴십 (6월)

지원자 : 류수현

- TODO LIST 과제를 하며
    <br>인턴십을 늦게 발견해 3일간 바짝 만들었습니다. 가산점을 모두 놓치고 여유없이 제출해야하지만 수업 커리큘럼이 프론트엔드 전과정을 담고있어 듣고싶어 신청했습니다.
    <br>Todo List는 만들어본 적이 있어 좀 새로운 디자인을 해보고싶어 재밌게 만들었습니다. 시간이 빠듯해 조금만 더 만들고 자야지 하면서 만들다 보면 재밌어서 정신차려보면 아침이 오더라구요. 아직 코드를 작성하며 고민도 많이하고, 실수도 해서 해메이기도 하지만 점차 원하는대로 만들어지는걸 보면 즐거워서 더 욕심부리게 됩니다. 더 좋은 방법으로 더 많은 기능을 만들기 위해 좋아하는일을 제 직업으로 만들기 위해 이번 인턴십으로 이번 여름안에 프론트엔드 신입 취업합격 하고싶습니다.


## 디자인

Figma로 디자인을 정리한 후 구현했습니다
[디자인 보기](https://www.figma.com/file/X9dSzejU8tlSRuNXYt4yPG/6%EC%9B%94-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9?type=design&node-id=12%3A1030&t=44NaOT4ur7flB0RG-1)

<br>

## 기능구현

<br>

### 👥 회원가입 / 로그인

<br>

- 로그인 페이지에서 회원가입 페이지로 이동

    ![01로그인에서 회원가입 페이지로 이동](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/5d627a1f-ade8-46dc-90a8-1b19215dd0e7)

<br>

- 유효성 검사 기능 구현

    - 조건
        - 이메일 조건 : @ 포함
        - 비밀번호 조건 : 8자 이상
        - 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여

    - 회원가입 유효성 검사

        ![02-1회원가입 유효성 검사](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/00683a5d-9d0d-452b-b128-e3e30b5544ac)

    - 로그인 유효성 검사

        ![02-2로그인 유효성 검사](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/987f82de-8cb4-456c-aa33-eb56faf9509e)

<br>

- 회원가입 / 로그인 요청 구현

    - 회원가입 실패

        ![03-2회원가입 실패](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/cb631d5e-f8e8-48eb-a54e-d4a008502856)

    - 회원가입 성공
    <br> : button클릭 → 회원가입 진행 → 회원가입 정상 완료 → /signin 경로로 이동

        ![03-1회원가입 성공](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/ee29c8f6-73f5-400f-bf5d-e08f06f37c8b)
    
    - 로그인 실패

        ![04-2로그인 실패](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/2b9d808b-c076-4bd3-9943-f5ecbe32c58d)

    - 로그인 성공
    <br> button클릭 → 로그인 진행 → 로그인 정상 완료 → /todo 경로로 이동

        ![04-1로그인 성공](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/bdbb347d-afd0-488a-9b59-362b22bb5a79)

- 로그인 여부에 따른 리다이렉트 처리 구현
    
    - 토큰이 있을때
    <br>/signin 또는 /signup 페이지에 접속 시 ⇒ /todo 경로로 리다이렉트

        ![06-1토큰이있을때](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/c6b4a361-416c-42b7-804e-237aa581b8cf)
    
    - 토큰이 없을때
    <br>/todo페이지에 접속 시 ⇒ /signin 경로로 리다이렉트

        ![06-2토큰이 없을때](https://github.com/Ryusoo-h/wanted-pre-onboarding-frontend/assets/67295471/64388673-2ac7-4e65-b4bd-afb95c20df33)

<br>
<hr>
<br>

### ✅ 투두 리스트


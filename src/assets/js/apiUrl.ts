const apiUrl = {
  feedList: "/api/v1/posts", // 작품리스트
  signUp: "/api/v1/users/sign_up", // 회원가입
  signIn: "/api/v1/users/sign_in", // 로그인
  withdraw: "/api/v1/users/withdraw", // 회원탈퇴
  checkNickname: "/api/v1/users/check_username", // 유저닉네임체크
  profileImageChange: "/api/v1/users/image_profile", // 프로필이미지
  profileNicknameChange: "/api/v1/users/username", // 닉네임수정
  getMyInfo: "/api/v1/users/me", // 마이페이지 조회
  register: "/api/v1/posts", // 작품등록
  tagSearch: "/api/v1/tags", // 태그검색
};
export default apiUrl;

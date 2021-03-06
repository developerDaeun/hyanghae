/**
*
* UserServiceImpl
* 회원가입, 아이디 중복 검사, 닉네임 중복 검사, 비밀번호 암호화, 로그인 함수 생성
*
* @author Alice, David, Woody
* @version 1.0.0
* 생성일 2022-03-10
* 마지막 수정일 2022-03-21
**/
package com.idle.api.service;

import com.idle.api.request.*;
import com.idle.db.entity.LikePerfume;
import com.idle.db.entity.User;
import com.idle.db.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@Service("userService")
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    /* Alice */
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender javaMailSender;

    /* Alice,David : 회원가입 */
    @Override
    public String insertUser(UserSignUpRequest userSignUpRequest) {
        User user = userSignUpRequest.toEntity();
        String userPw = passwordEncode(user.getUserPw());   // 비밀번호 인코딩
        user.setUserPw(userPw);    // Security ver5 부터 명칭 해줘야함
        user.setUserType("local");
        userRepository.save(user);
        if(user.getUserId().equals("") || user.getUserPw().equals("") ||
        user.getUserNickname().equals("") || user.getUserEmail().equals(""))
            return "fail";  // 아이디, 비밀번ㅇ호, 닉네임, 이메일 중 하나라도 없으면 회원가입 실패
        return "success";
    }

    /* Alice : 아이디 중복 검사 */
    @Override
    public String checkDuplicateUserId(String userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        if(user.isPresent()){
            return "fail";
        }
        return "success";
    }

    /* Alice : 닉네임 중복 검사 */
    @Override
    public String checkDuplicateUserNickname(String userNickname) {
        Optional<User> user = userRepository.findByUserNickname(userNickname);
        if(user.isPresent()){
            return "fail";
        }
        return "success";
    }

    /* Alice : 이메일 인증번호 전송 */
    @Override
    public String sendUserEmailNumber(String userEmail){
        // 이메일 인증번호 생성
        String tempEmailNumber = getRamdomNumber(10);

        // 수신 대상을 담을 ArrayList 생성
        ArrayList<String> toUserList = new ArrayList<>();

        // 수신 대상 추가
        toUserList.add(userEmail);

        // 수신 대상 개수
        int toUserSize = toUserList.size();

        // SimpleMailMessage (단순 텍스트 구성 메일 메시지 생성할 때 이용)
        SimpleMailMessage simpleMessage = new SimpleMailMessage();

        // 수신자 설정
        simpleMessage.setTo((String[]) toUserList.toArray(new String[toUserSize]));

        // 메일 제목
        simpleMessage.setSubject("[이메일 인증번호 안내] 향:해 서비스입니다.");

        // 메일 내용
        simpleMessage.setText("인증번호는 " + tempEmailNumber + " 입니다.");

        // 메일 발송
        javaMailSender.send(simpleMessage);

        return tempEmailNumber;
    }

    /* Alice : 인증번호 생성 */
    public static String getRamdomNumber(int len) {
        char[] charSet = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
        int idx = 0;
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < len; i++) {
            idx = (int) (charSet.length * Math.random()); // 36 * 생성된 난수를 Int로 추출 (소숫점제거)
            sb.append(charSet[idx]);
        }
        return sb.toString();
    }

    /* Woody */
    @Override
    public boolean checkUserPw(User user, String userPw) {

        if(passwordEncoder.matches(userPw, user.getUserPw())) {
            return true;
        }
        return false;
    }

    /* David */
    @Override
    public User getUserByUserId(String userId) {
        User user = userRepository.findByUserId(userId).get();
        return user;
    }

    /* Alice : 로그인 */
    @Override
    public String login(UserLoginRequest userLoginRequest) {
        Optional<User> user = userRepository.findByUserId(userLoginRequest.getUserId());
        if(!user.isPresent()){
            return "fail";
        }
        if (!passwordEncoder.matches(userLoginRequest.getUserPw(), user.get().getUserPw())) {
            return "fail";
        }
        System.out.println("유저에게 받은 비밀번호 : " + userLoginRequest.getUserPw());
        System.out.println("DB에 있는 암호화된 비밀번호 : " + user.get().getUserPw());
        return "success";
    }

    /* Alice */
    @DisplayName("패스워드 암호화")
    public String passwordEncode(String userPw){
        String encodedPassword = passwordEncoder.encode(userPw);

        assertAll(
                () -> assertNotEquals(userPw, encodedPassword),
                () -> assertTrue(passwordEncoder.matches(userPw, encodedPassword))
        );
        return encodedPassword;
    }

    /* David : 아이디를 이메일로 전송 */
    @Override
    public List<User> findUserIdByUserEmail(String userEmail) {

        List<User> user = userRepository.findByUserEmailAndUserType(userEmail,"local");
        return user;
    }

    /* Woody : 회원 정보 수정 */
    @Override
    public void updateUser(UserUpdateRequest userUpdateReq, User user) {
        user.setUserPw(passwordEncoder.encode(userUpdateReq.getUserPw()));
        user.setUserNickname(userUpdateReq.getUserNickname());

        userRepository.save(user);
    }

    /* David : 회원 닉네임 수정 */
    @Override
    public String updateUserNickname(UserNicknameUpdateRequest userNicknameUpdateRequest, User user) {
        String res = checkDuplicateUserNickname(userNicknameUpdateRequest.getUserNickname());
        if(res.equals("success")){
            user.setUserNickname(userNicknameUpdateRequest.getUserNickname());

            userRepository.save(user);
            return "success";
        }else{
            return "fail";
        }
    }

    /* David : 회원 비밀번호 수정 */
    @Override
    public void updateUserPw(UserCheckPwRequest userCheckPwRequest, User user) {
        user.setUserPw(passwordEncoder.encode(userCheckPwRequest.getUserPw()));

        userRepository.save(user);
    }

    /* Woody : 회원 탈퇴 */
    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    /* Alice : 비밀번호 찾기 */
    @Override
    public String findUserPw(UserPwRequest userPwRequest){
        
        String userId = userPwRequest.getUserId();
        String userEmail = userPwRequest.getUserEmail();
        User user = userRepository.findByUserId(userId).get();
        
        // 아이디나 이메일이 맞지 않으면 fail 리턴
        if(!userId.equals(user.getUserId()) || !userEmail.equals(user.getUserEmail()))
            return "fail";

        // 새 비밀번호 생성
        String tempPw = getRamdomNumber(10);

        // 새 비밀번호 DB에 저장
        user.setUserPw(passwordEncoder.encode(tempPw));
        userRepository.save(user);

        // 수신 대상을 담을 ArrayList 생성
        ArrayList<String> toUserList = new ArrayList<>();

        // 수신 대상 추가
        toUserList.add(userEmail);

        // 수신 대상 개수
        int toUserSize = toUserList.size();

        // SimpleMailMessage (단순 텍스트 구성 메일 메시지 생성할 때 이용)
        SimpleMailMessage simpleMessage = new SimpleMailMessage();

        // 수신자 설정
        simpleMessage.setTo((String[]) toUserList.toArray(new String[toUserSize]));

        // 메일 제목
        simpleMessage.setSubject("[이메일 인증번호 안내] 향:해 서비스입니다.");

        // 메일 내용
        simpleMessage.setText("새 비밀번호는 " + tempPw + " 입니다.");

        // 메일 발송
        javaMailSender.send(simpleMessage);

        return "success";
    }

    @Override
    public Set<LikePerfume> getLikePerfumeList(User user) {
        User user1 = userRepository.findById(user.getUserSeq()).get();
        Set<LikePerfume> likePerfumeSet = user1.getLikePerfumeList();
        return likePerfumeSet;
    }
}
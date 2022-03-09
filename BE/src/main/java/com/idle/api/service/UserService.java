/**
*
* UserService
* 회원가입 insertUser 함수 생성
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-08
* 마지막 수정일 2022-03-08
**/
package com.idle.api.service;

import com.idle.api.request.UserSignUpRequest;


public interface UserService {
    String insertUser(UserSignUpRequest userSignUpRequest);
}
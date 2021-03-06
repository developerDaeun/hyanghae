/*
회원가입
회원가입 폼, 회원 가입 api 연결 중
@author Wendy
@version 1.0.0
생성일 2022-03-07
마지막 수정일 2022-03-14
*/

import type { NextPage } from "next";
import SignupComponent from "../components/loginSignup/signupComponent";
import Head from "next/head";

const Signup: NextPage = () => {
  return (
    <>
      <Head>
        <title>회원가입</title>
        <link rel="icon" href="/logos/iconLogo.png" />
      </Head>
      <SignupComponent />;
    </>
  );
};

export default Signup;

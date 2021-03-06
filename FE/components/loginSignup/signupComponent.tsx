import React from "react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import styles from "./loginSignup.module.css";
import {
  apiSignup,
  apiCheckId,
  apiCheckNickname,
  apiSendEmailNum,
} from "../../api/user";
import Image from "next/image";
import { useAppSelector } from "../../reducers/hooks";
import Link from "next/link";

interface SignupInput {
  result: string;
  id: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
  emailPartOne: string;
  emailPartTwo: string;
  validationCode: string;
}
function SignupComponent() {
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNicknameChecked, setisNicknameChecked] = useState(false);
  const [isEmailClicked, setisEmailClicked] = useState(false);
  const [isEmailChecked, setisEmailChecked] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const router = useRouter();
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<SignupInput>({
    mode: "onChange",
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, []);

  const onValidSubmit: SubmitHandler<SignupInput> = async () => {
    const {
      id,
      password,
      passwordConfirmation,
      nickname,
      emailPartOne,
      emailPartTwo,
    } = getValues();

    if (isIdChecked) {
      if (isNicknameChecked) {
        if (password === passwordConfirmation) {
          try {
            await apiSignup(
              `${emailPartOne}@${emailPartTwo}`,
              id,
              nickname,
              password
            );
            router.push("/login");
          } catch (e) {
            const error = e as AxiosError;
            if (error?.response?.status === 401) {
              setError("result", {
                message: "???????????? ????????? ????????? ????????????.",
              });
            }
          }
        } else {
          setError("passwordConfirmation", {
            message: "??????????????? ???????????? ????????????. ?????? ??????????????????.",
          });
        }
      } else {
        setError("result", {
          message: "????????? ?????? ????????? ????????????!",
        });
      }
    } else {
      setError("result", {
        message: "????????? ?????? ????????? ????????????!",
      });
    }
  };

  const idValidation = () => {
    const { id } = getValues();

    try {
      apiCheckId(id)
        .then((res: AxiosResponse) => {
          setIsIdChecked(true);
        })
        .catch((err) => {
          setError("id", { message: "?????? ???????????? ?????? ???????????????." });
        });
    } catch (e) {
      const error = e as AxiosError;
    }
  };

  const nicknameValidation = () => {
    const { nickname } = getValues();

    try {
      apiCheckNickname(nickname)
        .then((res) => {
          setisNicknameChecked(true);
        })
        .catch((err) => {
          setError("nickname", { message: "?????? ???????????? ?????? ???????????????." });
        });
    } catch (e) {
      const error = e as AxiosError;
    }
  };

  const submitEmail = () => {
    const { emailPartOne, emailPartTwo } = getValues();

    if (emailPartOne) {
      setisEmailClicked(true);
      apiSendEmailNum(`${emailPartOne}@${emailPartTwo}`)
        .then((res) => {
          setConfirmationNumber(res.data.number);
        })
        .catch(console.log);
    } else {
      alert("???????????? ???????????????.");
    }
  };

  const checkValidationCode = () => {
    const { validationCode } = getValues();
    if (confirmationNumber === validationCode) {
      setisEmailChecked(true);
    } else {
      setisEmailChecked(false);
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  const resultError = errors.result?.message ? (
    <div className={`${styles.message} ${styles.resultMessage}`} role="alert">
      {errors.result?.message}
    </div>
  ) : (
    <div />
  );

  const idError = errors.id?.message ? (
    <div className={`${styles.message} ${styles.idMessage}`} role="alert">
      {errors.id?.message}
    </div>
  ) : (
    <div />
  );
  const pwError = errors.password?.message ? (
    <div className={`${styles.message} ${styles.pwMessage}`} role="alert">
      {errors.password?.message}
    </div>
  ) : (
    <div />
  );
  const pwConfirmationError = errors.passwordConfirmation?.message ? (
    <div
      className={`${styles.message} ${styles.pwConfirmationMessage}`}
      role="alert"
    >
      {errors.passwordConfirmation?.message}
    </div>
  ) : (
    <div />
  );

  const nicknameError = errors.nickname?.message ? (
    <div className={`${styles.message} ${styles.nicknameMessage}`} role="alert">
      {errors.nickname?.message}
    </div>
  ) : (
    <div />
  );
  const emailPartOneError = errors.emailPartOne?.message ? (
    <div className={`${styles.message} ${styles.emailOneMessage}`} role="alert">
      {errors.emailPartOne?.message}
    </div>
  ) : (
    <div />
  );

  const emailPartTwoError = errors.emailPartTwo?.message ? (
    <div className={`${styles.message} ${styles.emailTwoMessage}`} role="alert">
      {errors.emailPartTwo?.message}
    </div>
  ) : (
    <div />
  );
  const validationError = errors.validationCode?.message ? (
    <div className={`${styles.message} ${styles.validationCode}`} role="alert">
      {errors.validationCode?.message}
    </div>
  ) : (
    <div />
  );
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper2}>
        <Image
          className={styles.logoImage}
          alt="logo"
          src="/logo.jpg"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h1 className={styles.title}>????????????</h1>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit(onValidSubmit)}>
          {resultError}
          <label htmlFor="id">
            <input
              onKeyUp={() => {
                setIsIdChecked(false);
              }}
              className={`${styles.smallInputForm} ${styles.idForm}`}
              {...register("id", {
                required: "???????????? ???????????????.",
                pattern: {
                  value: /^[a-z0-9]+$/,
                  message:
                    "????????? ????????? ???????????????. ??????????????? ????????? ???????????????.",
                },
                minLength: {
                  value: 8,
                  message: "???????????? 8??? ??????, 16??? ???????????????.",
                },
                maxLength: {
                  value: 16,
                  message: "???????????? 8??? ??????, 16??? ???????????????.",
                },
              })}
              type="text"
              placeholder="ID"
              onInput={clearLoginError}
              aria-label="id"
            />
            <span>
              <button
                type="button"
                onClick={idValidation}
                className={styles.smallInputBtn}
              >
                {isIdChecked ? "??????" : " ??????"}
              </button>
            </span>
          </label>
          {idError}
          <label htmlFor="password">
            <input
              className={`${styles.inputForm} ${styles.pwForm}`}
              {...register("password", {
                required: "??????????????? ???????????????.",
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message:
                    "????????? ???????????? ???????????????. ??????, ????????? ???????????????.",
                },
                minLength: {
                  value: 8,
                  message: "??????????????? 8??? ??????, 16??? ???????????????.",
                },
                maxLength: {
                  value: 16,
                  message: "??????????????? 8??? ??????, 16??? ???????????????.",
                },
              })}
              type="password"
              placeholder="Password"
              onInput={clearLoginError}
              aria-label="password"
            />
          </label>
          {pwError}
          <label htmlFor="passwordConfirmation">
            <input
              className={`${styles.inputForm} ${styles.pwConfirmationForm}`}
              {...register("passwordConfirmation", {
                required: "??????????????? ???????????????.",
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message:
                    "????????? ???????????? ???????????????. ??????, ????????? ???????????????.",
                },
                minLength: {
                  value: 8,
                  message: "??????????????? 8??? ??????, 16??? ???????????????.",
                },
                maxLength: {
                  value: 16,
                  message: "??????????????? 8??? ??????, 16??? ???????????????.",
                },
              })}
              type="password"
              placeholder="??????????????? ?????? ?????? ??????????????????"
              onInput={clearLoginError}
              aria-label="passwordConfirmation"
            />
          </label>
          {pwConfirmationError}
          <label htmlFor="nickname">
            <input
              className={`${styles.smallInputForm} ${styles.nicknameForm}`}
              {...register("nickname", {
                required: "???????????? ???????????????.",
                minLength: {
                  value: 1,
                  message: "???????????? 1?????? ?????? 10?????? ???????????????.",
                },
                maxLength: {
                  value: 10,
                  message: "???????????? 1?????? ?????? 10?????? ???????????????.",
                },
              })}
              type="text"
              placeholder="?????????"
              onInput={clearLoginError}
              aria-label="nickname"
            />
            <span>
              <button
                type="button"
                onClick={nicknameValidation}
                className={styles.smallInputBtn}
              >
                {isNicknameChecked ? "??????" : " ??????"}
              </button>
            </span>
          </label>
          {nicknameError}
          <label htmlFor="emailPartOne">
            <input
              className={`${styles.emailInputForm} ${styles.emailOneForm}`}
              {...register("emailPartOne", {
                required: "???????????? ???????????????.",
                minLength: {
                  value: 1,
                  message: "???????????? 1?????? ???????????????.",
                },
              })}
              type="text"
              placeholder="?????????"
              onInput={clearLoginError}
              aria-label="emailPartOne"
            />
          </label>
          <span className={styles.guide}>@</span>

          <select
            className={`${styles.selectInput} ${styles.mailForm}`}
            {...register("emailPartTwo")}
          >
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="kakao.com">kakao.com</option>
            <option value="hanmail.net">hanmail.net</option>
            <option value="daum.net">daum.net</option>
          </select>
          <span>
            {isEmailClicked && (
              <button type="button" className={styles.smallInputBtnNo}>
                ?????????
              </button>
            )}
            {!isEmailClicked && (
              <button
                onClick={submitEmail}
                type="button"
                className={styles.smallInputBtn}
              >
                ?????????
              </button>
            )}
          </span>

          {emailPartOneError}
          {emailPartTwoError}
          {isEmailClicked && (
            <div>
              <label htmlFor="validationInput">
                <input
                  className={`${styles.smallInputForm} ${styles.validationForm}`}
                  {...register("validationCode", {
                    required: "?????? ????????? ???????????????.",
                    minLength: {
                      value: 1,
                      message: "??????????????? 1?????? ???????????????",
                    },
                  })}
                  type="text"
                  placeholder="??????????????? ???????????????."
                  onInput={clearLoginError}
                  aria-label="code"
                />
              </label>
              <button
                onClick={checkValidationCode}
                type="button"
                className={styles.smallInputBtn}
              >
                {isEmailChecked ? "??????" : " ??????"}
              </button>
            </div>
          )}

          {validationError}
          <button
            className={`${styles.inputForm} ${styles.inputBtn} ${
              isValid &&
              isIdChecked &&
              isNicknameChecked &&
              isEmailChecked &&
              styles.canClick
            }`}
            type="submit"
            value="????????????"
            disabled={!isValid}
            aria-label="signupBtn"
          >
            ????????????
          </button>
        </form>
        <Link href="/home">
          <p className={styles.guide}>?????? ?????? ?????????.</p>
        </Link>
      </div>
    </div>
  );
}

export default SignupComponent;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios, customAxiosWithoutRI } from "../utils/customAxios";

const { atom, useRecoilState } = require("recoil");

const credentialsUserState = atom({
  key: "credentialsUserState",
  default: null,
});
export const useAuthEffect = () => {
  const [credentialsUser, setCredentialsUser] =
    useRecoilState(credentialsUserState);

  useEffect(async () => {
    console.debug("회원 로그인 이펙트 실행");
    const { data } = await customAxios({
      method: "get",
      url: "/users/me",
    }).catch(() => {
      setCredentialsUser(null);

      throw new Error("유저 데이터 없음.");
    });

    setCredentialsUser(data);
  }, []);

  return {
    credentialsUser,
  };
};
export default function useUser() {
  const [credentialsUser, setCredentialsUser] =
    useRecoilState(credentialsUserState);
  const navigate = useNavigate();

  // 토큰으로 user 정보 가져오기 !
  const getCredentialUser = async () => {
    const { data } = await customAxios({
      method: "get",
      url: "/users/me", // 오타 주의보 ^^
    });

    setCredentialsUser(data);
  };

  // 회원가입하기 !
  const signUp = async (form) => {
    const result = await customAxiosWithoutRI({
      method: "post",
      url: "/users",
      data: form,
    });
    window.alert("회원가입 완료!!");
    navigate("/login");
  };

  // 로그인 !
  const signIn = async (form) => {
    console.log("signIn");
    const { data } = await customAxiosWithoutRI({
      method: "post",
      url: "/users/login",
      data: form,
    });
    const tokens = JSON.stringify(data);
    window.localStorage.setItem("tokens", tokens);
    await getCredentialUser();
    window.alert("로그인 성공! 🐥");
  };
  const signOut = () => {
    window.alert("성공적으로 로그아웃하였습니다.");
    window.localStorage.removeItem("tokens");
    setCredentialsUser(null);
    navigate("/login");
  };

  return {
    credentialsUser,
    signUp,
    signIn,
    signOut,
  };
}

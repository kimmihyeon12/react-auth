import { Header } from "../containers";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";
import withPublic from "../HOC/withPublic";
function SignInPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { signIn } = useUser();
  return (
    <div className="flex flex-col">
      <Header />
      <h2>로그인 페이지</h2>
      <form onSubmit={handleSubmit(signIn)}>
        <label className="flex flex-col">
          <span className="text-xs">이메일</span>
          <input
            className="border w-44"
            {...register("email", {
              required: "이메일은 필수값입니다.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일형식이 아닙니다.",
              },
            })}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-xs">비밀번호</span>
          <input
            className="border w-44"
            {...register("password", {
              required: "비밀번호는 필수값입니다.",
              pattern: {
                value:
                  /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                message: "특수문자 / 문자 / 숫자 포함 형태의 8~15자리",
              },
            })}
            type="password"
          />
        </label>
        <button>로그인</button>
      </form>
    </div>
  );
}

export default withPublic(SignInPage);

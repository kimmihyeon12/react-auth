import { Header } from "../containers";

function SignInPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <h2>로그인 페이지</h2>
      <form>
        <label className="flex flex-col">
          <span className="text-xs">이메일</span>
          <input className="border w-44" />
        </label>
        <label className="flex flex-col">
          <span className="text-xs">비밀번호</span>
          <input className="border w-44" />
        </label>
        <button>로그인</button>
      </form>
    </div>
  );
}

export default SignInPage;

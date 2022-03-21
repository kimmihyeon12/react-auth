import { Header } from "../containers";

function SignUpPage() {
  return (
    <div>
      <Header />
      <h2>회원가입 페이지</h2>
      <form>
        <label className="flex flex-col">
          <span className="text-xs">이메일</span>
          <input className="border w-44" />
        </label>
        <label className="flex flex-col">
          <span className="text-xs">비밀번호</span>
          <input className="border w-44" />
        </label>
        <button>회원가입</button>
      </form>
    </div>
  );
}

export default SignUpPage;

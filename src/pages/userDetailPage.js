import { Header } from "../containers";
import withPrivate from "../HOC/withPrivate";

function UserDetailPage() {
  return (
    <div className="border">
      <Header />
      <h2>회원 상세페이지</h2>
      <button>로그아웃</button>
    </div>
  );
}

export default withPrivate(UserDetailPage);

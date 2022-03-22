import axios from "axios";
//
const instance1 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
const instance2 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
// 인터셉터는 1.요청하기 직전, 2. 응답을 받고 then, catch로 처리 직전에 가로챌 수 있습니다.
instance1.interceptors.request.use(
  async (config) => {
    const tokensStringObj = window.localStorage.getItem("tokens");
    console.log(`tokenStringObj ${tokensStringObj}`);
    const tokens = JSON.parse(tokensStringObj);
    const { act, actExp, rft } = tokens;
    config.headers["Authorization"] = `Bearer ${act}`;
    const msActExp = Number(String(actExp) + "000"); //엑세스토큰 유효시간
    const limitExp = new Date().getTime();
    // 엑세스토큰이 만료되면
    if (msActExp < limitExp && rft) {
      //리프레쉬 토큰으로 엑세스토큰 재요청!
      console.debug("토큰 연장 요청");
      const { data } = await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/users/refresh",
        headers: {
          Authorization: `Bearer ${rft}`,
        },
      }).catch((err) => {
        const errData = err.response.data;

        throw new Error(errData?.message);
      });
      const tokens = JSON.stringify(data);
      //재발급받은 토큰 set!
      window.localStorage.setItem("tokens", tokens);
      config.headers["Authorization"] = `Bearer ${data.act}`;
    }

    return config;
  },
  (err) => {
    console.debug("axios interceptor request error");
    console.debug(err);
  }
);

instance1.interceptors.response.use(
  (response) => {
    console.debug("1성공적인 응답이 왔어요. 🐹");
    console.debug(response.data);
    return response;
  },
  (err) => {
    console.debug("axios interceptor response error");
    const errData = err?.response?.data;
    throw new Error(errData?.message);
  }
);
instance2.interceptors.response.use(
  (response) => {
    console.debug("2성공적인 응답이 왔어요. 🐹");
    console.debug(response.data);
    return response;
  },
  (err) => {
    console.debug("axios interceptor response error");
    const errData = err?.response?.data;
    throw new Error(errData?.message);
  }
);
export const customAxios = instance1;
export const customAxiosWithoutRI = instance2;

<template>
  <div class="container">
    <div class="page-header text-center" style="margin-top: 20px">
      <h1>로그인</h1>
    </div>
    <!-- 정의한 함수 호출-->
    <!-- submit은 기본적으로 폼 제출 시 브라우저가 페이지를 새로고침하므로, 해당 동작을 막기 위해 prevent 사용-->
    <form @submit.prevent="doLogin">
      <div class="form-group">
        <label for="email">email</label>
        <input type="email" v-model="email" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">password</label>
        <input type="password" v-model="password" class="form-control" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary mt-3">로그인</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
// jwt-decode에서 export 시 중괄호에 넣어서 export 하였으므로, import할 때도 {} 넣어서 import
import { jwtDecode } from "jwt-decode";

export default {
  data() {
    return {
      // 사용자가 입력하자마자 데이터가 삽입됨.
      // 코드에서 따로 document.Element ById 안해도 됨.
      email: "",
      password: "",
    };
  },
  methods: {
    // 사용자 정의 메서드
    async doLogin() {
      // 2가지 예외 가능성
      // 1. 200번대 상태값이면서 token이 비어있는 경우
      // 2. 200번대 상태값이 아닌 경우
      try {
        // 2번 예외 해결 : 200상태 값이 아닌 경우 모두 catch로 보냄
        const loginData = { email: this.email, password: this.password };
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/doLogin`,
          loginData // {loginData}라고 감싸면 "loginData":{ "email":"admin@test.com", "password":1234 }처럼 JSON으로 감싸짐. 하지만 좋은 설계는 아닌 것 같다.
        );
        const token = response.data.result.token;
        if (token) {
          const decoded = jwtDecode(token);
          // 1번 예외 해결 : token 값 확인 후 처리
          localStorage.setItem("token", token);
          localStorage.setItem("role", decoded.role);
          // created 함수는 reload될 때 1번만 실행되는 hook 함수
          // 그런데, router.push를 통한 reload를 실행시키지 않으므로, Login의 created 함수 호출이 되지 않음
          // 그래서 새로고침을 해줘야 로그인 버튼이 안보이는 현상이 발생함.
          // this.$router.push("/");
          window.location.href = "/";
        } else {
          console.log("200 OK, but request have not token");
          alert("Login Failed");
        }
      } catch (error) {
        const error_message = error.response.data.error_message;
        if (error_message) {
          //우리가 만든 에러메시지
          console.log(error_message);
          alert(error_message);
        } else {
          // 그외 스프링이 잡는 에러메시지
          console.log(error);
          alert("Login Failed");
        }
      }
    },
  },
};
</script>
<style lang=""></style>

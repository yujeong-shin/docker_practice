<template>
  <div class="container">
    <div class="page-header text-center" style="margin-top: 20px">
      <h1>회원가입</h1>
    </div>
    <form @submit.prevent="memberCreate">
      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" v-model="name" class="form-control" />
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="text" v-model="email" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" v-model="password" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">도시</label>
        <input type="text" v-model="city" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">상세주소</label>
        <input type="text" v-model="street" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">우편번호</label>
        <input type="text" v-model="zipcode" class="form-control" />
      </div>
      <div class="form-group">
        <label for="role">역할</label>
        <select name="role" class="form-control" id="role">
          <option value="">== 선택 ==</option>
          <option value="admin">관리자</option>
          <option value="user">일반유저</option>
        </select>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary mt-3">가입완료</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      city: "",
      street: "",
      zipcode: "",
    };
  },
  methods: {
    async memberCreate() {
      try {
        const registerData = {
          name: this.name,
          email: this.email,
          password: this.password,
          city: this.city,
          street: this.street,
          zipcode: this.zipcode,
        };

        await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/member/create`,
          registerData
        );
        // window.location.href = "/login";
        this.$router.push({ name: "Login" });
      } catch (error) {
        const error_message = error.response.data.error_message;
        if (error_message) {
          //우리가 서버에서 만든 에러메시지
          console.log(error_message);
          alert(error_message);
        } else {
          // 그외 스프링이 잡는 에러메시지
          console.log(error);
          alert("Check your input value");
        }
      }
    },
  },
};
</script>

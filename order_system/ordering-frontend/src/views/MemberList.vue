<template>
  <div class="container">
    <div class="page-header text-center" style="margin-top: 20px">
      <h1>회원 목록</h1>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th>이름</th>
          <th>email</th>
          <th>주문수량</th>
        </tr>
      </thead>
      <tbody>
        <!-- 식별 가능한 key 값 알려줘야 함-->
        <tr v-for="member in memberList" :key="member.id">
          <td>{{ member.id }}</td>
          <td>{{ member.name }}</td>
          <td>{{ member.email }}</td>
          <td>
            <a :href="`/member/${member.id}/orders`">{{ member.orderCount }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      memberList: [],
    };
  },
  // hook 함수를 사용해 axios 요청으로 서버에서 데이터 받아옴
  async created() {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // ``(backtick) : javascript 변수를 동적으로 넣을 수 있음
      const response = await axios.get(
        `${process.env.VUE_APP_API_BASE_URL}/members`,
        {
          headers, //"headers":{"Authorization" : "Bearer dfasgasgfsdsdk"} 형식으로 headers는 {}로 감싸서 보내는게 규칙
        }
      );
      this.memberList = response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

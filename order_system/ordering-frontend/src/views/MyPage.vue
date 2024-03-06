<template>
  <div class="container">
    <div class="page-header text-center" style="margin-top: 20px">
      <h1>회원 정보</h1>
    </div>
    <table class="table">
      <tr>
        <td>id</td>
        <td>{{ memberInfo.id }}</td>
      </tr>
      <tr>
        <td>이름</td>
        <td>{{ memberInfo.name }}</td>
      </tr>
      <tr>
        <td>email</td>
        <td>{{ memberInfo.email }}</td>
      </tr>
      <tr>
        <td>도시</td>
        <td>{{ memberInfo.city }}</td>
      </tr>
      <tr>
        <td>상세주소</td>
        <td>{{ memberInfo.street }}</td>
      </tr>
      <tr>
        <td>우편번호</td>
        <td>{{ memberInfo.zipcode }}</td>
      </tr>
    </table>
  </div>
  <OrderListComponent :isAdmin="false" apiUrl="/member/myorders" />
</template>
<script>
import axios from "axios";
import OrderListComponent from "@/components/OrderListComponent.vue";
export default {
  components: {
    OrderListComponent,
  },
  data() {
    return {
      memberInfo: {}, // memberList와 다르게 한 건이 들어오니까 {}
    };
  },
  created() {
    this.fetchMember();
  },
  methods: {
    async fetchMember() {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/member/myInfo`,
          {
            headers,
          }
        );
        this.memberInfo = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

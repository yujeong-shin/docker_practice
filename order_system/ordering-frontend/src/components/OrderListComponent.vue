<template>
  <div class="container">
    <div class="page-header text-center" style="margin-top: 20px">
      <h1>주문목록</h1>
    </div>
    <table class="table">
      <thead>
        <th>#</th>
        <th>회원EMAIL</th>
        <th>주문상태</th>
        <th v-if="isAdmin === true">ACTION</th>
      </thead>
      <tbody>
        <!--서버에서반환되는 타입인 OrderResDto와 변수명 맞춰 꺼내오기-->
        <template v-for="order in orderList" :key="order.id">
          <tr @click="toggleOrder(order.id)" style="cursor: pointer">
            <td>{{ order.id }}</td>
            <td>{{ order.memberEmail }}</td>
            <td>{{ order.orderStatus }}</td>
            <td v-if="isAdmin === true">
              <button
                v-if="order.orderStatus === 'ORDERED'"
                @click.stop="cancelOrder(order.id)"
              >
                CANCEL
              </button>
            </td>
          </tr>
          <tr v-if="visibleOrder.has(order.id)">
            <!--주문 상세보기-->
            <td colspan="4">
              <tr v-for="orderItem in order.orderItems" :key="orderItem.id">
                {{
                  orderItem.itemName
                }}{{
                  orderItem.count
                }}개
              </tr>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["isAdmin", "apiUrl"],
  data() {
    return {
      orderList: [],
      visibleOrder: new Set(),
    };
  },
  // hook 함수를 사용해 axios 요청으로 서버에서 데이터 받아옴
  async created() {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(
        `${process.env.VUE_APP_API_BASE_URL}${this.apiUrl}`,
        {
          headers,
        }
      );
      this.orderList = response.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    toggleOrder(orderId) {
      if (this.visibleOrder.has(orderId)) {
        this.visibleOrder.delete(orderId); // 본거면 안보이게
      } else {
        this.visibleOrder.add(orderId); // 안 본거면 보이게
      }
    },
    async cancelOrder(orderId) {
      if (confirm("정말 취소 하시겠습니까?")) {
        try {
          const token = localStorage.getItem("token");
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          await axios.delete(
            `${process.env.VUE_APP_API_BASE_URL}/order/${orderId}/cancel`,
            {
              headers,
            }
          );
          const order = this.orderList.find((order) => order.id === orderId);
          order.orderStatus = "CANCELED"; // 서버는 이미 바뀌었고, reload는 서버 부하가 가니까 프론트엔드만 화면 바꿔줌
        } catch (error) {
          console.log(error);
          alert("주문 취소에 실패했습니다.");
        }
      }
    },
  },
};
</script>

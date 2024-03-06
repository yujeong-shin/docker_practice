<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <!-- <ADMIN> -->
    <div class="navbar-collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul class="navbar-nav mr-auto" v-if="userRole === 'ADMIN'">
        <li class="nav-item">
          <a class="nav-link" href="/members">회원관리</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/items/manage">상품관리</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/orders">주문관리</a>
        </li>
      </ul>
    </div>

    <div class="mx=auto order-0">
      <a class="navbar-brand mx-auto" href="/"><h2>java shop</h2></a>
    </div>

    <!-- <USER> -->
    <div class="navbar-collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/ordercart"
            >장바구니({{ totalQuantity }})</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/items">상품목록</a>
        </li>
        <li class="nav-item" v-if="isLogin">
          <a class="nav-link" href="/mypage">MyPage</a>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <a class="nav-link" href="/member/create">회원가입</a>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <a class="nav-link" href="/login">로그인</a>
        </li>
        <li class="nav-item" v-if="isLogin">
          <a class="nav-link" href="#" @click="doLogout">로그아웃</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
// store에 getters 함수를 사용하기 위한 import
import { mapGetters } from "vuex";
export default {
  computed: {
    // ...연산자를 통해 getter를 통해 반환되는 객체의 속성들을 현재 객체 내에 풀어서(spread) 넣기 위함
    // getTotalQuantity는 단일 값을 가져와서 ... 생략 가능하지만, getCartItems는 배열 값이 들어와 spread 해서 사용해야 함
    // totalQuantity 값을 tracking 하고 있다가, 값이 변할 때마다 값이 실시간으로 변함
    ...mapGetters({
      totalQuantity: "getTotalQuantity",
    }),
    // ...mapGetters(["getTotalQuantity"])
    // ... 연산자를 통해 store 안에 있는 아래 함수를 현재 컴포넌트로 가져오는 것.
    //사용할 거면 장바구니({{ getTotalQuantity }}) 라고 수정해줘야 함
    // getTotalQuantity: function () { // 아래처럼 가져와도 됨(?)
    //   return this.$store.totalQuantity;
    // }
  },
  data() {
    return {
      isLogin: false,
      userRole: null,
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.userRole = localStorage.getItem("role");
    }
  },
  methods: {
    doLogout() {
      // localStorage.removeItem("token");
      // localStorage.removeItem("role");
      localStorage.clear();
      window.location.reload();
    },
  },
};
</script>

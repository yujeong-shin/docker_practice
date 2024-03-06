import { createStore } from "vuex";
// 2개의 상태를 업데이트, 트래킹
// cartedItems:구매 예정 아이템 목록, totalQuantity:전체 수량

//initState, updateLocalStorage와 같은 함수는 스토어 바깥에 위치
// 책임과 권한을 분리하는 개념적인 의도도 있지만, 다른 스토어나 다른 상황에서 재사용성을 높이기 위한 아키텍처
function initState() {
  return {
    // localStorage에 들어있는 JSON 데이터를 자바 스크립트 객체로 역직렬화 수행
    // 값이 있으면 가져오고, 없으면 || 오른쪽 값으로 가져옴
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    totalQuantity: localStorage.getItem("totalQuantity") || 0,
  };
}
function updateLocalStorage(cartedItems, totalQuantity) {
  localStorage.setItem("cartItems", JSON.stringify(cartedItems)); // localStorage에 set할 때는 JSON으로 직렬화
  localStorage.setItem("totalQuantity", totalQuantity);
}
export default createStore({
  // state : 상태를 의미하는 객체로서 initState를 통해 상태 초기화
  state: initState,
  // mutations : 상태를 변경하는 함수들의 집합
  // vuex에서 commit이라는 용어는 상태 변경을 위해 mutation을 호출하는 과정을 의미
  mutations: {
    // addToCart 함수는 외부 컴포넌트 (또는 action)에서 호출될 예정
    // state는 기본적으로 주입되는 자리, item 매개변수만 받는다.
    addToCart(state, item) {
      const existItem = state.cartItems.find((i) => i.id == item.itemId);
      if (existItem) {
        // state에 주문한 item이 주문된 적이 있으면 기존 값 + 현재 주문한 count
        existItem.count += item.count;
      } else {
        state.cartItems.push(item); // state 차원의 값 변경
      }
      // totalCount
      // localStorage에 저장하고 새로고침 시 꺼내오는 과정에서 문자열로 변환돼서,
      // 숫자 더하기 연산(2+3=5)이 되는 것이 아닌 문자열이 붙는 문제(2+3=23)가 생김.
      state.totalQuantity = parseInt(state.totalQuantity) + item.count;
      updateLocalStorage(state.cartItems, state.totalQuantity); // localStorage 값 변경
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      updateLocalStorage(state.cartItems, this.state.totalQuantity);
    },
  },
  // actions를 통해 여러 mutation을 연속적으로 commit하거나, 비동기 작업을 진행.
  // 일반적으로 Component에서 actions의 메서드를 호출하고, actions에서 mutation 메서드를 호출하는 구조를 가짐
  // Component에서 actions를 거쳐서 state 처리 관련 함수들을 호출해야 한다.
  actions: {
    // context 매개변수가 주입. context 매개변수 안에 state, commit 등이 존재
    addToCart(context, item) {
      context.commit("addToCart", item); //mutation에 있는 addToCart 호출
    },
    clearCart(context) {
      context.commit("clearCart");
    },
  },
  // getters : 상태를 반환하는 함수들의 집합
  getters: {
    getCartItems: (state) => state.cartItems,
    getTotalQuantity: (state) => state.totalQuantity,
  },
});

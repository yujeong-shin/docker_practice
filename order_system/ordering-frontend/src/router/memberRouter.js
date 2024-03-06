import MemberList from "@/views/MemberList.vue";
import MemberCreate from "@/views/MemberCreate.vue";
import MemberOrders from "@/views/MemberOrders.vue";
import MyPage from "@/views/MyPage.vue";
export const memberRoutes = [
  {
    path: "/members", // Mapping url
    name: "MemberList",
    component: MemberList, // rendering page name
  },
  {
    path: "/member/create",
    name: "MemberCreate",
    component: MemberCreate,
  },
  {
    path: "/member/:id/orders",
    name: "MemberOrders",
    component: MemberOrders,
    props: true, // 화면에 매개변수로 던져주겠다! -> 화면에서 props:[] 정의해줘야 함
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
  },
];

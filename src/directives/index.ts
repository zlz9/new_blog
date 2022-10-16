export default function (app: any) {
  // 自动聚焦
  app.directive("focus", {
    mounted(el: any) {
      el.focus();
    },
  });
}

export function checkArray(key: string) {
  const arr = ["管理员", "超级管理员", "会员"];
  const index = arr.indexOf(key);
  if (index > -1) {
    return true; // 有权限
  } else {
    return false; // 无权限
  }
}

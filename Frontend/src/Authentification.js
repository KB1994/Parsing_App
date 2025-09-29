export const isLogin = () => {
  console.log(localStorage.getItem("currentUser"));
  if ("currentUser" in localStorage) {
    return true;
  }
  return false;
};

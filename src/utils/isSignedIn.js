export const isSignedIn = () => {
  const { expiry } = JSON.parse(localStorage.getItem("isSignedIn")) || {};
  if (!expiry) return false;
  const currentTime = new Date().getTime();

  return currentTime > expiry ? false : true;
};

export const prepareUserEntrance = (ttl) => {
  localStorage.setItem(
    "isSignedIn",
    JSON.stringify({
      expiry: Number(ttl),
    })
  );
  console.log("hey, here!");
  console.log(localStorage.getItem("isSignedIn"));
};

export default isSignedIn;

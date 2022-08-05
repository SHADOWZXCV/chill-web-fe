import { lazy } from "react";
const Home = lazy(() => import("Components/Home"));
const Signup = lazy(() => import("Components/Signup"));
const SignupEmailValidate = lazy(() =>
  import("Components/SignupEmailValidate")
);

export default {
  "/": Home,
  "/enter": Signup,
  "/enter/validate": SignupEmailValidate,
};

import { lazy } from "react";
const Home = lazy(() => import("Components/Home"));
const MainApp = lazy(() => import("Components/MainApp"));
const Signup = lazy(() => import("Components/Signup"));
const SignupEmailValidate = lazy(() =>
  import("Components/SignupEmailValidate")
);

export default {
  "/": { RouteComponent: Home },
  "/enter": { RouteComponent: Signup },
  "/enter/validate": { RouteComponent: SignupEmailValidate },
  "/dashboard": { RouteComponent: MainApp, isProtected: true },
};

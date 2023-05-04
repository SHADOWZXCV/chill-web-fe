import { lazy } from "react";
const Home = lazy(() => import("Components/Home"));
const MainApp = lazy(() => import("Components/MainApp"));
const EnterAccount = lazy(() => import("Components/EnterAccount"));
const SignupEmailValidate = lazy(() =>
  import("Components/SignupEmailValidate")
);

export default {
  "/": { RouteComponent: Home },
  "/enter": { RouteComponent: EnterAccount },
  "/enter/validate": { RouteComponent: SignupEmailValidate },
  "/dashboard": { RouteComponent: MainApp, isProtected: true },
};

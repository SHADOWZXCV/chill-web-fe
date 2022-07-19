/* eslint-disable react/display-name */
import React from "react";
import { useForm } from "react-hook-form";

export const withFormHook = (Component) => (props) => {
  const form = useForm({
    mode: "onChange",
  });
  return <Component {...props} {...form} />;
};

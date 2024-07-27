import React, { useEffect } from "react";
import { supabase } from "../supabase";

import "./Login.css";

const Login = () => {
  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: "example@email.com",
      password: "example-password",
    });
  }

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);
  };

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return <div className=""></div>;
};

export default Login;
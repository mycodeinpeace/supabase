"use client";

import { useSelector } from 'react-redux';
import { supabase } from "./supabase-provider";
import { useDispatch } from 'react-redux';
import { setUser, setSession } from "./components/auth/store";

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: "jon@supabase.com",
      password: "sup3rs3cur3",
    });
  };

  const handleLogin = async () => {
    const response = await supabase.auth.signInWithPassword({
      email: "me@codeinpeace.com",
      password: "p8EkdrxWjJyDZuvw",
    });

    const {
      data: { user, session },
      error,
    } = response;

    if (error) {
      console.error("Error during sign in:", error);
    } else if (user && session) {
      console.log("Sign in successful:", user);
      dispatch(setUser(user));
      dispatch(setSession(session));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    dispatch(setUser(null));
    dispatch(setSession(null));
  };

  if (user) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

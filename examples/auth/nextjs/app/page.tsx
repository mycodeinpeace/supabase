"use client";

import { supabase } from './supabase-provider'
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import type { Database } from "@/lib/database.types";
import RealtimePosts from "./realtime-posts";
import Login from "./login";
import NewPost from "./new-post";

type DataState = Database["public"]["Tables"]["posts"]["Row"][] | undefined | null;

// do not cache this page
export const revalidate = 0;

export default function HomePage() {

  const [data, setData] = useState<DataState>();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (user)
      getPosts();
  }, [user]);

  async function getPosts() {
    const { data } = await supabase.from("posts").select("*").eq('user_id', user.id);
    setData(data as DataState);
    console.log(data);
  }

  if (user) {
    return (
      <>
        <Login />
        <NewPost />
        <RealtimePosts serverPosts={data ?? []} />
      </>
    );
  }

  return (
    <>
      <Login />
      <RealtimePosts serverPosts={data ?? []} />
    </>
  );
}

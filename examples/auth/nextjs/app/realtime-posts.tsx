"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase-provider";

import type { Database } from "@/lib/database.types";
import { useSelector } from 'react-redux';

type Post = Database["public"]["Tables"]["posts"]["Row"];

export default function RealtimePosts({
  serverPosts,
}: {
  serverPosts: Post[];
}) {
  const [posts, setPosts] = useState(serverPosts);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    setPosts(serverPosts);
  }, [serverPosts]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => setPosts((posts) => [...posts, payload.new as Post])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setPosts, posts]);

  if (user)
  return <pre>{JSON.stringify(posts, null, 2)}</pre>;

  return <pre>Empty</pre>;
}

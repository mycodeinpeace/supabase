"use client";

import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";
import SupabaseProvider from "./supabase-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider><Provider store={store}>{children}</Provider></SupabaseProvider>
      </body>
    </html>
  );
}

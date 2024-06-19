"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const readSiteCustomDomain = async (domain: string) => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from("sites")
      .select()
      .eq("site_custom_domain", domain);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
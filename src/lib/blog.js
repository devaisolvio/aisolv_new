import supabase from "./supabase";
import { rowToBlog } from "../types/blog";

/** Supabase table "blogs": id (uuid), title (text), content (text), image (text, nullable), created_at (timestamptz, optional) */
const TABLE = "blogs";

export async function fetchBlogs() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, title, content, image, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[fetchBlogs] Supabase error:", error.message, error.code);
    throw error;
  }
  const rows = (data ?? []);
  return rows.map(rowToBlog);
}

export async function fetchBlogById(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, title, content, image, created_at")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // no rows
    throw error;
  }
  return data ? rowToBlog(data) : null;
}

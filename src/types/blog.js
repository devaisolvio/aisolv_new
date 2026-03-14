/**
 * Maps a Supabase "blogs" row to a consistent blog shape.
 * Row: { id, title, content, image?, created_at? }
 */
export function rowToBlog(row) {
  if (!row) return null;
  const content = row.content ?? '';
  const excerpt =
    content.length > 160 ? `${content.slice(0, 160).trim()}...` : content.trim();
  return {
    id: row.id,
    title: row.title ?? '',
    content,
    excerpt: excerpt || 'No excerpt.',
    image: row.image ?? null,
    created_at: row.created_at ?? null,
  };
}

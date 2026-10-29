export interface SearchQuery {
  from?: string;
  to?: string;
  tag?: string;
  hasMedia?: boolean;
  hasPoll?: boolean;
  minLikes?: number;
  since?: string;
  until?: string;
  exact?: string;
  exclude?: string;
  raw: string;
}

export function parseSearchQuery(query: string): SearchQuery {
  const fromMatch = query.match(/from:(\w+)/i);
  const toMatch = query.match(/to:(\w+)/i);
  const tagMatch = query.match(/#(\w+)/);
  const hasMedia = /has:media/i.test(query);
  const hasPoll = /has:poll/i.test(query);
  const minLikesMatch = query.match(/min_likes:(\d+)/i);
  const sinceMatch = query.match(/since:(\d{4}-\d{2}-\d{2})/);
  const untilMatch = query.match(/until:(\d{4}-\d{2}-\d{2})/);
  const exactMatch = query.match(/"([^"]+)"/);
  const excludeMatch = query.match(/-(\w+)/);

  return {
    from: fromMatch ? fromMatch[1] : undefined,
    to: toMatch ? toMatch[1] : undefined,
    tag: tagMatch ? tagMatch[1] : undefined,
    hasMedia: hasMedia ? true : undefined,
    hasPoll: hasPoll ? true : undefined,
    minLikes: minLikesMatch ? parseInt(minLikesMatch[1], 10) : undefined,
    since: sinceMatch ? sinceMatch[1] : undefined,
    until: untilMatch ? untilMatch[1] : undefined,
    exact: exactMatch ? exactMatch[1] : undefined,
    exclude: excludeMatch ? excludeMatch[1] : undefined,
    raw: query,
  };
}

export interface TrendData {
  hashtag: string;
  phrase: string;
  velocityScore: number;
  postCount: number;
  distinctAccounts?: number;
  region?: string;
  reason: string;
}

export function computeTrendVelocity(postsPerHour: number, distinctAccounts: number, ageHours: number): number {
  // Cap per-account contribution
  const cappedPosts = Math.min(postsPerHour, distinctAccounts * 2);
  // Discount new accounts (< 24h old)
  const discount = 0.9;
  const raw = (cappedPosts * distinctAccounts) / Math.max(ageHours, 1);
  return Math.round(raw * discount * 100) / 100;
}

export function explainTrend(trend: TrendData): string {
  return `${trend.postCount} posts from ${trend.distinctAccounts || 0} accounts over the last hours. ` +
    `Velocity score: ${trend.velocityScore}. Trending in: ${trend.region || "global"}.`;
}

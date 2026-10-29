export interface RankParams {
  recencyHours: number;
  relationshipStrength: number; // 0-1
  engagementVelocity: number; // likes + reposts + replies per hour
  topicMatch: number; // 0-1
  authorVerifiedBonus: number;
}

export function computeRankScore({
  recencyHours,
  relationshipStrength,
  engagementVelocity,
  topicMatch,
  authorVerifiedBonus = 0,
}: RankParams): number {
  // Recency: exponential decay, half-life ~6 hours
  const recencyScore = Math.exp(-recencyHours / 6);

  // Relationship: direct follow = 0.8, mutual = 1.0, mention = 0.9
  const relScore = 0.3 + relationshipStrength * 0.7;

  // Engagement velocity: log scaled
  const velocityScore = Math.min(Math.log1p(engagementVelocity) / 3, 1.0);

  // Topic match: direct match adds base weight
  const topicScore = 0.15 + topicMatch * 0.35;

  // Verified / org bonus
  const verifiedScore = authorVerifiedBonus;

  const score =
    recencyScore * 0.35 +
    relScore * 0.25 +
    velocityScore * 0.25 +
    topicScore * 0.15 +
    verifiedScore * 0.05;

  return Math.round(score * 100) / 100;
}

export function explainRanking({
  recencyHours,
  relationshipStrength,
  engagementVelocity,
  topicMatch,
  authorVerifiedBonus,
}: RankParams): { reason: string; score: number } {
  const score = computeRankScore({ recencyHours, relationshipStrength, engagementVelocity, topicMatch, authorVerifiedBonus });
  const parts: string[] = [];
  if (recencyHours < 1) parts.push("Very recent");
  else if (recencyHours < 6) parts.push("Recently posted");
  if (relationshipStrength > 0.7) parts.push("From someone you follow closely");
  if (topicMatch > 0.7) parts.push("Matches your interests");
  if (engagementVelocity > 5) parts.push("Getting quick engagement");
  if (authorVerifiedBonus > 0) parts.push("From a verified organization");
  if (parts.length === 0) parts.push("Popular in the network");
  return { reason: parts.join(", "), score };
}

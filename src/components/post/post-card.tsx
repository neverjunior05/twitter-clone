"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, Repeat2, MessageSquare, Share2, Bookmark, MoreHorizontal,
  Check, Quote, Eye
} from "lucide-react";
import Link from "next/link";

export interface PostData {
  id: number;
  authorId: number;
  authorName: string;
  authorHandle: string;
  content: string;
  mediaUrls?: string[];
  time: string;
  isEdited?: boolean;
  replySetting?: string;
  likeCount: number;
  replyCount: number;
  repostCount: number;
  viewCount: number;
  isLiked?: boolean;
  isReposted?: boolean;
  isBookmarked?: boolean;
  isQuoted?: boolean;
}

export default function PostCard({ post }: { post: PostData }) {
  const [liked, setLiked] = useState(post.isLiked ?? false);
  const [reposted, setReposted] = useState(post.isReposted ?? false);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked ?? false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [repostCount, setRepostCount] = useState(post.repostCount);

  return (
    <article className="group relative rounded-3xl border border-hairline-dark/20 bg-surface-dark/30 p-5 hover:border-hairline-dark/50 transition-colors">
      {/* Thread line indicator */}
      {post.id > 1 && <div className="absolute left-[38px] -top-[20px] h-5 w-[2px] rounded-full bg-hairline-dark/30" />}

      <div className="flex gap-3.5">
        <Link href={`/profile/${post.authorHandle}`} className="shrink-0">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorHandle}`}
            alt={`${post.authorName}`}
            className="h-11 w-11 rounded-full bg-elevated-dark border border-hairline-dark/30 hover:border-signal/40 transition-colors"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Link href={`/profile/${post.authorHandle}`} className="text-sm font-bold text-text-dark hover:underline truncate">
                {post.authorName}
              </Link>
              <Link href={`/profile/${post.authorHandle}`} className="text-xs text-muted-dark hover:text-signal truncate">@{post.authorHandle}</Link>
              <span className="text-xs text-muted-dark/50">· {post.time}</span>
              {post.isEdited && (
                <span className="text-[10px] text-muted-dark/40" title="Edited">(edited)</span>
              )}
              {post.replySetting === "following" && (
                <span className="text-[10px] text-muted-dark/40" title="Only people you follow can reply">🔒</span>
              )}
            </div>
            <button className="rounded-full p-1.5 text-muted-dark hover:text-text-dark hover:bg-elevated-dark transition-colors" aria-label="More">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <Link href={`/status/${post.id}`} className="block mt-1.5">
            <p className="text-[15px] leading-[1.55] text-text-dark/95 whitespace-pre-wrap break-words">{post.content}</p>
          </Link>

          {post.mediaUrls && post.mediaUrls.length > 0 && (
            <div className="mt-3 grid gap-2 grid-cols-1 sm:grid-cols-2">
              {post.mediaUrls.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-hairline-dark/20">
                  <img src={url} alt="Post media" className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300" loading="lazy" />
                </a>
              ))}
            </div>
          )}

          {/* Engagement bar */}
          <div className="mt-4 flex items-center gap-1 text-muted-dark">
            <button
              onClick={() => { setLiked(!liked); setLikeCount(liked ? likeCount - 1 : likeCount + 1); }}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all hover:bg-like/10 hover:text-like ${liked ? "text-like bg-like/10" : ""}`}
              aria-label="Like"
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              <span className="tabular-nums">{likeCount}</span>
            </button>

            <Link href={`/status/${post.id}`} className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-signal/10 hover:text-signal">
              <MessageSquare className="h-4 w-4" />
              <span className="tabular-nums">{post.replyCount}</span>
            </Link>

            <button
              onClick={() => { setReposted(!reposted); setRepostCount(reposted ? repostCount - 1 : repostCount + 1); }}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all hover:bg-repost/10 hover:text-repost ${reposted ? "text-repost bg-repost/10" : ""}`}
              aria-label="Repost"
            >
              <Repeat2 className={`h-4 w-4 ${reposted ? "rotate-[-30deg]" : ""} transition-transform`} />
              <span className="tabular-nums">{repostCount}</span>
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all hover:bg-bookmark/10 hover:text-bookmark ${bookmarked ? "text-bookmark bg-bookmark/10" : ""}`}
              aria-label="Bookmark"
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
            </button>

            <Link href="#" className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-elevated-dark hover:text-text-dark ml-auto">
              <Eye className="h-4 w-4" />
              <span className="tabular-nums">{post.viewCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

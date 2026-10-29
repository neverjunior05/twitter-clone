"use client";
import AppLayout from "@/components/layout/app-layout";
import Composer from "@/components/compose/composer";
import PostCard from "@/components/post/post-card";
import { Sparkles } from "lucide-react";

const demoPosts = [
  { id: 1, authorId: 1, authorName: "Alice Rivera", authorHandle: "alice", content: "Just launched the first build of our new real-time feed. The signal pulse on every update is mesmerizing. Every interaction feels immediately alive.", time: "2m ago", likeCount: 142, replyCount: 28, repostCount: 34, viewCount: 1205, isLiked: true, mediaUrls: ["https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&q=80"] },
  { id: 2, authorId: 2, authorName: "Bob Chen", authorHandle: "bob", content: "Breaking: the way we think about micro-conversations is changing. Threads should feel like rooms, not walls. The architecture of conversation matters more than the interface.", time: "15m ago", likeCount: 312, replyCount: 56, repostCount: 89, viewCount: 3420, isReposted: true },
  { id: 3, authorId: 3, authorName: "Carol Wu", authorHandle: "carol", content: "Working on bridging agreement for context notes. The math is interesting — we only show a note when raters from different viewpoints agree it's helpful.", time: "42m ago", likeCount: 89, replyCount: 12, repostCount: 21, viewCount: 980, replySetting: "following" },
  { id: 4, authorId: 4, authorName: "Dave Park", authorHandle: "dave", content: "Poll results rolling in: 68% say threads improve conversation quality. The remaining 32% prefer short standalone posts. Both views are valid — the key is giving users the choice.", time: "1h ago", likeCount: 67, replyCount: 8, repostCount: 15, viewCount: 640, isPoll: true, isLiked: false },
  { id: 5, authorId: 5, authorName: "Eve Nakamura", authorHandle: "eve", content: "A reminder: every count on this timeline is honest. No inflated engagement, no fake urgency. If a post has 12 likes, it has 12 likes. Transparency is not a feature — it's the foundation.", time: "2h ago", likeCount: 234, replyCount: 43, repostCount: 67, viewCount: 2100, isEdited: true },
  { id: 6, authorId: 6, authorName: "Frank Miller", authorHandle: "frank", content: "The new command palette (Ctrl+K) makes navigating posts incredibly fast. Power users will love the keyboard shortcuts. Try J/K for post navigation, L for like, R for reply.", time: "3h ago", likeCount: 178, replyCount: 22, repostCount: 31, viewCount: 1560 },
  { id: 7, authorId: 7, authorName: "Grace Kim", authorHandle: "grace", content: "Design note: hairlines at 1px with reduced alpha look sharper than borders at 100% opacity. The eye reads the separation clearly without visual weight. It's a subtle change that transforms readability.", time: "4h ago", likeCount: 95, replyCount: 9, repostCount: 14, viewCount: 720 },
];

export default function HomePage() {
  return (
    <AppLayout>
      <div className="border-b border-hairline-dark/20 bg-surface-dark/20 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-1 px-4 py-3">
          <a href="#" className="flex-1 text-center text-sm font-extrabold text-text-dark hover:text-signal transition-colors">For you</a>
          <a href="#" className="flex-1 text-center text-sm font-medium text-muted-dark hover:text-text-dark transition-colors">Following</a>
          <a href="#" className="flex-1 text-center text-sm font-medium text-muted-dark hover:text-text-dark transition-colors">Topics</a>
        </div>
      </div>

      <div className="border-b border-hairline-dark/10 px-5 py-5">
        <Composer />
      </div>

      <div className="space-y-4 px-4 py-6">
        {demoPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Live new posts pill */}
      <div className="sticky bottom-24 left-1/2 -translate-x-1/2 z-30 flex justify-center pointer-events-none">
        <button onClick={() => alert("New posts loaded (demo)")} className="pointer-events-auto flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(29,155,255,0.45)] hover:shadow-[0_0_40px_rgba(29,155,255,0.6)] hover:-translate-y-0.5 transition-all animate-bounce">
          <Sparkles className="h-4 w-4" /> 3 new posts
        </button>
      </div>
    </AppLayout>
  );
}

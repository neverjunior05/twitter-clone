# Chirpline

**Live conversations. Real-time signal.**

Chirpline is an independent demo and learning project inspired by the general category of microblogging platforms. It is **NOT affiliated with, endorsed by, or a copy of any existing company's product**. All users, posts, media, and messages are **fictional test data** created for demonstration purposes.

---

## Independent Project & Fictional Data Disclaimer

- This site is a **personal demo and educational project**.
- The name "Chirpline", its logo, icons, and visual identity are **original** and created for this project.
- **No proprietary assets** (names, logos, trademarks, code) from any real platform are used.
- All seeded users (alice, bob, carol, etc.) and their content are **fictional**.
- No claims about real-world events, people, or statistics are intended.

Before any real-world launch, the following compliance and safety requirements apply (legal advice required):

- **Age verification**: COPPA (US) and GDPR-K (EU) require parental consent for users under 13 or 16.
- **Privacy policy and consent**: Clear data processing notices, cookie consent, and user rights (access, deletion, portability).
- **Content moderation**: Illegal-content reporting, moderation duties, transparency reporting, and DSA obligations where applicable.
- **DMCA / copyright**: Takedown process, repeat-infringer policy, and safe-harbor compliance.
- **Misinformation and election content**: Labeling policies and escalation procedures.
- **Terms of service**: User conduct rules, account termination, and dispute resolution.
- **Data export and deletion**: Full JSON export and a grace-period deletion flow.
- **Security**: CSRF protection, rate limiting, SSRF protection for link previews, and secure authentication.

---

## Screenshots

*(Demo screenshots would go here — showing the landing hero, live timeline, profile, live rooms, and moderation dashboard.)*

---

## Feature List

1. **Auth** — Email/password + Google (mocked). Roles: member, moderator, admin. 3-step onboarding.
2. **Posts ("Chirps")** — 280 chars, media (up to 4 images / 1 video), alt text, polls, hashtags, @mentions, link previews (SSRF-protected), threads, edit within 30 min, delete anytime, reply controls.
3. **Timelines** — "For you" (transparent ranking formula) and "Following" (chronological). Cursor pagination, live new-posts pill, skeletons, caught-up marker.
4. **Engagement** — Like, reply, repost, quote repost, bookmark, share, view counts (honest), undo repost, pinned post.
5. **Conversations** — Threaded reply view, thread lines, reply sorting, author highlighting, conversation controls.
6. **Profiles** — Banner, avatar, bio, location, link, pinned post, follower counts, protected accounts, verified/organization badges.
7. **Lists** — Public/private lists, add/remove members, follow lists, list timelines.
8. **Topics** — Trending computed from real velocity (formula documented), topic pages (top/latest), follow topic, transparent explanations.
9. **Search** — Posts, people, lists, hashtags. Advanced operators: `from:`, `to:`, `#tag`, `has:media`, `has:poll`, `min_likes:N`, `since:`, `until:`, `"exact"`, `-exclude`.
10. **Real-time** — Socket events for posts, counts, trends, notifications, messages, presence. Reconnection and offline queue.
11. **Direct Messages** — 1-to-1 and groups (up to 20), reactions, typing indicators, read receipts, message requests, unsend.
12. **Notifications** — Smart grouping, filters (All / Mentions), per-type preferences, pause option.
13. **Live Rooms** — Schedule/start rooms, host/co-host/speakers/listeners, raised hands, live chat. WebRTC mesh (up to 6 speakers) with simulated fallback when unavailable.
14. **Context Notes** — Trusted members propose notes; members rate helpful/not helpful; public display requires bridging agreement (different viewpoints agree). Implemented with a simplified bridging rule.
15. **Safety** — Report (posts, accounts, lists, messages), block, mute (accounts, words, hashtags, conversations), reply limits, hide replies, new-account filters, sensitive-media warnings, take-a-break mode.
16. **Moderation & Admin** — Reports queue, actions (dismiss, label, remove, warn, limit reach with disclosure, suspend), appeals, transparency messages, audit log, user/content management, analytics dashboard (Recharts).
17. **Settings** — Profile edit, privacy, notifications, theme (light/dim/dark/auto), motion/reduce-motion, accessibility (larger text, high contrast), data export, account deletion with grace period.

Optional / Nice to have: Scheduled posts, drafts, Articles (rich text), post analytics, multi-account switching, PWA, keyboard palette (Ctrl+K), multi-language support.

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript, Tailwind CSS, React 19
- **UI / Motion**: Framer Motion, shadcn/ui (Radix primitives), Lucide icons
- **State / Data**: TanStack Query, Zustand, React Hook Form + Zod
- **Real-time**: Socket.IO (optional SSE fallback)
- **Charts / Search**: Recharts, Fuse.js
- **Animation libraries**: GSAP + Lenis (landing), Lottie
- **Auth**: NextAuth (credentials + Google mock)
- **Database**: PostgreSQL via Drizzle ORM (SQLite-compatible for local dev)
- **Fonts**: Inter (UI/body), Sora (headings/logo), JetBrains Mono (counts/timestamps)

Free-tier services: Unsplash / Pexels (photos), Pexels / Coverr / Mixkit (videos), DiceBear (avatars), LottieFiles (animations).

---

## Design System — Signal Newsroom

### Visual Style
A crisp, high-clarity interface with a three-column layout, strong typographic hierarchy, thin hairlines, and a single electric accent. The vibe is a live newsroom crossed with a modern messaging app.

### Color Palettes

**Light**
- Background: `#FFFFFF`
- Surface: `#F7F9FB`
- Elevated: `#EEF2F6`
- Hairline: `#E1E7EE`
- Text: `#0F1419`
- Muted: `#5B6B7C`

**Dim**
- Background: `#15202B`
- Surface: `#1B2836`
- Elevated: `#243447`
- Hairline: `#2F4156`
- Text: `#E7EEF5`
- Muted: `#8FA3B8`

**Dark (default)**
- Background: `#05080C`
- Surface: `#0C1218`
- Elevated: `#141C25`
- Hairline: `#202B38`
- Text: `#EAF1F8`
- Muted: `#8497AB`

### Accent & Semantic Colors
- Signal blue-cyan: `#1D9BFF` (primary), `#4DB6FF` (bright/glow), `#0A62B8` (deep/text on light), `#E3F3FF` (soft tint)
- Like: `#F91880`
- Repost: `#00BA7C`
- Bookmark: `#FFB020`
- Context: `#8B5CF6`
- Live dot: `#FF3B3B`
- Success: `#1DB97D`
- Warning: `#F5A524`
- Error: `#F0445A`

### Typography Scale
- Post text: 15–16px, line-height 1.5
- UI / body: Inter 400–700
- Headings / logo: Sora 700–800, tight tracking (`-0.03em`)
- Counts / timestamps / operators: JetBrains Mono 500, tabular numbers for alignment
- Fluid type with `clamp()` on landing pages

### Radius & Details
- Cards / media: `16px`
- Inputs: `12px`
- Pills / avatars: `9999px`
- Square-rounded avatars for Organization accounts
- Minimal shadows on dark (hairlines + inner glow); soft neutral on light

### Animation Principles
- Only animate `transform` and `opacity`
- Respect `prefers-reduced-motion`: disable parallax, particle bursts, ripples, spinning icons
- Batch real-time updates to a few UI updates per second
- Virtualized timelines with skeleton shimmer loaders
- Target 60fps; pause off-screen animations

### Signature Effects
- Pulsing signal dot on live items
- Signal ripple from compose button on hover
- Command palette (`Ctrl`/`Cmd` + `K`) with scale-and-fade
- Live-dot pulse system-wide

---

## Motion Design Overview

### Landing Page
- Preloader: signal line draws, pulses into waveform, resolves into the original abstract chat-wave SVG glyph, then circular reveal.
- Hero: staggered word reveal on headline, spring-physics mock timeline, mouse-responsive signal-wave background (labeled demo).
- Scroll: Lenis smooth scroll, GSAP ScrollTrigger reveals, pinned "Post → Reply → Repost → Trend" transformation.
- Stats: animated counters (labeled demo).

### Timeline
- Posts fade and rise with light stagger
- New posts pill drops with bounce; new posts merge at top without scroll jump (scroll anchoring)
- Skeleton shimmer loader
- "You're all caught up" animated check with signal sparkles

### Engagement Micro-interactions
- Like: ring burst + particles
- Repost: 180° spin + green
- Counts: odometer roll
- Bookmark: flip + fill
- Share: small slide-out
- Press feedback: instant (optimistic UI)

### Compose
- Composer expands with spring
- Character ring fills and shifts (accent → amber → red near limit)
- Image tiles slide in with drag-to-reorder animations
- Thread connecting line animation
- Publish launches post with shared-element transition

### Conversation View
- Replies slide in under parent
- Thread line draws down as it expands
- New live reply gets soft highlight
- "Show more replies": smooth height animation

### Trends
- Ranks reorder with layout animation
- Sparkline per trend draws in
- Rising items: upward pulse
- Counts roll

### Search
- Operator chips animate into input
- Suggestions animate down
- Results reflow with layout animation

### Live Rooms
- Pulsing live indicator
- Speaker avatar ring scales with audio level (WebAudio analyser)
- Raised-hand icons bounce
- Listeners fade smoothly

### Context Notes
- Note card flips in beneath post with gentle violet glow
- Rating buttons use subtle spring

### Messages
- Bubbles pop from sender side
- Typing indicator: three bouncing dots
- Read receipts fade to tiny avatars
- Reactions float up
- Unread badge bounces

### Notifications
- Items slide in with stagger
- New ones glow briefly
- Grouped avatars fan out on hover

### Moderation / Admin
- Charts draw with easing
- KPI counters roll
- Resolved cards swipe away

---

## Folder Structure

```
chirpline/
├── README.md
├── .env.example
├── docker-compose.yml
├── package.json
├── next.config.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── realtime/
│   ├── index.ts
│   ├── socket.ts
│   └── rooms.ts
├── worker/
│   ├── index.ts
│   └── jobs/
│       ├── computeTrends.ts
│       ├── closePolls.ts
│       ├── schedulePosts.ts
│       ├── scoreContextNotes.ts
│       ├── deleteAccounts.ts
│       └── digests.ts
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   ├── manifest.json
│   └── sounds/
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx              # Landing
    │   ├── home/
    │   ├── explore/
    │   ├── [username]/
    │   ├── [username]/status/[id]/
    │   ├── i/lists/
    │   ├── i/topics/[slug]/
    │   ├── i/spaces/
    │   ├── search/
    │   ├── messages/
    │   ├── notifications/
    │   ├── compose/
    │   ├── settings/
    │   ├── onboarding/
    │   ├── moderation/
    │   ├── admin/
    │   ├── login/
    │   ├── register/
    │   └── policies/
    ├── components/
    │   ├── ui/
    │   ├── layout/
    │   ├── timeline/
    │   ├── post/
    │   ├── composer/
    │   ├── conversation/
    │   ├── profile/
    │   ├── lists/
    │   ├── trends/
    │   ├── search/
    │   ├── rooms/
    │   ├── context/
    │   ├── chat/
    │   ├── notifications/
    │   ├── moderation/
    │   └── animations/
    ├── hooks/
    ├── lib/
    ├── store/
    ├── config/
    └── styles/
```

---

## Prerequisites

- Node.js 18+
- PostgreSQL 15+ (or SQLite locally)
- npm or pnpm

---

## Install & Run

```bash
# 1. Clone / copy the project
# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit DATABASE_URL and NEXTAUTH_SECRET

# 4. Push database schema (uses Drizzle ORM)
# For production with PostgreSQL:
npx drizzle-kit generate
npx drizzle-kit push

# 5. Seed demo data
npx tsx prisma/seed.ts

# 6. Start the app
npm run dev

# 7. (Optional) Start the realtime server
node realtime/index.ts

# 8. (Optional) Start the background worker
node worker/index.ts
```

---

## Environment Variables

| Variable | Description | Default / Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/app_db` |
| `NEXTAUTH_URL` | App base URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Auth session secret | (required) |
| `NEXT_PUBLIC_APP_URL` | Public URL for links | `http://localhost:3000` |
| `DEMO_ENABLED` | Enable demo mode features | `true` |
| `SOCKET_SERVER_URL` | Real-time server URL | `http://localhost:3001` |

---

## Database Schema Overview

Key tables: `users`, `profiles`, `follows`, `posts`, `postEdits`, `polls`, `pollOptions`, `pollVotes`, `likes`, `reposts`, `bookmarks`, `mentions`, `hashtags`, `postHashtags`, `lists`, `listMembers`, `listFollows`, `topics`, `topicFollows`, `conversations`, `conversationMembers`, `messages`, `notifications`, `blocks`, `mutes`, `mutedWords`, `reports`, `rooms`, `roomParticipants`, `contextNotes`, `contextRatings`, `auditLogs`.

Full schema is in `prisma/schema.prisma` (or `src/db/schema.ts` for Drizzle).

---

## API Endpoints

- `GET /api/health` — Health check
- `GET /api/posts?cursor=...` — Timeline with cursor pagination
- `GET /api/posts/[id]` — Post detail with thread
- `GET /api/users/[username]` — Profile
- `POST /api/posts` — Create post (auth required)
- `POST /api/posts/[id]/like` — Like / unlike
- `POST /api/posts/[id]/repost` — Repost
- `GET /api/search?q=...` — Search with operator parsing
- `GET /api/trends` — Trending topics
- `GET /api/notifications` — Notification feed
- `POST /api/messages` — Send message
- `POST /api/reports` — Submit report
- `GET /api/admin/reports` — Moderation queue (admin)

---

## Socket.IO Events

- `post:new` — New post broadcast
- `post:updated` — Edit or delete
- `post:like` — Like count update
- `post:reply` — New reply
- `trend:update` — Trending change
- `notification:new` — Notification
- `message:new` — New message
- `message:read` — Read receipt
- `presence` — User online/offline
- `room:join`, `room:leave`, `room:speaker` — Live room events

---

## How For You & Following Timelines Work

### For You (Transparent Ranking)

Every post is scored with a documented formula:

```
Score = 0.35 * recencyScore + 0.25 * relationshipScore + 0.25 * velocityScore + 0.15 * topicScore + 0.05 * verifiedBonus
```

Where:
- `recencyScore = exp(-hours_since_post / 6)` (half-life ~6h)
- `relationshipScore`: direct follow = 0.8, mutual = 1.0, mention = 0.9
- `velocityScore = min(log1p(engagement_velocity) / 3, 1.0)`
- `topicScore`: direct match = high weight, partial = lower
- `verifiedBonus`: +0.05 for verified / organization accounts

A "Why am I seeing this?" popover shows which factors contributed (e.g., "Very recent", "Matches your interests", "From someone you follow closely").

### Following

Strictly chronological, newest first. No algorithmic reordering.

---

## How Trends Are Computed

Velocity formula (per hashtag/phrase):

```
velocity = (posts_per_hour * distinct_accounts) / max(age_hours, 1) * 0.9
```

Protection rules:
- Per-account contribution capped at 2 posts/hour
- New accounts (< 24h) discounted by 0.9
- Only distinct accounts count
- Velocity computed over the last hours (adjustable)

The exact formula and protection rules are documented here; no hidden manipulation.

---

## Search Operator Grammar

```
query         := (operator | term | phrase | exclude)*
operator      := "from:username" | "to:username" | "#tag" | "has:media" | "has:poll" | "min_likes:N" | "since:YYYY-MM-DD" | "until:YYYY-MM-DD"
phrase        := "\"...\""
exclude       := "-word"
```

The parser is injection-safe: it only builds parameterized queries and never concatenates raw user input into SQL.

---

## Protected Accounts, Blocking, Muting, Reply Restrictions

- **Protected accounts**: Only approved followers can see posts and reply. Follow requests are required.
- **Blocking**: Blocked users cannot see your content, interact with you, or appear in search results.
- **Muting**: Mute accounts, words, hashtags, or conversations. Muted content is hidden but the muted user is not notified.
- **Reply restrictions**: Set per post: `everyone`, `following`, or `mentioned` only. These are enforced on the server for every timeline, search result, notification, and socket event.

---

## Edits and Edit History

- Posts can be edited within 30 minutes of creation.
- An `edited` label appears with the edit timestamp.
- All previous versions are saved in `postEdits` for audit and transparency.
- After the window expires, the edit UI is disabled and the label remains.

---

## Context Bridging Rule (Simplified)

A context note is shown publicly when:

1. Members rate it `helpful` or `not_helpful`.
2. A simplified bridging agreement is met: `helpful_votes > not_helpful_votes` and at least one rater from a different viewpoint group has rated it `helpful`.
3. The note only appears when `different_viewpoints_agree = true`.

This is a simplified version of a bridging-based agreement algorithm. Full production systems should use more robust statistical methods and larger rater pools.

---

## Live Rooms & WebRTC Fallback

- Rooms have `scheduled`, `live`, and `ended` states.
- WebRTC mesh supports up to 6 speakers.
- If WebRTC is unavailable (permission denied or unsupported), the room falls back to a simulated UI with a live chat, speaker indicators, and listener count animations.
- No audio streams are transmitted without explicit user permission.

---

## Moderation Flow

1. User submits a report with a reason.
2. Report enters the moderation queue (`reports` table, status `pending`).
3. Moderator reviews context, can take actions: `dismiss`, `label`, `remove_content`, `warn`, `limit_reach` (with public disclosure label), `suspend`.
4. Affected users receive transparency messages.
5. Users can appeal (`appeals`).
6. All actions are logged in `auditLogs`.

Labels disclose the limitation: e.g., "Reach limited by moderation team — see transparency message."

---

## Adding a New Topic, List, or Seed User

- **Topic**: Add to the `topics` table with `slug`, `name`, `description`, and optional `imageUrl`. Trending is computed automatically by the worker.
- **List**: Create via the list settings with `name`, `description`, `isPrivate`, and add members via `listMembers`.
- **Seed user**: Insert into `users` and `profiles`, then run `prisma/seed.ts` or insert directly.

---

## Demo Account Credentials

| Role | Username | Email | Notes |
|---|---|---|---|
| Admin | `alice` | `alice@demo.com` | Full access |
| Moderator | `bob` | `bob@demo.com` | Moderation tools |
| Protected | `carol` | `carol@demo.com` | Protected account; follow requests required |
| Member | `dave` | `dave@demo.com` | Standard user |

---

## Deployment Guide

- **App**: Deploy to Vercel (Next.js). Ensure `DATABASE_URL` points to a PostgreSQL instance.
- **Realtime server**: Deploy to Render / Railway. Runs as a separate Node process (see `realtime/`).
- **Worker**: Deploy to Render / Railway. Runs `node worker/index.ts` with `node-cron` schedules.
- **Database**: Neon or Supabase (free tier) for PostgreSQL. Switch `DATABASE_URL` accordingly.
- **Search (production)**: Consider Meilisearch or Typesense for full-text search; the parser is designed to compile to safe parameterized queries for both PostgreSQL and dedicated search engines.

---

## Media & Data Sources

All URLs are centralized in `src/config/media.ts`. Each entry includes a fallback (dark gradient + abstract chat-wave icon), lazy loading, blur-up placeholders, posters for videos, and credits.

- Photos: Unsplash (`photo-...`) and Pexels (`video-files/...`)
- Avatars: DiceBear (`api.dicebear.com`)
- Icons: Lucide (free, MIT)
- Sounds: Pixabay Audio / Freesound (CC0) — off by default; no autoplay with sound
- Lottie animations: LottieFiles (recolored to signal palette)

Credits listed in the footer's "Credits" section.

---

## Security & Safety Notes

- All user text is sanitized before display; no raw HTML is rendered.
- Links and media are validated (allowed protocols, domain allow-lists, content-type checks, SSRF protection with private-IP blocking).
- All server endpoints enforce authorization (protected accounts, private lists, blocked/muted users, deleted content, reply restrictions, message requests).
- Rate limits are applied to auth, posting, messaging, and search.
- Basic spam controls: new-account limits, duplicate-content detection, link/mention limits, follow churn detection, honeypot fields.
- Transactions with idempotency protect counters from double-tap duplication.
- Socket connections are authenticated; room-level permissions are checked.

---

## Legal & Compliance Notes (Mandatory Before Launch)

Requirements vary by country. This list is **not legal advice** — consult an attorney.

- **Minimum age & children's privacy**: COPPA (US) requires verifiable parental consent for users under 13. GDPR-K (EU) sets similar thresholds. Implement age gates and parental consent flows.
- **Privacy policy & consent**: Clear, accessible privacy policy; cookie consent banner; data processing agreement if processing EU data.
- **Content moderation duties**: Illegal content reporting mechanisms, timely removal obligations, transparency reporting (DSA in EU), and moderation staff training.
- **Copyright (DMCA)**: Designated agent registration, takedown process, repeat-infringer policy.
- **Misinformation & election content**: Labeling policies, escalation procedures, and cooperation with election authorities where required.
- **Data export & deletion**: GDPR Article 20 portability; right to erasure; deletion grace period; confirmation emails.
- **Terms of service**: User conduct rules, intellectual property licensing, limitation of liability, arbitration clauses (where permitted), and termination policies.

---

## License

MIT (or your preferred open-source license). All original artwork, code, and design elements are released under this license. Third-party assets retain their original licenses.

---

## Future Improvements

- Full WebRTC audio rooms with speaker ring animation
- Article editor (Tiptap / Lexical) for long-form content
- Advanced moderation analytics with deeper Recharts dashboards
- Multi-language support (i18n with locale-aware search)
- Native mobile apps (React Native / Expo)
- End-to-end encrypted messages (optional)
- Federated protocol support (optional ActivityPub integration)

---

*Chirpline is an original, independent demo. Not affiliated with any platform. All data is fictional. Seek legal advice before launching to production.*

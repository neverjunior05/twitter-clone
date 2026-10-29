import { db } from "@/db";
import { users, profiles, follows, posts, hashtags, postHashtags, likes, lists, listMembers, topics, notifications, rooms, roomParticipants, contextNotes, contextRatings, reports, conversations, conversationMembers, messages } from "@/db/schema";

async function seed() {
  console.log("Seeding Chirpline demo data...");

  // 1. Create users
  const userIds: number[] = [];
  const seedUsers = [
    { email: "alice@demo.com", username: "alice", displayName: "Alice Rivera", role: "admin", isProtected: false, isVerified: true },
    { email: "bob@demo.com", username: "bob", displayName: "Bob Chen", role: "moderator", isProtected: false, isVerified: false },
    { email: "carol@demo.com", username: "carol", displayName: "Carol Wu", role: "moderator", isProtected: true, isVerified: true },
    { email: "dave@demo.com", username: "dave", displayName: "Dave Park", role: "member", isProtected: false, isVerified: false },
    { email: "eve@demo.com", username: "eve", displayName: "Eve Nakamura", role: "member", isProtected: false, isVerified: false },
    { email: "frank@demo.com", username: "frank", displayName: "Frank Miller", role: "admin", isProtected: false, isVerified: true, isOrganization: true },
    { email: "grace@demo.com", username: "grace", displayName: "Grace Kim", role: "member", isProtected: false, isVerified: false },
    { email: "henry@demo.com", username: "henry", displayName: "Henry Lee", role: "member", isProtected: false, isVerified: false },
    { email: "ivy@demo.com", username: "ivy", displayName: "Ivy Brown", role: "moderator", isProtected: false, isVerified: true },
    { email: "jack@demo.com", username: "jack", displayName: "Jack Wilson", role: "member", isProtected: false, isVerified: false },
  ];

  for (const u of seedUsers) {
    const [newUser] = await db.insert(users).values({
      ...u,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`,
    }).returning({ id: users.id });
    userIds.push(newUser.id);

    await db.insert(profiles).values({
      userId: newUser.id,
      bio: "Building something new every day. Thoughts on tech, design, and the future of the web.",
      location: "San Francisco, CA",
      linkUrl: "https://example.com",
      pinnedPostId: null,
    }).onConflictDoNothing();
  }

  // 2. Create more users for demo (batch insert of remaining 30)
  const extraNames = [
    "Liam", "Olivia", "Noah", "Emma", "James", "Ava", "William", "Sophia", "Benjamin", "Isabella",
    "Lucas", "Mia", "Henry", "Charlotte", "Alexander", "Amelia", "Michael", "Harper", "Ethan", "Evelyn",
    "Daniel", "Abigail", "Matthew", "Emily", "Joseph", "Elizabeth", "David", "Sofia", "Samuel", "Avery"
  ];
  for (let i = 0; i < 30; i++) {
    const name = extraNames[i] || `user${i}`;
    const username = name.toLowerCase().replace(/[^a-z]/g, "") + (i > 9 ? i.toString() : "0" + i);
    const email = `${username}@demo.com`;
    const [newU] = await db.insert(users).values({
      email,
      username,
      displayName: name + " " + (i % 3 === 0 ? "Smith" : i % 2 === 0 ? "Johnson" : "Lee"),
      role: i % 7 === 0 ? "moderator" : "member",
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    }).returning({ id: users.id });
    userIds.push(newU.id);
    await db.insert(profiles).values({
      userId: newU.id,
      bio: "Just exploring.",
      location: "Somewhere",
      linkUrl: null,
    }).onConflictDoNothing();
  }

  // 3. Follows
  for (let i = 0; i < userIds.length; i++) {
    const followerId = userIds[i];
    const targets = userIds.filter((_, idx) => idx !== i && idx < i + 5);
    for (const targetId of targets) {
      await db.insert(follows).values({ followerId, followingId: targetId }).onConflictDoNothing();
    }
  }

  // 4. Posts
  const postTexts = [
    "Just launched the first build of our new real-time feed. The signal pulse on every update is mesmerizing.",
    "Breaking: the way we think about micro-conversations is changing. Threads should feel like rooms, not walls.",
    "Working on a new design system called Signal Newsroom. Dark mode is the default. Light is the exception.",
    "What's the best way to handle reply restrictions? I lean toward granular controls rather than binary choices.",
    "Live rooms are tricky with mesh WebRTC. Fallback UI needs to feel just as engaging when audio isn't available.",
    "Has anyone tried using bridging agreement for context notes? The math is interesting.",
    "Poll results are rolling in: 68% say threads improve conversation quality.",
    "A reminder: every count on the timeline is honest. No inflated engagement, no fake urgency.",
    "The new command palette (Ctrl+K) makes navigating posts incredibly fast.",
    "Design note: hairlines at 1px with reduced alpha look sharper than borders at 100% opacity.",
  ];

  const postIds: number[] = [];
  for (let i = 0; i < 100; i++) {
    const author = userIds[i % userIds.length];
    const text = i < postTexts.length ? postTexts[i] : `Thought #${i}: exploring the edge cases of real-time timelines.`;
    const [post] = await db.insert(posts).values({
      authorId: author,
      content: text,
      replySetting: i % 5 === 0 ? "following" : "everyone",
      mediaUrls: i % 7 === 2 ? ["https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&q=80"] : [],
      isPoll: i % 12 === 3,
      viewCount: Math.floor(Math.random() * 500) + 10,
      likeCount: Math.floor(Math.random() * 80) + 1,
      replyCount: Math.floor(Math.random() * 15),
      repostCount: Math.floor(Math.random() * 20),
    }).returning({ id: posts.id });
    postIds.push(post.id);

    // Random likes
    for (let l = 0; l < Math.floor(Math.random() * 5) + 1; l++) {
      const liker = userIds[(i + l + 3) % userIds.length];
      await db.insert(likes).values({ userId: liker, postId: post.id }).onConflictDoNothing();
    }
  }

  // 5. Threads (replies)
  for (let i = 0; i < 50; i++) {
    const parentId = postIds[i % postIds.length];
    const [reply] = await db.insert(posts).values({
      authorId: userIds[(i + 2) % userIds.length],
      content: `Reply to the thread: this is an interesting perspective. I think there's more nuance here.`,
      parentId,
      replySetting: "everyone",
      replyCount: 0,
      likeCount: Math.floor(Math.random() * 5),
      repostCount: Math.floor(Math.random() * 2),
    }).returning({ id: posts.id });
  }

  // 6. Hashtags
  const tags = ["tech", "design", "realtime", "threads", "microblogging", "signal", "newsroom", "conversations", "live", "poll"];
  for (const tag of tags) {
    await db.insert(hashtags).values({ tag, postCount: Math.floor(Math.random() * 30) + 5 }).onConflictDoNothing();
  }

  // 7. Context notes
  for (let i = 0; i < 8; i++) {
    const [note] = await db.insert(contextNotes).values({
      postId: postIds[i % postIds.length],
      noteText: "This post references a study that needs additional context about methodology.",
      proposedBy: userIds[2],
      status: i % 3 === 0 ? "helpful" : i % 4 === 0 ? "pending" : "not_helpful",
      helpfulVotes: Math.floor(Math.random() * 20) + 1,
      notHelpfulVotes: Math.floor(Math.random() * 8),
      differentViewpointsAgree: i % 3 === 0,
    }).returning({ id: contextNotes.id });
  }

  // 8. Lists
  for (let i = 0; i < 10; i++) {
    const owner = userIds[i % userIds.length];
    const [list] = await db.insert(lists).values({
      ownerId: owner,
      name: `List ${i + 1}: ${i % 2 === 0 ? "Designers" : "Developers"}`,
      description: "Curated accounts for this topic.",
      isPrivate: i % 4 === 0,
    }).returning({ id: lists.id });

    for (let j = 0; j < 3; j++) {
      await db.insert(listMembers).values({
        listId: list.id,
        userId: userIds[(i + j + 5) % userIds.length],
        addedBy: owner,
      }).onConflictDoNothing();
    }
  }

  // 9. Topics
  const topicNames = [
    { slug: "tech", name: "Technology" },
    { slug: "design", name: "Design" },
    { slug: "science", name: "Science" },
    { slug: "music", name: "Music" },
    { slug: "sports", name: "Sports" },
    { slug: "food", name: "Food" },
    { slug: "travel", name: "Travel" },
    { slug: "campus", name: "Campus Life" },
    { slug: "news", name: "Current Events" },
    { slug: "art", name: "Art & Culture" },
    { slug: "health", name: "Health" },
    { slug: "business", name: "Business" },
  ];
  for (const t of topicNames) {
    await db.insert(topics).values({ ...t, isTrending: t.slug === "tech" || t.slug === "design" }).onConflictDoNothing();
  }

  // 10. Conversations and messages
  const [conv1] = await db.insert(conversations).values({ name: "Alice & Bob", isGroup: false }).returning({ id: conversations.id });
  await db.insert(conversationMembers).values([
    { conversationId: conv1.id, userId: userIds[0] },
    { conversationId: conv1.id, userId: userIds[1] },
  ]);
  await db.insert(messages).values({
    conversationId: conv1.id,
    senderId: userIds[0],
    text: "Hey! Did you see the new timeline design?",
  });

  // 11. Notifications
  await db.insert(notifications).values({
    userId: userIds[1],
    actorId: userIds[0],
    type: "like",
    postId: postIds[0],
    message: "Alice liked your post",
  });

  // 12. Rooms
  const [liveRoom] = await db.insert(rooms).values({
    name: "Live Design Review",
    hostId: userIds[0],
    status: "live",
    startedAt: new Date(Date.now() - 30 * 60 * 1000),
  }).returning({ id: rooms.id });
  await db.insert(roomParticipants).values([
    { roomId: liveRoom.id, userId: userIds[0], role: "host" },
    { roomId: liveRoom.id, userId: userIds[2], role: "co_host" },
  ]);

  // 13. Reports
  await db.insert(reports).values({
    reporterId: userIds[3],
    contentType: "post",
    contentId: postIds[5],
    reason: "Inaccurate claim about statistics.",
    status: "pending",
  });

  console.log("Seeding complete.");
  console.log("Demo accounts:");
  console.log("  Admin: alice@demo.com / alice");
  console.log("  Moderator: bob@demo.com / bob");
  console.log("  Protected: carol@demo.com / carol");
  console.log("  Member: dave@demo.com / dave");
}

seed().catch(console.error);

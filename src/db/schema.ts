// @ts-nocheck — self-referencing Drizzle schema tables cause circular inference
import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  varchar,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 32 }).notNull().unique(),
  displayName: text("display_name").notNull(),
  avatarUrl: text("avatar_url"),
  bannerUrl: text("banner_url"),
  bio: text("bio"),
  location: text("location"),
  linkUrl: text("link_url"),
  role: varchar("role", { length: 20 }).notNull().default("member"), // member, moderator, admin
  isProtected: boolean("is_protected").notNull().default(false),
  isVerified: boolean("is_verified").notNull().default(false),
  isOrganization: boolean("is_organization").notNull().default(false),
  theme: varchar("theme", { length: 20 }).notNull().default("dark"),
  reducedMotion: boolean("reduced_motion").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const profiles = pgTable("profiles", {
  userId: integer("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  bio: text("bio"),
  location: text("location"),
  linkUrl: text("link_url"),
  bannerUrl: text("banner_url"),
  pinnedPostId: integer("pinned_post_id"),
  followerCount: integer("follower_count").notNull().default(0),
  followingCount: integer("following_count").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const follows = pgTable("follows", {
  followerId: integer("follower_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  followingId: integer("following_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.followerId, t.followingId] }),
}));

export const followRequests = pgTable("follow_requests", {
  id: serial("id").primaryKey(),
  requesterId: integer("requester_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetId: integer("target_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  parentId: integer("parent_id").references(() => posts.id as any, { onDelete: "cascade" }),
  threadRootId: integer("thread_root_id"),
  quotePostId: integer("quote_post_id").references(() => posts.id, { onDelete: "cascade" }),
  mediaUrls: jsonb("media_urls").default([]).$type<string[]>(),
  altTexts: jsonb("alt_texts").default([]).$type<string[]>(),
  replySetting: varchar("reply_setting", { length: 30 }).notNull().default("everyone"), // everyone, following, mentioned
  isPoll: boolean("is_poll").notNull().default(false),
  isEdited: boolean("is_edited").notNull().default(false),
  editedAt: timestamp("edited_at"),
  isDeleted: boolean("is_deleted").notNull().default(false),
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  replyCount: integer("reply_count").notNull().default(0),
  repostCount: integer("repost_count").notNull().default(0),
  bookmarkCount: integer("bookmark_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  authorIdx: index("post_author_idx").on(t.authorId),
  createdIdx: index("post_created_idx").on(t.createdAt),
}));

export const postEdits = pgTable("post_edits", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  previousContent: text("previous_content").notNull(),
  editedAt: timestamp("edited_at").notNull().defaultNow(),
});

export const polls = pgTable("polls", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  durationMinutes: integer("duration_minutes").notNull(),
  closesAt: timestamp("closes_at").notNull(),
  isClosed: boolean("is_closed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pollOptions = pgTable("poll_options", {
  id: serial("id").primaryKey(),
  pollId: integer("poll_id").notNull().references(() => polls.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  voteCount: integer("vote_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pollVotes = pgTable("poll_votes", {
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  optionId: integer("option_id").notNull().references(() => pollOptions.id, { onDelete: "cascade" }),
  votedAt: timestamp("voted_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.optionId] }),
}));

export const likes = pgTable("likes", {
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.postId] }),
}));

export const reposts = pgTable("reposts", {
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  quoteContent: text("quote_content"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.postId] }),
}));

export const bookmarks = pgTable("bookmarks", {
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.postId] }),
}));

export const mentions = pgTable("mentions", {
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  mentionedUserId: integer("mentioned_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.postId, t.mentionedUserId] }),
}));

export const hashtags = pgTable("hashtags", {
  id: serial("id").primaryKey(),
  tag: varchar("tag", { length: 64 }).notNull().unique(),
  postCount: integer("post_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const postHashtags = pgTable("post_hashtags", {
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  hashtagId: integer("hashtag_id").notNull().references(() => hashtags.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: primaryKey({ columns: [t.postId, t.hashtagId] }),
}));

export const lists = pgTable("lists", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  isPrivate: boolean("is_private").notNull().default(false),
  memberCount: integer("member_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const listMembers = pgTable("list_members", {
  listId: integer("list_id").notNull().references(() => lists.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  addedBy: integer("added_by").notNull().references(() => users.id, { onDelete: "cascade" }),
  addedAt: timestamp("added_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.listId, t.userId] }),
}));

export const listFollows = pgTable("list_follows", {
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  listId: integer("list_id").notNull().references(() => lists.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.listId] }),
}));

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  isTrending: boolean("is_trending").notNull().default(false),
  velocityScore: integer("velocity_score").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const topicFollows = pgTable("topic_follows", {
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  topicId: integer("topic_id").notNull().references(() => topics.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.topicId] }),
}));

export const savedSearches = pgTable("saved_searches", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  query: text("query").notNull(),
  label: text("label"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  name: text("name"),
  isGroup: boolean("is_group").notNull().default(false),
  lastMessageAt: timestamp("last_message_at").defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const conversationMembers = pgTable("conversation_members", {
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.conversationId, t.userId] }),
}));

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  senderId: integer("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  mediaUrl: text("media_url"),
  replyToMessageId: integer("reply_to_message_id").references(() => messages.id),
  isRead: boolean("is_read").notNull().default(false),
  isUnsent: boolean("is_unsent").notNull().default(false),
  readBy: jsonb("read_by").default([]).$type<number[]>(),
  reactions: jsonb("reactions").default([]).$type<{ userId: number; emoji: string }[]>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  actorId: integer("actor_id").references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 30 }).notNull(), // like, reply, mention, repost, quote, follow, poll_end, context, list_add, message_request
  postId: integer("post_id").references(() => posts.id, { onDelete: "cascade" }),
  message: text("message"),
  isRead: boolean("is_read").notNull().default(false),
  grouped: boolean("grouped").notNull().default(false),
  groupKey: text("group_key"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  userIdx: index("notif_user_idx").on(t.userId),
  createdIdx: index("notif_created_idx").on(t.createdAt),
}));

export const blocks = pgTable("blocks", {
  blockerId: integer("blocker_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  blockedId: integer("blocked_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.blockerId, t.blockedId] }),
}));

export const mutes = pgTable("mutes", {
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetType: varchar("target_type", { length: 20 }).notNull(), // account, word, hashtag, conversation
  targetValue: text("target_value").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.targetType, t.targetValue] }),
}));

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  reporterId: integer("reporter_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  contentType: varchar("content_type", { length: 20 }).notNull(), // post, account, list, message
  contentId: integer("content_id").notNull(),
  reason: text("reason").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, reviewed, dismissed, action_taken
  actionTaken: text("action_taken"),
  resolvedBy: integer("resolved_by").references(() => users.id),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  hostId: integer("host_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 20 }).notNull().default("scheduled"), // scheduled, live, ended
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  maxSpeakers: integer("max_speakers").notNull().default(6),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const roomParticipants = pgTable("room_participants", {
  roomId: integer("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 20 }).notNull().default("listener"), // host, co_host, speaker, listener
  raisedHand: boolean("raised_hand").notNull().default(false),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.roomId, t.userId] }),
}));

export const contextNotes = pgTable("context_notes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  noteText: text("note_text").notNull(),
  proposedBy: integer("proposed_by").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, helpful, not_helpful, rejected
  helpfulVotes: integer("helpful_votes").notNull().default(0),
  notHelpfulVotes: integer("not_helpful_votes").notNull().default(0),
  differentViewpointsAgree: boolean("different_viewpoints_agree").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contextRatings = pgTable("context_ratings", {
  noteId: integer("note_id").notNull().references(() => contextNotes.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  rating: varchar("rating", { length: 10 }).notNull(), // helpful, not_helpful
  userViewpoint: text("user_viewpoint").notNull().default("neutral"),
  ratedAt: timestamp("rated_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.noteId, t.userId] }),
}));

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").references(() => users.id),
  action: text("action").notNull(),
  targetType: text("target_type").notNull(),
  targetId: integer("target_id"),
  details: jsonb("details").default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many, one }) => ({
  profile: one(profiles, { fields: [users.id], references: [profiles.userId] }),
  posts: many(posts),
  likes: many(likes),
  reposts: many(reposts),
  bookmarks: many(bookmarks),
  follows: many(follows, { relationName: "following" }),
  followers: many(follows, { relationName: "followers" }),
}));

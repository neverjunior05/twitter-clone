export const site = {
  name: "Chirpline",
  tagline: "Live conversations. Real-time signal.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  description:
    "An independent demo microblogging platform. NOT affiliated with any existing company. All content is fictional test data.",
};

export const demoAccounts = {
  admin: { username: "alice", email: "alice@demo.com", password: "password" },
  moderator: { username: "bob", email: "bob@demo.com", password: "password" },
  protected: { username: "carol", email: "carol@demo.com", password: "password" },
  member: { username: "dave", email: "dave@demo.com", password: "password" },
};

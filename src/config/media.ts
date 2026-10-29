export interface MediaSource {
  url: string;
  alt: string;
  credit?: string;
  fallback?: string;
}

export interface TopicMedia {
  image: MediaSource;
  bgGradient: string;
}

export const siteConfig = {
  name: "Chirpline",
  tagline: "Live conversations. Real-time signal.",
  description:
    "Chirpline is an independent demo microblogging platform. It is NOT affiliated with any existing company. All user content is fictional test data.",
  url: "https://chirpline.demo",
  ogImage: "/og-image.png",
};

export const avatarSources = {
  dicebear: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
  notidenticons: "https://api.dicebear.com/7.x/notionists/svg?seed=",
};

export const stockPhotos = {
  cityNight: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
  codingLaptop: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  stadiumLights: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80",
  concertStage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
  laboratory: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
  streetFood: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
  mountainSunrise: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  libraryStudy: "https://images.unsplash.com/photo-1481627834876-a9cc11f4789e?w=800&q=80",
  robotTech: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
};

export const videoSources = [
  {
    url: "https://videos.pexels.com/video-files/3129671/3129671-hd_1280_720_25fps.mp4",
    poster: stockPhotos.cityNight,
  },
  {
    url: "https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4",
    poster: stockPhotos.codingLaptop,
  },
];

export const soundSources = {
  pop: "/sounds/pop.mp3",
  ping: "/sounds/ping.mp3",
};

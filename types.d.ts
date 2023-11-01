type Locale = "en" | "th";

type Robots = {
  rules:
    | {
        userAgent?: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
      }
    | Array<{
        userAgent: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
      }>;
  sitemap?: string | string[];
  host?: string;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// Site-wide settings. Everything personal lives here or in src/styles/theme.css,
// so the rest of the code can be reused as a template.

export interface NavItem {
  /** Path relative to the language root, e.g. "/posts/", or a full URL for another site */
  href: string;
  label: string;
}

export interface LocaleConfig {
  /** Shown in the language switcher */
  label: string;
  /** Value for <html lang> */
  htmlLang: string;
  /** Site name in the header and <title> */
  title: string;
  description: string;
  author: string;
  nav: NavItem[];
  /** Interface strings */
  ui: {
    recentPosts: string;
    allPosts: string;
    projects: string;
    readMore: string;
    visitSite: string;
    toggleTheme: string;
    notFound: string;
    backHome: string;
    rss: string;
    all: string;
    /** Names of the life-timeline types */
    lifeTypes: Record<'travel' | 'museum' | 'event' | 'city' | 'hobby' | 'book' | 'film', string>;
    present: string;
  };
  dateFormat: Intl.DateTimeFormatOptions;
}

export interface Social {
  label: string;
  href: string;
  /** Icon name from src/components/Icon.astro */
  icon: 'github' | 'mail' | 'linkedin' | 'bilibili' | 'rss';
}

const config = {
  url: 'https://weijinqi.com',

  /** Served at "/"; other locales are served at "/<code>/" */
  defaultLocale: 'en',

  locales: {
    en: {
      label: 'English',
      htmlLang: 'en',
      title: 'Silence Mountain',
      description: "Wei Jinqi's blog on robotics, software and life.",
      author: 'Wei Jinqi',
      nav: [
        { href: '/posts/', label: 'Posts' },
        { href: '/projects/', label: 'Projects' },
        { href: '/life/', label: 'Life' },
        { href: '/cv/', label: 'CV' },
        { href: '/links/', label: 'Links' },
        { href: 'https://silvermoon.weijinqi.com', label: 'Notes' },
      ],
      ui: {
        recentPosts: 'Recent posts',
        allPosts: 'All posts',
        projects: 'Projects',
        readMore: 'Read more',
        visitSite: 'Visit site',
        toggleTheme: 'Toggle dark mode',
        notFound: 'Page not found.',
        backHome: 'Back to home',
        rss: 'RSS',
        all: 'All',
        lifeTypes: { travel: 'Travel', museum: 'Museums', event: 'Events', city: 'Cities', hobby: 'Hobbies', book: 'Books', film: 'Films' },
        present: 'now',
      },
      dateFormat: { year: 'numeric', month: 'short', day: 'numeric' },
    },
    zh: {
      label: '中文',
      htmlLang: 'zh-CN',
      title: '墨山',
      description: '魏锦启的博客。',
      author: '魏锦启',
      nav: [
        { href: '/posts/', label: '文章' },
        { href: '/projects/', label: '项目' },
        { href: '/life/', label: '生活' },
        { href: '/cv/', label: '简历' },
        { href: '/links/', label: '链接' },
        { href: 'https://silvermoon.weijinqi.com', label: '笔记' },
      ],
      ui: {
        recentPosts: '最近文章',
        allPosts: '全部文章',
        projects: '项目',
        readMore: '阅读全文',
        visitSite: '访问项目站',
        toggleTheme: '切换夜间模式',
        notFound: '页面不存在。',
        backHome: '返回首页',
        rss: 'RSS',
        all: '全部',
        lifeTypes: { travel: '旅行', museum: '博物馆', event: '活动', city: '城市', hobby: '爱好', book: '书', film: '电影' },
        present: '至今',
      },
      dateFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
    },
  } satisfies Record<string, LocaleConfig>,

  socials: [
    { label: 'GitHub', href: 'https://github.com/Bardreamaster', icon: 'github' },
    { label: 'Email', href: 'mailto:changshanshi@outlook.com', icon: 'mail' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jinqi-wei-b0b5321ba', icon: 'linkedin' },
    { label: 'Bilibili', href: 'https://space.bilibili.com/65587148', icon: 'bilibili' },
  ] satisfies Social[],

  /** Content license shown in the footer; set to null to hide */
  license: { label: 'CC BY-SA 4.0', href: 'https://creativecommons.org/licenses/by-sa/4.0/' } as
    | { label: string; href: string }
    | null,

  /** Avatar shown on the home page and in share cards: a file in src/assets/, or '' to hide */
  avatar: 'avatar.jpg',

  /**
   * Colours of the generated share-card images (og:image).
   * Hex, because the image renderer does not read CSS; keep them close to theme.css.
   */
  ogColors: { background: '#fcfcf9', foreground: '#1e2227', muted: '#696f77', accent: '#5c3c95' },

  /** Number of posts listed on the home page */
  homePostCount: 8,

  /** Shiki themes for code blocks (https://shiki.style/themes) */
  codeTheme: { light: 'github-light', dark: 'github-dark' },

  /** Cloudflare Web Analytics token; leave empty to disable (no cookies either way) */
  cloudflareAnalyticsToken: '',
};

export type Locale = keyof typeof config.locales;
export default config;

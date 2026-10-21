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
    /** Entry pages: table of contents, back and back-to-top buttons */
    toc: string;
    back: string;
    backToTop: string;
    /** Image viewer */
    close: string;
    previous: string;
    next: string;
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
        // { href: 'https://silvermoon.weijinqi.com', label: 'Notes' },
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
        toc: 'Contents',
        back: 'Back',
        backToTop: 'Back to top',
        close: 'Close',
        previous: 'Previous',
        next: 'Next',
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
        // { href: 'https://silvermoon.weijinqi.com', label: '笔记' },
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
        toc: '目录',
        back: '返回',
        backToTop: '回到顶部',
        close: '关闭',
        previous: '上一张',
        next: '下一张',
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

  /**
   * Logo next to the site name: a file in public/, or '' to hide. Its shape is used as a mask
   * and painted in the text colour, so use one-colour artwork on transparent (SVG is best).
   */
  logo: '/logo.svg',

  /** Avatar shown on the home page and in share cards: a file in src/assets/, or '' to hide */
  avatar: 'avatar.jpg',

  /**
   * Colours of the generated share-card images (og:image).
   * Hex, because the image renderer does not read CSS; keep them close to theme.css.
   */
  ogColors: { background: '#fcfcf9', foreground: '#1e2227', muted: '#696f77', accent: '#6d2597' },

  /**
   * Web font loaded on top of the system fonts, or null for system fonts only.
   * Put its family name first in --font-sans in theme.css. With skipWhenSaving, visitors
   * on data saver, a 2G-class connection or (where the browser tells) mobile data keep
   * the system font. Browsers that don't report this, like Safari, always get the web font.
   */
  webFont: { css: '/fonts/misans/misans.css', skipWhenSaving: true } as { css: string; skipWhenSaving: boolean } | null,

  /**
   * Table of contents on posts and projects. It shows the two highest heading levels used in
   * the entry, and only when the entry has at least `minHeadings` of them.
   */
  toc: { minHeadings: 3 },

  /**
   * Compression of the images Astro generates (all served as WebP; see src/lib/image-service.ts).
   * `photo` is for JPEG and other sources: lossy, quality 0-100 (Sharp's default is 80, which
   * smears fine detail). `graphic` is for PNG sources such as screenshots and diagrams: lossless
   * keeps text and edges crisp and is often smaller than lossy for them. `effort` 0-6 trades
   * build time for smaller files. Changing this needs the image cache cleared
   * (node_modules/.astro) before the next build.
   */
  imageQuality: {
    photo: { quality: 90, effort: 6 },
    graphic: { lossless: true, effort: 6 },
  },

  /** Number of posts listed on the home page */
  homePostCount: 7,

  /** Shiki themes for code blocks (https://shiki.style/themes) */
  codeTheme: { light: 'github-light', dark: 'github-dark' },

  /**
   * Whether AI crawlers (ChatGPT, Claude, Perplexity, Gemini training…) may read the site.
   * 'allow' also publishes /llms.txt, a plain index of the site for AI tools.
   * Search engines are always allowed. Cloudflare has its own "block AI bots" switch; keep the two in agreement.
   */
  aiCrawlers: 'allow' as 'allow' | 'block',

  /**
   * Site search (Pagefind, built after `astro build`).
   * allLanguages: true searches every language from every page (content here is not a 1:1 translation);
   * false keeps one index per language. A combined index is processed with the rules of one language:
   * a CJK one if any locale is CJK (so Chinese text gets split into words), otherwise the default locale.
   * The trade-off is that English words are no longer reduced to their stem ("robots" won't find "robot").
   */
  search: { allLanguages: true },

  /** Cloudflare Web Analytics token; leave empty to disable (no cookies either way) */
  cloudflareAnalyticsToken: '',
};

export type Locale = keyof typeof config.locales;
export default config;

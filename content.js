// FocusedFeeds

const YOUTUBE_SUBSCRIPTIONS_URL = "https://www.youtube.com/feed/subscriptions";
const INSTAGRAM_INBOX_URL = "https://www.instagram.com/direct/inbox/";

// Redirect YouTube Shorts to subscriptions
function checkAndRedirectShorts() {
  if (window.location.pathname.includes("/shorts/")) {
    window.location.replace(YOUTUBE_SUBSCRIPTIONS_URL);
  }
}

// Redirect Instagram Reels to inbox
function checkAndRedirectReels() {
  if (window.location.pathname.includes("/reels/")) {
    window.location.replace(INSTAGRAM_INBOX_URL);
  }
}

// Redirect Instagram Explore to inbox
function checkAndRedirectExplore() {
  const path = window.location.pathname;
  if (path.includes("/explore/") || path === "/explore") {
    window.location.replace(INSTAGRAM_INBOX_URL);
  }
}

// Remove all YouTube Shorts elements
function removeShorts() {
  // Remove sidebar Shorts button
  const sidebarShorts = document.querySelectorAll(
    'ytd-guide-entry-renderer a[title="Shorts"], ytd-guide-entry-renderer a[href*="/shorts"]'
  );
  sidebarShorts.forEach((element) => {
    const parent = element.closest("ytd-guide-entry-renderer");
    if (parent) parent.remove();
  });

  // Remove Shorts shelf on homepage
  const shortsShelf = document.querySelectorAll(
    "ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts]"
  );
  shortsShelf.forEach((element) => element.remove());

  // Remove Shorts videos and prevent clicks
  const shortsVideos = document.querySelectorAll('a[href*="/shorts/"]');
  shortsVideos.forEach((link) => {
    link.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = YOUTUBE_SUBSCRIPTIONS_URL;
      },
      { once: true }
    );

    const videoItem = link.closest(
      "ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer"
    );
    if (videoItem) videoItem.remove();
  });

  // Remove Shorts from various locations
  const additionalSelectors = [
    "ytd-rich-section-renderer:has([is-shorts])",
    'ytd-rich-item-renderer:has(a[href*="/shorts/"])',
    'ytd-video-renderer:has(a[href*="/shorts/"])',
    'ytd-grid-video-renderer:has(a[href*="/shorts/"])',
    'ytd-compact-video-renderer:has(a[href*="/shorts/"])',
  ];

  additionalSelectors.forEach((selector) => {
    try {
      document
        .querySelectorAll(selector)
        .forEach((element) => element.remove());
    } catch (e) {
      // Silently continue if selector fails
    }
  });
}

// Hide YouTube comments
function removeComments() {
  const commentSelectors = document.querySelectorAll(
    "ytd-comments#comments, ytd-comments, #comments"
  );
  commentSelectors.forEach((element) => {
    element.style.display = "none";
  });
}

// Hide element helper
function hideElement(element) {
  if (element) element.style.display = "none";
}

// Prevent click and redirect helper
function preventClickAndRedirect(link, redirectUrl) {
  link.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = redirectUrl;
    },
    { capture: true }
  );
}

// Remove Instagram Reels from navigation and feed
function removeInstagramReels() {
  // Remove Reels from sidebar navigation
  const reelsSelectors = [
    'a[href*="/reels/"]',
    'a[href="/reels"]',
    'a[href="#reels"]',
  ];

  reelsSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((link) => {
      if (
        link.href &&
        (link.href.includes("/reels") || link.href.endsWith("#reels"))
      ) {
        const parent = link.closest('div[role="link"], li, div, a');
        hideElement(parent);
      }
    });
  });

  // Remove Reels posts from feed
  document.querySelectorAll('a[href*="/reel/"]').forEach((link) => {
    const postContainer = link.closest('article, div[role="presentation"]');
    hideElement(postContainer);
    preventClickAndRedirect(link, INSTAGRAM_INBOX_URL);
  });

  // Prevent clicks on all Reels links
  document
    .querySelectorAll('a[href*="/reel/"], a[href*="/reels/"]')
    .forEach((link) => preventClickAndRedirect(link, INSTAGRAM_INBOX_URL));
}

// Remove Instagram Explore and suggested posts
function removeInstagramExploreAndSuggested() {
  // Remove Explore links from navigation
  const exploreSelectors = [
    'a[href*="/explore/"]',
    'a[href="/explore"]',
    'a[href="#explore"]',
  ];

  exploreSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((link) => {
      if (
        link.href &&
        (link.href.includes("/explore") || link.href.endsWith("#explore"))
      ) {
        const parent = link.closest('div[role="link"], li, div, a');
        hideElement(parent);
      }
    });
  });

  // Prevent clicks on Explore links
  document
    .querySelectorAll('a[href*="/explore"]')
    .forEach((link) => preventClickAndRedirect(link, INSTAGRAM_INBOX_URL));

  // Remove "Suggested for you" posts from feed
  document.querySelectorAll("article").forEach((article) => {
    const headerElements = article.querySelectorAll("span, div");
    let isSuggested = false;

    headerElements.forEach((element) => {
      const text = element.textContent.trim();
      const suggestedTexts = [
        "Suggested for you",
        "Suggested posts",
        "Suggested",
      ];

      if (suggestedTexts.includes(text)) {
        const rect = element.getBoundingClientRect();
        const articleRect = article.getBoundingClientRect();
        if (rect.top - articleRect.top < 200) {
          isSuggested = true;
        }
      }
    });

    if (isSuggested) hideElement(article);
  });
}

// Platform detection
const isYouTube = window.location.hostname.includes("youtube.com");
const isInstagram = window.location.hostname.includes("instagram.com");

// Handle YouTube content removal
function handleYouTube() {
  checkAndRedirectShorts();
  removeShorts();
  removeComments();
}

// Handle Instagram content removal
function handleInstagram() {
  checkAndRedirectReels();
  checkAndRedirectExplore();
  removeInstagramReels();
  removeInstagramExploreAndSuggested();
}

// Initialize
if (isYouTube) {
  handleYouTube();
} else if (isInstagram) {
  handleInstagram();
}

// Event listeners
if (isYouTube) {
  document.addEventListener("yt-navigate-finish", handleYouTube);
}

// Function to check and redirect Shorts URLs immediately
function checkAndRedirectShorts() {
  if (window.location.pathname.includes("/shorts/")) {
    window.location.replace("https://www.youtube.com/feed/subscriptions");
  }
}

// Function to remove Shorts elements
function removeShorts() {
  // Remove the "Shorts" button in the sidebar
  const sidebarShorts = document.querySelectorAll(
    'ytd-guide-entry-renderer a[title="Shorts"], ytd-guide-entry-renderer a[href*="/shorts"]'
  );
  sidebarShorts.forEach((element) => {
    const parent = element.closest("ytd-guide-entry-renderer");
    if (parent) {
      parent.remove();
    }
  });

  // Remove the "Shorts" shelf on the homepage
  const shortsShelf = document.querySelectorAll(
    "ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts]"
  );
  shortsShelf.forEach((element) => {
    element.remove();
  });

  // Remove any Shorts videos (those with /shorts/ in their URL)
  const shortsVideos = document.querySelectorAll('a[href*="/shorts/"]');
  shortsVideos.forEach((link) => {
    // Prevent clicking on Shorts links
    link.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "https://www.youtube.com/feed/subscriptions";
      },
      { once: true }
    );

    // Find the parent container that holds the video item
    const videoItem = link.closest(
      "ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer"
    );
    if (videoItem) {
      videoItem.remove();
    }
  });

  // Additional selectors for comprehensive removal
  const additionalSelectors = [
    "ytd-rich-section-renderer:has([is-shorts])",
    'ytd-rich-item-renderer:has(a[href*="/shorts/"])',
    'ytd-video-renderer:has(a[href*="/shorts/"])',
    'ytd-grid-video-renderer:has(a[href*="/shorts/"])',
    'ytd-compact-video-renderer:has(a[href*="/shorts/"])',
  ];

  additionalSelectors.forEach((selector) => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => element.remove());
    } catch (e) {
      // Some selectors might not work in older browsers, silently continue
    }
  });
}

// Run on initial page load
checkAndRedirectShorts();
removeShorts();

// Listen for YouTube's navigation events (for SPA page changes)
document.addEventListener("yt-navigate-finish", () => {
  checkAndRedirectShorts();
  removeShorts();
});

# FocusedFeeds

A lightweight Chrome extension that removes all YouTube Shorts and Instagram Reels from your browsing experience. Clean up your feed and focus on the content that matters.

## Features

### YouTube

- **Removes Shorts Button** - Hides Shorts from sidebar, navigation, and mini-guide
- **Blocks Shorts Shelf** - Removes the Shorts carousel from homepage and feeds
- **Filters Shorts Videos** - Removes all Shorts videos from search results, subscription feed, and grids
- **Auto-Redirect** - Automatically redirects any `/shorts/` URL to your subscriptions feed
- **Hides Comments** - Removes the comments section from all YouTube videos
- **Prevents Clicks** - Blocks clicking on Shorts links throughout the site

### Instagram

- **Redirects Reels** - Automatically redirects `/reels/` pages to Instagram Direct Messages
- **Redirects Explore** - Automatically redirects `/explore/` pages to Instagram Direct Messages
- **Removes Navigation** - Hides Reels and Explore links from sidebar and menus
- **Filters Feed** - Removes individual Reel posts from your main feed
- **Prevents Navigation** - Blocks clicking on Reels and Explore links throughout the site

## Installation

### Load Unpacked (Developer Mode)

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the extension folder containing `manifest.json`
6. The extension is now active!

### Permissions

This extension requires **no special permissions** - it only runs content scripts on YouTube and Instagram domains.

## How It Works

### Technical Implementation

#### YouTube

- **Content Script** runs at `document_start` for early intervention
- **CSS Rules** hide Shorts elements immediately on page load
- **JavaScript Functions** remove Shorts from DOM and prevent navigation
- **Event Listener** responds to YouTube's SPA navigation (`yt-navigate-finish`)
- **URL Monitoring** automatically redirects Shorts URLs to subscriptions

#### Instagram

- **URL Redirection** catches Reels/Explore pages and redirects to inbox
- **CSS Hiding** provides instant visual blocking of unwanted elements
- **JavaScript Removal** dynamically removes Reels, Explore links, and suggested posts
- **Click Prevention** blocks navigation to Reels/Explore throughout the site
- **Feed Filtering** analyzes and removes "Suggested for you" posts

### Files Structure

```
├── manifest.json    # Extension configuration (Manifest V3)
├── content.js       # Core logic for removing content
├── styles.css       # CSS rules for hiding elements
└── README.md        # This file
```

## Compatibility

- **Browser**: Chrome, Edge, and other Chromium-based browsers
- **Manifest**: Version 3 (latest standard)
- **YouTube**: Works with current YouTube layout
- **Instagram**: Works with current Instagram layout

## Performance

- Lightweight implementation with minimal resource usage
- CSS-based hiding for instant results
- Optimized selectors to prevent performance impact
- No background scripts or persistent processes

## Privacy

- **No data collection** - This extension does not collect, store, or transmit any data
- **No external requests** - All processing happens locally in your browser
- **No permissions required** - Operates only on YouTube and Instagram pages
- Efficient MutationObserver implementation
- Minimal performance impact
- No unnecessary permissions

## Files

- `manifest.json` - Extension configuration
- `content.js` - Removes Shorts and Reels elements
- `styles.css` - CSS rules to hide Shorts and Reels
- `README.md` - Documentation

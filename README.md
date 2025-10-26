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

### From GitHub Releases (Recommended)

1. Go to the [Releases page](https://github.com/kalpitjain/FocusedFeeds/releases)
2. Download the latest `focusedfeeds-vX.X.X.zip` file
3. Unzip the file to a permanent location on your computer
4. Open Chrome and go to `chrome://extensions/`
5. Enable **Developer mode** (toggle in top-right corner)
6. Click **Load unpacked**
7. Select the unzipped folder containing `manifest.json`
8. The extension is now active!

### From Source (Development)

1. Clone this repository: `git clone https://github.com/kalpitjain/FocusedFeeds.git`
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

## Development

### Building a Release

To create a release package manually:

```bash
zip -r focusedfeeds-v1.0.0.zip manifest.json content.js styles.css logo.png
```

### Automated Releases

This project uses GitHub Actions to automatically create releases:

1. Update the version in `manifest.json`
2. Commit and push your changes
3. Create and push a new tag:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```
4. GitHub Actions will automatically:
   - Build the extension package
   - Create a GitHub Release
   - Attach the ZIP file for download

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have suggestions, please [open an issue](https://github.com/kalpitjain/no-shorts/issues) on GitHub.

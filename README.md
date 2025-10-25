# YouTube Shorts Remover

A lightweight Chrome extension that removes all YouTube Shorts from the desktop site.

## Features

- Removes the "Shorts" button from sidebar
- Hides the Shorts shelf on homepage
- Removes all Shorts videos (URLs with `/shorts/`)
- Redirects Shorts URLs to your subscriptions feed
- Lightweight - only runs on page load and navigation

## Installation

1. Go to `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select the extension folder
5. Done!

## How It Works

Runs on page load and YouTube navigation events to remove Shorts elements. Redirects any `/shorts/` URL to the subscriptions page.

## Files

- `manifest.json` - Extension configuration
- `content.js` - Removes Shorts elements
- `styles.css` - CSS rules to hide Shorts
- `README.md` - Documentation

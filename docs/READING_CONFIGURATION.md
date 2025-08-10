# Dynamic Reading Section Configuration

This document explains how to dynamically update the "Currently Reading" section on the website using environment variables.

## Overview

The "Currently Reading" section now supports dynamic configuration through environment variables, allowing you to update the current book without modifying code or redeploying the application.

## Environment Variables

To override the current book, set these environment variables:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `CURRENT_BOOK_TITLE` | The title of the book | Yes | `"Atomic Habits"` |
| `CURRENT_BOOK_AUTHOR` | The author of the book | Yes | `"James Clear"` |
| `CURRENT_BOOK_COVER` | URL to the book cover image | Yes | `"https://example.com/cover.jpg"` |
| `CURRENT_BOOK_LAST_UPDATED` | ISO timestamp of when this was last updated | No | `"2025-01-15T10:30:00Z"` |

## Usage Examples

### Local Development

```bash
# Set environment variables before starting the dev server
CURRENT_BOOK_TITLE="The Pragmatic Programmer" \
CURRENT_BOOK_AUTHOR="David Thomas & Andrew Hunt" \
CURRENT_BOOK_COVER="https://example.com/pragmatic-programmer.jpg" \
yarn dev
```

### Production Deployment

#### Vercel
Add environment variables in your Vercel dashboard:
```
CURRENT_BOOK_TITLE=The Pragmatic Programmer
CURRENT_BOOK_AUTHOR=David Thomas & Andrew Hunt
CURRENT_BOOK_COVER=https://example.com/pragmatic-programmer.jpg
```

#### Netlify
Add environment variables in your Netlify dashboard or in `netlify.toml`:
```toml
[build.environment]
  CURRENT_BOOK_TITLE = "The Pragmatic Programmer"
  CURRENT_BOOK_AUTHOR = "David Thomas & Andrew Hunt"
  CURRENT_BOOK_COVER = "https://example.com/pragmatic-programmer.jpg"
```

#### Docker
```dockerfile
ENV CURRENT_BOOK_TITLE="The Pragmatic Programmer"
ENV CURRENT_BOOK_AUTHOR="David Thomas & Andrew Hunt"
ENV CURRENT_BOOK_COVER="https://example.com/pragmatic-programmer.jpg"
```

## Fallback Behavior

If environment variables are not set or incomplete, the system will fall back to the static book data defined in `/data/index.ts`.

## API Endpoint

The current book data is available via the API endpoint:

```
GET /api/current-book
```

Response format:
```json
{
  "book": {
    "title": "The Pragmatic Programmer",
    "author": "David Thomas & Andrew Hunt",
    "cover": "https://example.com/pragmatic-programmer.jpg",
    "status": "READING"
  },
  "source": "environment", // or "static"
  "lastUpdated": "2025-01-15T10:30:00Z" // only present when using environment variables
}
```

## Finding Book Cover URLs

Good sources for book cover images:
- Amazon (right-click on book cover and copy image URL)
- Goodreads
- Google Books API
- OpenLibrary.org

Ensure the image URL is publicly accessible and prefer HTTPS URLs.

## Future Integrations

This architecture makes it easy to integrate with external services in the future:
- Goodreads API integration
- Custom automation scripts
- Webhook-based updates
- Third-party reading tracking services

## Notes

- Changes to environment variables require a server restart to take effect
- The `CURRENT_BOOK_LAST_UPDATED` variable is optional and will default to the current timestamp if not provided
- All required environment variables must be present for the override to work; if any are missing, the system falls back to static data
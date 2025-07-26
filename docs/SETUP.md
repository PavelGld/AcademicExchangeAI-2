# 🚀 Detailed Setup Guide

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database access
- Basic knowledge of React and TypeScript

## Step-by-Step Installation

### 1. Environment Setup
```bash
# Clone the repository (if not on Replit)
git clone <repository-url>
cd university-exchange-platform

# Install dependencies
npm install
```

### 2. Database Configuration
The application uses PostgreSQL with Drizzle ORM. On Replit, the database is automatically configured.

For local development:
```bash
# Set database URL in environment
export DATABASE_URL="postgresql://username:password@localhost:5432/exchange_db"

# Push database schema  
npm run db:push

# Seed with sample data
curl -X POST http://localhost:5000/api/seed
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Configuration Options

### Environment Variables
```bash
# Required
DATABASE_URL=postgresql://...

# Optional (for AI features)
OPENROUTER_API_KEY=your_key_here
AITUNNEL_API_KEY=your_key_here
```

### Theme Configuration
The application supports custom theming. Edit `client/src/index.css` to modify colors:

```css
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 84% 4.9%);
  --primary: hsl(221.2 83.2% 53.3%);
}

.dark {
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);
  --primary: hsl(217.2 91.2% 59.8%);
}
```

## Troubleshooting

### Common Issues

**Database Connection Error**
```
Error: Failed to connect to database
```
Solution: Verify DATABASE_URL is set correctly and PostgreSQL is running.

**Module Not Found Errors**
```
Error: Cannot resolve module '@/components/...'
```
Solution: Restart the development server and clear cache.

**AI Features Not Working**
```
Error: OpenRouter API key not found
```
Solution: Set OPENROUTER_API_KEY environment variable or disable AI features.

### Development Tips

1. **Hot Reload**: The development server supports hot module replacement
2. **Database Changes**: Use `npm run db:push` instead of manual migrations
3. **TypeScript**: Enable strict mode for better type safety
4. **Debugging**: Use browser dev tools and VS Code debugger

## Production Deployment

### Build Process
```bash
# Build for production
npm run build

# Test production build locally
npm run preview
```

### Environment Setup
- Set NODE_ENV=production
- Configure production database
- Set up proper CORS settings
- Enable security headers

### Performance Monitoring
- Monitor database query performance
- Track API response times
- Monitor memory usage
- Set up error logging
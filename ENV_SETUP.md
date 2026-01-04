# Environment Variables Configuration

## Required Environment Variables

Add these to your `.env` file:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
```

## Note

- You mentioned you have `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in your .env file
- For Vite (which your project uses), the prefix should be `VITE_` instead of `NEXT_PUBLIC_`
- Please rename `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to `VITE_CLERK_PUBLISHABLE_KEY` in your .env file
- The `CLERK_SECRET_KEY` should NOT be used in the frontend - it's only for backend/server-side operations

## Example .env file

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

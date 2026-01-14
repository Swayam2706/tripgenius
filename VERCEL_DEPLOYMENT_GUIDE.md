# Vercel Deployment Guide for TripGenius

To ensure your application works correctly on Vercel, please follow these steps to configure your environment variables.

## 1. Environment Variables

Go to your Vercel Project Settings > Environment Variables and add the following:

| Variable Name | Description | Example Value |
|--------------|-------------|---------------|
| `VITE_API_URL` | The URL of your deployed backend function. | `https://tripgenius-rouge.vercel.app` (or your actual domain) |
| `VITE_GEMINI_API_KEY` | Your Google Gemini AI API Key. | `AIzaSy...` |
| `VITE_GOOGLE_AUTH_CLIENT_ID` | Your Google OAuth Client ID. | `...apps.googleusercontent.com` |
| `MONGODB_URL` | Your MongoDB Connection String (Atlas). | `mongodb+srv://...` |
| `GOOGLE_CUSTOM_SEARCH_API_KEY` | Google Custom Search API Key. | `AIzaSy...` |
| `GOOGLE_CUSTOM_SEARCH_ENGINE_ID` | Google Custom Search Engine ID. | `012345...` |

> **Important**: For `VITE_API_URL`, do not include a trailing slash (e.g., use `https://myapp.vercel.app`, not `https://myapp.vercel.app/`).

## 2. Verify Build Settings

Ensure your Vercel Project Settings > Build & Development Settings are:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 3. Redeploy

After adding the environment variables:
1. Go to the **Deployments** tab in Vercel.
2. Click the three dots (`...`) on your latest deployment.
3. Select **Redeploy**.

This will trigger a new build with the updated environment variables.

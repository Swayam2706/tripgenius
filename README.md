# TripGenius - AI-Powered Travel Planner

A modern travel planning application that uses AI to generate personalized trip itineraries based on destination, budget, duration, and number of travelers.

## Features

- 🎯 **AI-Powered Itinerary Generation** - Get personalized travel plans using Google Gemini AI
- 🏨 **Hotel Recommendations** - Curated hotel suggestions based on your budget
- 🗺️ **Day-by-Day Itinerary** - Detailed plans with places to visit, timings, and costs
- 🍽️ **Food Recommendations** - Local dining suggestions based on your budget
- 💰 **Budget Breakdown** - Complete cost analysis for your trip
- 🎨 **Beautiful Card UI** - Attractive card-based display for all trip information
- 🖼️ **Google Images Integration** - Real images from Google for hotels, places, and destinations
- 💾 **MongoDB Integration** - Save and retrieve your trip plans

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google Gemini API Key
- Google Places API Key
- Google Custom Search API Key (for images) - Optional but recommended

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `TripGenius` directory with the following:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/tripgenius
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tripgenius

# Server Port
PORT=5000

# Google Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Google Places API Key
VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key_here

# Google Custom Search API (for fetching images from Google)
# Optional: If not provided, the app will use fallback images
GOOGLE_CUSTOM_SEARCH_API_KEY=your_google_custom_search_api_key_here
GOOGLE_CUSTOM_SEARCH_ENGINE_ID=your_custom_search_engine_id_here
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- The default connection string is `mongodb://localhost:27017/tripgenius`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `MONGODB_URI` in `.env`

### 4. Get API Keys

1. **Google Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to `VITE_GEMINI_API_KEY` in `.env`

2. **Google Places API Key:**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Places API
   - Create an API key
   - Add it to `VITE_GOOGLE_PLACE_API_KEY` in `.env`

3. **Google Custom Search API (for Images):**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Custom Search API
   - Create an API key
   - Add it to `GOOGLE_CUSTOM_SEARCH_API_KEY` in `.env`
   - Create a Custom Search Engine:
     - Go to [Google Custom Search](https://programmablesearchengine.google.com/)
     - Click "Add" to create a new search engine
     - Set "Sites to search" to: `*` (search the entire web)
     - Click "Create"
     - Go to "Setup" → "Basics" and copy your "Search engine ID"
     - Add it to `GOOGLE_CUSTOM_SEARCH_ENGINE_ID` in `.env`
   - **Note:** If you don't set up Google Custom Search API, the app will use fallback images from Unsplash

### 5. Run the Application

**Start the backend server:**
```bash
npm run server
```

**Start the frontend (in a new terminal):**
```bash
npm run dev
```

**Or run both simultaneously:**
```bash
npm run dev:full
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
TripGenius/
├── src/
│   ├── components/
│   │   ├── trip/
│   │   │   ├── HotelCard.jsx       # Hotel display card
│   │   │   ├── PlaceCard.jsx        # Place/attraction card
│   │   │   └── DayItineraryCard.jsx  # Day itinerary card
│   │   └── ui/                      # UI components
│   ├── create-trip/                 # Trip creation page
│   ├── view-trip/                   # Trip viewing page
│   ├── service/
│   │   └── AiModal.jsx              # AI service for trip generation
│   └── constants/
│       └── options.jsx              # Form options
├── server.js                        # Express backend server
└── package.json
```

## Usage

1. **Create a Trip:**
   - Enter your destination using Google Places autocomplete
   - Select number of days
   - Choose your budget (Cheap/Moderate/Luxury)
   - Select number of travelers
   - Click "Generate Trip"
   - Sign in with Google (required)

2. **View Your Trip:**
   - After generation, you'll be redirected to the trip view page
   - Browse hotels, itinerary, food recommendations, and budget breakdown
   - All data is saved to MongoDB for future access

## API Endpoints

- `POST /api/trips` - Create a new trip
- `GET /api/trips/:id` - Get trip by ID
- `GET /api/trips/user/:userId` - Get all trips for a user
- `PUT /api/trips/:id` - Update a trip
- `DELETE /api/trips/:id` - Delete a trip
- `GET /api/health` - Health check

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **AI:** Google Gemini API
- **Maps:** Google Places API

## Features in Detail

### AI Response Format
The AI generates structured JSON with:
- Hotels with images, ratings, prices, amenities
- Day-by-day itinerary with places, timings, costs
- Food recommendations
- Transportation options
- Budget breakdown
- Pro tips

### Card Components
- **HotelCard:** Displays hotel information with images, ratings, amenities, and pricing
- **PlaceCard:** Shows places to visit with images, duration, ticket prices, and map links
- **DayItineraryCard:** Organizes places by day with themes

## Troubleshooting

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running (if using local)
   - Check your connection string in `.env`
   - Verify network access (if using Atlas)

2. **API Key Errors:**
   - Ensure all API keys are set in `.env`
   - Check API key permissions and quotas

3. **CORS Issues:**
   - Backend CORS is configured for localhost
   - Update CORS settings in `server.js` for production

## License

MIT

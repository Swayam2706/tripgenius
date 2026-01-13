// Destination-specific data for fallback when AI doesn't respond properly

export const getDestinationPlaces = (destination) => {
  const destinationLower = destination?.toLowerCase() || 'pune'
  
  // Popular destinations and their places - Worldwide coverage
  const destinations = {
    // India
    'mahabaleshwar': [
      { name: 'Pratapgad Fort', desc: 'Historic fort with scenic views', duration: '2-3 hours', baseCost: 50, theme: 'Historical & Forts' },
      { name: 'Venna Lake', desc: 'Beautiful lake for boating and relaxation', duration: '2 hours', baseCost: 100, theme: 'Nature & Recreation' },
      { name: 'Mapro Garden', desc: 'Strawberry garden and food park', duration: '1-2 hours', baseCost: 50, theme: 'Food & Nature' },
      { name: 'Lingmala Waterfall', desc: 'Picturesque waterfall', duration: '1-2 hours', baseCost: 30, theme: 'Nature & Scenic' },
      { name: 'Elephant\'s Head Point', desc: 'Famous viewpoint with rock formation', duration: '1 hour', baseCost: 0, theme: 'Scenic Views' },
      { name: 'Wilson Point', desc: 'Sunrise point with panoramic views', duration: '1 hour', baseCost: 0, theme: 'Scenic Views' },
      { name: 'Arthur\'s Seat', desc: 'Valley viewpoint', duration: '1 hour', baseCost: 0, theme: 'Scenic Views' },
      { name: 'Krishnabai Temple', desc: 'Ancient temple by Krishna River', duration: '1 hour', baseCost: 0, theme: 'Spiritual' }
    ],
    'pune': [
      { name: 'Shaniwar Wada', desc: 'Historic fort palace of Peshwas', duration: '2-3 hours', baseCost: 100, theme: 'Historical & Cultural' },
      { name: 'Lal Mahal', desc: 'Birthplace of Shivaji Maharaj', duration: '1 hour', baseCost: 50, theme: 'Historical & Cultural' },
      { name: 'Sinhagad Fort', desc: 'Historic fort with panoramic views', duration: '4-5 hours', baseCost: 200, theme: 'Forts & Views' },
      { name: 'Aga Khan Palace', desc: 'Mahatma Gandhi prison palace', duration: '2 hours', baseCost: 50, theme: 'Historical & Cultural' },
      { name: 'Dagadusheth Ganpati Temple', desc: 'Famous Ganesh temple', duration: '1 hour', baseCost: 0, theme: 'Spiritual' },
      { name: 'Raja Dinkar Kelkar Museum', desc: 'Unique artifacts collection', duration: '2 hours', baseCost: 100, theme: 'Cultural' },
      { name: 'Osho Ashram', desc: 'Meditation center', duration: '2 hours', baseCost: 100, theme: 'Spiritual' },
      { name: 'Parvati Hill Temple', desc: 'City views from temple', duration: '2 hours', baseCost: 50, theme: 'Spiritual & Views' }
    ],
    'mumbai': [
      { name: 'Gateway of India', desc: 'Iconic monument and waterfront', duration: '1-2 hours', baseCost: 0, theme: 'Historical & Landmarks' },
      { name: 'Marine Drive', desc: 'Famous sea-facing promenade', duration: '1-2 hours', baseCost: 0, theme: 'Scenic & Recreation' },
      { name: 'Elephanta Caves', desc: 'Ancient rock-cut caves', duration: '3-4 hours', baseCost: 250, theme: 'Historical & Cultural' },
      { name: 'Siddhivinayak Temple', desc: 'Famous Ganesh temple', duration: '1 hour', baseCost: 0, theme: 'Spiritual' },
      { name: 'Haji Ali Dargah', desc: 'Famous mosque on water', duration: '1 hour', baseCost: 0, theme: 'Spiritual' },
      { name: 'Chhatrapati Shivaji Maharaj Terminus', desc: 'UNESCO World Heritage railway station', duration: '1 hour', baseCost: 0, theme: 'Architectural' },
      { name: 'Juhu Beach', desc: 'Popular beach with food stalls', duration: '2 hours', baseCost: 0, theme: 'Beach & Recreation' },
      { name: 'Sanjay Gandhi National Park', desc: 'Wildlife and nature park', duration: '3-4 hours', baseCost: 50, theme: 'Nature & Wildlife' }
    ],
    'goa': [
      { name: 'Calangute Beach', desc: 'Famous beach with water sports', duration: '3-4 hours', baseCost: 0, theme: 'Beach & Recreation' },
      { name: 'Basilica of Bom Jesus', desc: 'UNESCO World Heritage church', duration: '1-2 hours', baseCost: 0, theme: 'Historical & Spiritual' },
      { name: 'Dudhsagar Falls', desc: 'Magnificent waterfall', duration: '4-5 hours', baseCost: 200, theme: 'Nature & Scenic' },
      { name: 'Fort Aguada', desc: 'Historic Portuguese fort', duration: '2 hours', baseCost: 50, theme: 'Historical & Forts' },
      { name: 'Anjuna Beach', desc: 'Flea market and beach', duration: '2-3 hours', baseCost: 0, theme: 'Beach & Shopping' },
      { name: 'Spice Plantations', desc: 'Tour of spice gardens', duration: '2-3 hours', baseCost: 300, theme: 'Nature & Cultural' },
      { name: 'Se Cathedral', desc: 'Largest church in Asia', duration: '1 hour', baseCost: 0, theme: 'Historical & Spiritual' },
      { name: 'Baga Beach', desc: 'Popular beach with nightlife', duration: '3-4 hours', baseCost: 0, theme: 'Beach & Nightlife' }
    ],
    'delhi': [
      { name: 'Red Fort', desc: 'UNESCO World Heritage monument', duration: '2-3 hours', baseCost: 500, theme: 'Historical & Cultural' },
      { name: 'India Gate', desc: 'War memorial and landmark', duration: '1 hour', baseCost: 0, theme: 'Historical & Landmarks' },
      { name: 'Qutub Minar', desc: 'UNESCO World Heritage tower', duration: '1-2 hours', baseCost: 500, theme: 'Historical & Architectural' },
      { name: 'Lotus Temple', desc: 'Beautiful Bahai temple', duration: '1 hour', baseCost: 0, theme: 'Spiritual & Architectural' },
      { name: 'Akshardham Temple', desc: 'Magnificent Hindu temple', duration: '2-3 hours', baseCost: 200, theme: 'Spiritual & Cultural' },
      { name: 'Humayun\'s Tomb', desc: 'UNESCO World Heritage mausoleum', duration: '1-2 hours', baseCost: 500, theme: 'Historical & Architectural' },
      { name: 'Jama Masjid', desc: 'Largest mosque in India', duration: '1 hour', baseCost: 0, theme: 'Spiritual & Historical' },
      { name: 'Connaught Place', desc: 'Shopping and dining hub', duration: '2-3 hours', baseCost: 0, theme: 'Shopping & Dining' }
    ],
    
    // Europe
    'paris': [
      { name: 'Eiffel Tower', desc: 'Iconic iron lattice tower', duration: '2-3 hours', baseCost: 2000, theme: 'Landmarks & Views' },
      { name: 'Louvre Museum', desc: 'World\'s largest art museum', duration: '3-4 hours', baseCost: 1500, theme: 'Cultural & Art' },
      { name: 'Notre-Dame Cathedral', desc: 'Gothic masterpiece', duration: '1-2 hours', baseCost: 0, theme: 'Historical & Architectural' },
      { name: 'Arc de Triomphe', desc: 'Monumental arch', duration: '1 hour', baseCost: 800, theme: 'Historical & Landmarks' },
      { name: 'Champs-Élysées', desc: 'Famous shopping avenue', duration: '2-3 hours', baseCost: 0, theme: 'Shopping & Dining' },
      { name: 'Montmartre', desc: 'Artistic hilltop district', duration: '2-3 hours', baseCost: 0, theme: 'Cultural & Scenic' },
      { name: 'Seine River Cruise', desc: 'Scenic boat tour', duration: '1-2 hours', baseCost: 1200, theme: 'Scenic & Recreation' },
      { name: 'Versailles Palace', desc: 'Opulent royal palace', duration: '4-5 hours', baseCost: 1800, theme: 'Historical & Cultural' }
    ],
    'london': [
      { name: 'Big Ben', desc: 'Iconic clock tower', duration: '1 hour', baseCost: 0, theme: 'Landmarks & Historical' },
      { name: 'Tower of London', desc: 'Historic castle and crown jewels', duration: '2-3 hours', baseCost: 2500, theme: 'Historical & Cultural' },
      { name: 'British Museum', desc: 'World history and culture', duration: '3-4 hours', baseCost: 0, theme: 'Cultural & Educational' },
      { name: 'Buckingham Palace', desc: 'Royal residence', duration: '1-2 hours', baseCost: 2000, theme: 'Historical & Royal' },
      { name: 'Westminster Abbey', desc: 'Gothic church and coronation site', duration: '1-2 hours', baseCost: 2000, theme: 'Historical & Spiritual' },
      { name: 'London Eye', desc: 'Giant observation wheel', duration: '1 hour', baseCost: 2500, theme: 'Scenic & Recreation' },
      { name: 'Hyde Park', desc: 'Large royal park', duration: '2-3 hours', baseCost: 0, theme: 'Nature & Recreation' },
      { name: 'Covent Garden', desc: 'Shopping and entertainment district', duration: '2-3 hours', baseCost: 0, theme: 'Shopping & Dining' }
    ],
    'rome': [
      { name: 'Colosseum', desc: 'Ancient amphitheater', duration: '2-3 hours', baseCost: 1800, theme: 'Historical & Architectural' },
      { name: 'Vatican City', desc: 'St. Peter\'s Basilica and Sistine Chapel', duration: '3-4 hours', baseCost: 2000, theme: 'Spiritual & Art' },
      { name: 'Trevi Fountain', desc: 'Baroque fountain', duration: '30 minutes', baseCost: 0, theme: 'Historical & Scenic' },
      { name: 'Pantheon', desc: 'Ancient Roman temple', duration: '1 hour', baseCost: 0, theme: 'Historical & Architectural' },
      { name: 'Roman Forum', desc: 'Ancient ruins', duration: '2-3 hours', baseCost: 1200, theme: 'Historical & Cultural' },
      { name: 'Spanish Steps', desc: 'Famous staircase', duration: '1 hour', baseCost: 0, theme: 'Historical & Scenic' },
      { name: 'Villa Borghese', desc: 'Art gallery and gardens', duration: '2-3 hours', baseCost: 1500, theme: 'Art & Nature' },
      { name: 'Trastevere', desc: 'Charming medieval neighborhood', duration: '2-3 hours', baseCost: 0, theme: 'Cultural & Dining' }
    ],
    'barcelona': [
      { name: 'Sagrada Familia', desc: 'Gaudi\'s unfinished masterpiece', duration: '2-3 hours', baseCost: 2000, theme: 'Architectural & Spiritual' },
      { name: 'Park Güell', desc: 'Colorful Gaudi park', duration: '2-3 hours', baseCost: 1000, theme: 'Art & Nature' },
      { name: 'La Rambla', desc: 'Famous pedestrian street', duration: '2-3 hours', baseCost: 0, theme: 'Shopping & Dining' },
      { name: 'Gothic Quarter', desc: 'Medieval old town', duration: '2-3 hours', baseCost: 0, theme: 'Historical & Cultural' },
      { name: 'Casa Batlló', desc: 'Gaudi\'s architectural wonder', duration: '1-2 hours', baseCost: 2500, theme: 'Architectural & Art' },
      { name: 'Camp Nou', desc: 'FC Barcelona stadium', duration: '2 hours', baseCost: 2000, theme: 'Sports & Cultural' },
      { name: 'Barceloneta Beach', desc: 'Popular city beach', duration: '3-4 hours', baseCost: 0, theme: 'Beach & Recreation' },
      { name: 'Montjuïc', desc: 'Hill with museums and views', duration: '3-4 hours', baseCost: 800, theme: 'Cultural & Scenic' }
    ],
    'amsterdam': [
      { name: 'Anne Frank House', desc: 'Historic hiding place', duration: '1-2 hours', baseCost: 1200, theme: 'Historical & Cultural' },
      { name: 'Van Gogh Museum', desc: 'Extensive art collection', duration: '2-3 hours', baseCost: 1800, theme: 'Art & Cultural' },
      { name: 'Rijksmuseum', desc: 'Dutch art and history', duration: '2-3 hours', baseCost: 2000, theme: 'Art & Historical' },
      { name: 'Canal Cruise', desc: 'Scenic boat tour', duration: '1-2 hours', baseCost: 1500, theme: 'Scenic & Recreation' },
      { name: 'Jordaan District', desc: 'Charming neighborhood', duration: '2-3 hours', baseCost: 0, theme: 'Cultural & Shopping' },
      { name: 'Vondelpark', desc: 'Large city park', duration: '2-3 hours', baseCost: 0, theme: 'Nature & Recreation' },
      { name: 'Dam Square', desc: 'Historic city center', duration: '1-2 hours', baseCost: 0, theme: 'Historical & Shopping' },
      { name: 'Red Light District', desc: 'Famous neighborhood', duration: '1-2 hours', baseCost: 0, theme: 'Cultural & Nightlife' }
    ],
    
    // Asia
    'tokyo': [
      { name: 'Senso-ji Temple', desc: 'Ancient Buddhist temple', duration: '1-2 hours', baseCost: 0, theme: 'Spiritual & Historical' },
      { name: 'Shibuya Crossing', desc: 'World\'s busiest intersection', duration: '30 minutes', baseCost: 0, theme: 'Cultural & Landmarks' },
      { name: 'Tokyo Skytree', desc: 'Tallest tower in Japan', duration: '1-2 hours', baseCost: 2000, theme: 'Scenic & Views' },
      { name: 'Tsukiji Fish Market', desc: 'Famous seafood market', duration: '2-3 hours', baseCost: 0, theme: 'Food & Cultural' },
      { name: 'Meiji Shrine', desc: 'Peaceful Shinto shrine', duration: '1-2 hours', baseCost: 0, theme: 'Spiritual & Nature' },
      { name: 'Harajuku', desc: 'Fashion and youth culture district', duration: '2-3 hours', baseCost: 0, theme: 'Shopping & Cultural' },
      { name: 'Imperial Palace', desc: 'Emperor\'s residence', duration: '2 hours', baseCost: 0, theme: 'Historical & Cultural' },
      { name: 'Ueno Park', desc: 'Museums and cherry blossoms', duration: '2-3 hours', baseCost: 0, theme: 'Nature & Cultural' }
    ],
    'singapore': [
      { name: 'Marina Bay Sands', desc: 'Iconic hotel and observation deck', duration: '2-3 hours', baseCost: 2000, theme: 'Scenic & Luxury' },
      { name: 'Gardens by the Bay', desc: 'Futuristic nature park', duration: '2-3 hours', baseCost: 800, theme: 'Nature & Art' },
      { name: 'Sentosa Island', desc: 'Resort island with attractions', duration: '4-5 hours', baseCost: 3000, theme: 'Recreation & Entertainment' },
      { name: 'Universal Studios', desc: 'Theme park', duration: '6-8 hours', baseCost: 5000, theme: 'Entertainment & Recreation' },
      { name: 'Chinatown', desc: 'Cultural district', duration: '2-3 hours', baseCost: 0, theme: 'Cultural & Shopping' },
      { name: 'Little India', desc: 'Vibrant Indian neighborhood', duration: '2-3 hours', baseCost: 0, theme: 'Cultural & Food' },
      { name: 'Singapore Zoo', desc: 'World-class zoo', duration: '3-4 hours', baseCost: 2500, theme: 'Nature & Wildlife' },
      { name: 'Merlion Park', desc: 'Iconic statue', duration: '30 minutes', baseCost: 0, theme: 'Landmarks & Scenic' }
    ],
    'bangkok': [
      { name: 'Wat Pho', desc: 'Temple of the Reclining Buddha', duration: '1-2 hours', baseCost: 200, theme: 'Spiritual & Historical' },
      { name: 'Grand Palace', desc: 'Royal residence complex', duration: '2-3 hours', baseCost: 500, theme: 'Historical & Architectural' },
      { name: 'Wat Arun', desc: 'Temple of Dawn', duration: '1 hour', baseCost: 100, theme: 'Spiritual & Scenic' },
      { name: 'Chatuchak Market', desc: 'Massive weekend market', duration: '3-4 hours', baseCost: 0, theme: 'Shopping & Food' },
      { name: 'Floating Markets', desc: 'Traditional water markets', duration: '3-4 hours', baseCost: 500, theme: 'Cultural & Food' },
      { name: 'Khao San Road', desc: 'Backpacker street', duration: '2-3 hours', baseCost: 0, theme: 'Nightlife & Shopping' },
      { name: 'Lumpini Park', desc: 'Central city park', duration: '2 hours', baseCost: 0, theme: 'Nature & Recreation' },
      { name: 'Jim Thompson House', desc: 'Thai silk museum', duration: '1-2 hours', baseCost: 200, theme: 'Cultural & Historical' }
    ],
    'dubai': [
      { name: 'Burj Khalifa', desc: 'World\'s tallest building', duration: '2-3 hours', baseCost: 3000, theme: 'Landmarks & Views' },
      { name: 'Burj Al Arab', desc: 'Luxury hotel', duration: '1 hour', baseCost: 0, theme: 'Luxury & Landmarks' },
      { name: 'Palm Jumeirah', desc: 'Artificial island', duration: '2-3 hours', baseCost: 0, theme: 'Scenic & Luxury' },
      { name: 'Dubai Mall', desc: 'World\'s largest mall', duration: '3-4 hours', baseCost: 0, theme: 'Shopping & Entertainment' },
      { name: 'Desert Safari', desc: 'Dune bashing and camel rides', duration: '4-5 hours', baseCost: 2000, theme: 'Adventure & Cultural' },
      { name: 'Dubai Marina', desc: 'Modern waterfront district', duration: '2-3 hours', baseCost: 0, theme: 'Scenic & Dining' },
      { name: 'Gold Souk', desc: 'Traditional gold market', duration: '1-2 hours', baseCost: 0, theme: 'Shopping & Cultural' },
      { name: 'Dubai Fountain', desc: 'Musical fountain show', duration: '30 minutes', baseCost: 0, theme: 'Entertainment & Scenic' }
    ],
    
    // Americas
    'new york': [
      { name: 'Statue of Liberty', desc: 'Iconic symbol of freedom', duration: '3-4 hours', baseCost: 2000, theme: 'Historical & Landmarks' },
      { name: 'Central Park', desc: 'Famous urban park', duration: '2-4 hours', baseCost: 0, theme: 'Nature & Recreation' },
      { name: 'Times Square', desc: 'Famous commercial intersection', duration: '1-2 hours', baseCost: 0, theme: 'Cultural & Shopping' },
      { name: 'Empire State Building', desc: 'Art Deco skyscraper', duration: '1-2 hours', baseCost: 2500, theme: 'Landmarks & Views' },
      { name: 'Metropolitan Museum', desc: 'World-class art museum', duration: '3-4 hours', baseCost: 2000, theme: 'Art & Cultural' },
      { name: 'Brooklyn Bridge', desc: 'Historic suspension bridge', duration: '1-2 hours', baseCost: 0, theme: 'Historical & Scenic' },
      { name: 'Broadway Show', desc: 'World-famous theater', duration: '2-3 hours', baseCost: 3000, theme: 'Entertainment & Cultural' },
      { name: 'High Line', desc: 'Elevated park', duration: '1-2 hours', baseCost: 0, theme: 'Nature & Scenic' }
    ],
    'los angeles': [
      { name: 'Hollywood Walk of Fame', desc: 'Famous stars on sidewalk', duration: '1-2 hours', baseCost: 0, theme: 'Cultural & Entertainment' },
      { name: 'Universal Studios', desc: 'Movie theme park', duration: '6-8 hours', baseCost: 5000, theme: 'Entertainment & Recreation' },
      { name: 'Santa Monica Pier', desc: 'Iconic pier and beach', duration: '2-3 hours', baseCost: 0, theme: 'Recreation & Scenic' },
      { name: 'Griffith Observatory', desc: 'Observatory and city views', duration: '2-3 hours', baseCost: 0, theme: 'Scenic & Educational' },
      { name: 'Venice Beach', desc: 'Famous beach boardwalk', duration: '2-3 hours', baseCost: 0, theme: 'Beach & Cultural' },
      { name: 'Getty Center', desc: 'Art museum and gardens', duration: '3-4 hours', baseCost: 0, theme: 'Art & Scenic' },
      { name: 'Beverly Hills', desc: 'Luxury shopping district', duration: '2-3 hours', baseCost: 0, theme: 'Shopping & Luxury' },
      { name: 'Disneyland', desc: 'Magic Kingdom theme park', duration: '8-10 hours', baseCost: 6000, theme: 'Entertainment & Family' }
    ],
    'toronto': [
      { name: 'CN Tower', desc: 'Tallest freestanding structure', duration: '1-2 hours', baseCost: 2500, theme: 'Landmarks & Views' },
      { name: 'Royal Ontario Museum', desc: 'Natural history museum', duration: '2-3 hours', baseCost: 1500, theme: 'Cultural & Educational' },
      { name: 'Distillery District', desc: 'Historic pedestrian village', duration: '2-3 hours', baseCost: 0, theme: 'Cultural & Shopping' },
      { name: 'Toronto Islands', desc: 'Park and beaches', duration: '3-4 hours', baseCost: 800, theme: 'Nature & Recreation' },
      { name: 'St. Lawrence Market', desc: 'Historic food market', duration: '1-2 hours', baseCost: 0, theme: 'Food & Cultural' },
      { name: 'High Park', desc: 'Large urban park', duration: '2-3 hours', baseCost: 0, theme: 'Nature & Recreation' },
      { name: 'Art Gallery of Ontario', desc: 'Major art museum', duration: '2-3 hours', baseCost: 1500, theme: 'Art & Cultural' },
      { name: 'Casa Loma', desc: 'Gothic revival castle', duration: '1-2 hours', baseCost: 2000, theme: 'Historical & Architectural' }
    ],
    
    // Oceania
    'sydney': [
      { name: 'Sydney Opera House', desc: 'Iconic performing arts center', duration: '1-2 hours', baseCost: 2000, theme: 'Architectural & Cultural' },
      { name: 'Sydney Harbour Bridge', desc: 'Steel arch bridge', duration: '1-2 hours', baseCost: 1500, theme: 'Landmarks & Scenic' },
      { name: 'Bondi Beach', desc: 'Famous surf beach', duration: '2-3 hours', baseCost: 0, theme: 'Beach & Recreation' },
      { name: 'Royal Botanic Gardens', desc: 'Beautiful gardens', duration: '2-3 hours', baseCost: 0, theme: 'Nature & Scenic' },
      { name: 'Taronga Zoo', desc: 'Zoo with harbor views', duration: '3-4 hours', baseCost: 3000, theme: 'Wildlife & Scenic' },
      { name: 'The Rocks', desc: 'Historic area', duration: '2-3 hours', baseCost: 0, theme: 'Historical & Cultural' },
      { name: 'Darling Harbour', desc: 'Entertainment precinct', duration: '2-3 hours', baseCost: 0, theme: 'Entertainment & Dining' },
      { name: 'Blue Mountains', desc: 'Mountain range day trip', duration: '8-10 hours', baseCost: 2000, theme: 'Nature & Scenic' }
    ],
    'melbourne': [
      { name: 'Federation Square', desc: 'Cultural precinct', duration: '1-2 hours', baseCost: 0, theme: 'Cultural & Architecture' },
      { name: 'Royal Botanic Gardens', desc: 'Extensive gardens', duration: '2-3 hours', baseCost: 0, theme: 'Nature & Recreation' },
      { name: 'Great Ocean Road', desc: 'Scenic coastal drive', duration: '8-10 hours', baseCost: 3000, theme: 'Scenic & Nature' },
      { name: 'Eureka Skydeck', desc: 'Observation deck', duration: '1 hour', baseCost: 1500, theme: 'Scenic & Views' },
      { name: 'St. Kilda Beach', desc: 'Popular beach', duration: '2-3 hours', baseCost: 0, theme: 'Beach & Recreation' },
      { name: 'Queen Victoria Market', desc: 'Historic market', duration: '2-3 hours', baseCost: 0, theme: 'Shopping & Food' },
      { name: 'Yarra Valley', desc: 'Wine region', duration: '6-8 hours', baseCost: 2500, theme: 'Food & Scenic' },
      { name: 'Brighton Beach', desc: 'Colorful beach boxes', duration: '1-2 hours', baseCost: 0, theme: 'Beach & Scenic' }
    ],
    'auckland': [
      { name: 'Sky Tower', desc: 'Tallest structure in NZ', duration: '1-2 hours', baseCost: 2000, theme: 'Landmarks & Views' },
      { name: 'Auckland Harbour Bridge', desc: 'Iconic bridge', duration: '30 minutes', baseCost: 0, theme: 'Landmarks & Scenic' },
      { name: 'Waiheke Island', desc: 'Wine island', duration: '6-8 hours', baseCost: 2500, theme: 'Food & Scenic' },
      { name: 'Auckland Domain', desc: 'Large park and museum', duration: '2-3 hours', baseCost: 0, theme: 'Nature & Cultural' },
      { name: 'Mission Bay', desc: 'Beach suburb', duration: '2-3 hours', baseCost: 0, theme: 'Beach & Recreation' },
      { name: 'Rangitoto Island', desc: 'Volcanic island', duration: '4-5 hours', baseCost: 1500, theme: 'Nature & Adventure' },
      { name: 'Auckland Zoo', desc: 'Zoo and wildlife', duration: '3-4 hours', baseCost: 2000, theme: 'Wildlife & Family' },
      { name: 'Piha Beach', desc: 'Black sand beach', duration: '2-3 hours', baseCost: 0, theme: 'Beach & Scenic' }
    ],
    'new zealand': [
      { name: 'Milford Sound', desc: 'Fjord in Fiordland', duration: '8-10 hours', baseCost: 4000, theme: 'Nature & Scenic' },
      { name: 'Tongariro National Park', desc: 'Volcanic landscapes', duration: '6-8 hours', baseCost: 0, theme: 'Nature & Adventure' },
      { name: 'Rotorua', desc: 'Geothermal wonderland', duration: '4-5 hours', baseCost: 2000, theme: 'Nature & Cultural' },
      { name: 'Queenstown', desc: 'Adventure capital', duration: '2-3 days', baseCost: 3000, theme: 'Adventure & Scenic' },
      { name: 'Waitomo Caves', desc: 'Glowworm caves', duration: '3-4 hours', baseCost: 2500, theme: 'Nature & Adventure' },
      { name: 'Abel Tasman National Park', desc: 'Coastal paradise', duration: '6-8 hours', baseCost: 1500, theme: 'Nature & Beach' },
      { name: 'Hobbiton', desc: 'Movie set tour', duration: '2-3 hours', baseCost: 3000, theme: 'Entertainment & Cultural' },
      { name: 'Franz Josef Glacier', desc: 'Glacier experience', duration: '4-5 hours', baseCost: 4000, theme: 'Nature & Adventure' }
    ],
    
    // More destinations
    'istanbul': [
      { name: 'Hagia Sophia', desc: 'Historic mosque and museum', duration: '1-2 hours', baseCost: 500, theme: 'Historical & Spiritual' },
      { name: 'Blue Mosque', desc: 'Famous mosque', duration: '1 hour', baseCost: 0, theme: 'Spiritual & Architectural' },
      { name: 'Grand Bazaar', desc: 'Historic covered market', duration: '2-3 hours', baseCost: 0, theme: 'Shopping & Cultural' },
      { name: 'Topkapi Palace', desc: 'Ottoman palace', duration: '2-3 hours', baseCost: 800, theme: 'Historical & Cultural' },
      { name: 'Bosphorus Cruise', desc: 'Strait boat tour', duration: '2-3 hours', baseCost: 1500, theme: 'Scenic & Cultural' },
      { name: 'Galata Tower', desc: 'Medieval stone tower', duration: '1 hour', baseCost: 500, theme: 'Historical & Views' },
      { name: 'Spice Bazaar', desc: 'Colorful spice market', duration: '1-2 hours', baseCost: 0, theme: 'Food & Cultural' },
      { name: 'Basilica Cistern', desc: 'Ancient underground reservoir', duration: '1 hour', baseCost: 300, theme: 'Historical & Architectural' }
    ],
    'cairo': [
      { name: 'Pyramids of Giza', desc: 'Ancient wonder', duration: '3-4 hours', baseCost: 800, theme: 'Historical & Landmarks' },
      { name: 'Sphinx', desc: 'Mythical statue', duration: '1 hour', baseCost: 0, theme: 'Historical & Landmarks' },
      { name: 'Egyptian Museum', desc: 'Ancient artifacts', duration: '2-3 hours', baseCost: 500, theme: 'Historical & Cultural' },
      { name: 'Khan el-Khalili', desc: 'Historic bazaar', duration: '2-3 hours', baseCost: 0, theme: 'Shopping & Cultural' },
      { name: 'Islamic Cairo', desc: 'Historic district', duration: '2-3 hours', baseCost: 0, theme: 'Historical & Cultural' },
      { name: 'Nile River Cruise', desc: 'Scenic boat tour', duration: '2-3 hours', baseCost: 1500, theme: 'Scenic & Cultural' },
      { name: 'Citadel of Cairo', desc: 'Medieval fortress', duration: '2 hours', baseCost: 300, theme: 'Historical & Views' },
      { name: 'Al-Azhar Park', desc: 'Historic park', duration: '1-2 hours', baseCost: 100, theme: 'Nature & Scenic' }
    ],
    'cape town': [
      { name: 'Table Mountain', desc: 'Iconic flat-topped mountain', duration: '3-4 hours', baseCost: 2000, theme: 'Nature & Scenic' },
      { name: 'Robben Island', desc: 'Historic prison island', duration: '4-5 hours', baseCost: 1500, theme: 'Historical & Cultural' },
      { name: 'V&A Waterfront', desc: 'Harbor area', duration: '2-3 hours', baseCost: 0, theme: 'Shopping & Dining' },
      { name: 'Cape of Good Hope', desc: 'Scenic peninsula', duration: '4-5 hours', baseCost: 1000, theme: 'Nature & Scenic' },
      { name: 'Boulders Beach', desc: 'Penguin colony', duration: '2 hours', baseCost: 200, theme: 'Wildlife & Beach' },
      { name: 'Kirstenbosch Gardens', desc: 'Botanical gardens', duration: '2-3 hours', baseCost: 500, theme: 'Nature & Scenic' },
      { name: 'Bo-Kaap', desc: 'Colorful neighborhood', duration: '1-2 hours', baseCost: 0, theme: 'Cultural & Scenic' },
      { name: 'Wine Route', desc: 'Wine tasting tour', duration: '6-8 hours', baseCost: 3000, theme: 'Food & Scenic' }
    ]
  }
  
  // Try exact match first
  if (destinations[destinationLower]) {
    return destinations[destinationLower]
  }
  
  // Try partial match
  for (const [key, places] of Object.entries(destinations)) {
    if (destinationLower.includes(key) || key.includes(destinationLower)) {
      return places
    }
  }
  
  // Return empty array to trigger generic place generation
  return []
}

export const getDestinationHotels = (destination, budget) => {
  const destinationLower = destination?.toLowerCase() || 'pune'
  
  // Destination-specific hotel names
  const destinationHotels = {
    'paris': {
      'Cheap': [
        { name: 'Hotel des Arts', location: 'Montmartre', basePrice: 3000, rating: 3.8, amenities: ['WiFi', 'Breakfast', '24h Reception'], desc: 'Charming budget hotel in artistic district' },
        { name: 'Ibis Budget', location: 'City Center', basePrice: 2500, rating: 3.6, amenities: ['WiFi', 'Parking', 'Breakfast'], desc: 'Central location near attractions' }
      ],
      'Moderate': [
        { name: 'Hotel des Invalides', location: '7th Arrondissement', basePrice: 8000, rating: 4.5, amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'], desc: 'Elegant hotel near Eiffel Tower' },
        { name: 'Le Marais Hotel', location: 'Marais District', basePrice: 7500, rating: 4.4, amenities: ['WiFi', 'Spa', 'Restaurant', 'Bar'], desc: 'Boutique hotel in historic area' }
      ],
      'Luxury': [
        { name: 'Hotel Ritz Paris', location: 'Place Vendôme', basePrice: 25000, rating: 4.9, amenities: ['WiFi', 'Pool', 'Spa', 'Fine Dining', 'Butler Service'], desc: 'Legendary luxury hotel' },
        { name: 'Four Seasons George V', location: 'Champs-Élysées', basePrice: 30000, rating: 4.9, amenities: ['WiFi', 'Pool', 'Spa', 'Fine Dining', 'Butler Service'], desc: 'Ultimate Parisian luxury' }
      ]
    },
    'london': {
      'Cheap': [
        { name: 'Premier Inn', location: 'City Center', basePrice: 4000, rating: 3.9, amenities: ['WiFi', 'Breakfast', '24h Reception'], desc: 'Reliable budget chain' },
        { name: 'Travelodge', location: 'Central London', basePrice: 3500, rating: 3.7, amenities: ['WiFi', 'Parking', 'Breakfast'], desc: 'Central location' }
      ],
      'Moderate': [
        { name: 'The Savoy', location: 'Strand', basePrice: 12000, rating: 4.6, amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar'], desc: 'Historic luxury hotel' },
        { name: 'Covent Garden Hotel', location: 'Covent Garden', basePrice: 10000, rating: 4.5, amenities: ['WiFi', 'Spa', 'Restaurant', 'Bar'], desc: 'Boutique hotel' }
      ],
      'Luxury': [
        { name: 'The Ritz London', location: 'Piccadilly', basePrice: 25000, rating: 4.9, amenities: ['WiFi', 'Pool', 'Spa', 'Fine Dining', 'Butler Service'], desc: 'Iconic luxury hotel' },
        { name: 'Claridge\'s', location: 'Mayfair', basePrice: 28000, rating: 4.9, amenities: ['WiFi', 'Spa', 'Fine Dining', 'Butler Service'], desc: 'Art Deco masterpiece' }
      ]
    },
    'new york': {
      'Cheap': [
        { name: 'Pod Hotel', location: 'Midtown', basePrice: 5000, rating: 3.8, amenities: ['WiFi', '24h Reception'], desc: 'Compact rooms in great location' },
        { name: 'YOTEL', location: 'Times Square', basePrice: 4500, rating: 3.9, amenities: ['WiFi', 'Gym', '24h Reception'], desc: 'Modern budget hotel' }
      ],
      'Moderate': [
        { name: 'The Plaza', location: 'Central Park', basePrice: 15000, rating: 4.7, amenities: ['WiFi', 'Spa', 'Restaurant', 'Bar'], desc: 'Historic luxury hotel' },
        { name: 'The Standard', location: 'High Line', basePrice: 12000, rating: 4.5, amenities: ['WiFi', 'Rooftop Bar', 'Restaurant'], desc: 'Trendy hotel' }
      ],
      'Luxury': [
        { name: 'The St. Regis', location: 'Fifth Avenue', basePrice: 30000, rating: 4.9, amenities: ['WiFi', 'Spa', 'Fine Dining', 'Butler Service'], desc: 'Ultimate luxury' },
        { name: 'The Mark', location: 'Upper East Side', basePrice: 28000, rating: 4.8, amenities: ['WiFi', 'Spa', 'Fine Dining', 'Butler Service'], desc: 'Sophisticated elegance' }
      ]
    },
    'tokyo': {
      'Cheap': [
        { name: 'Capsule Hotel', location: 'Shibuya', basePrice: 2000, rating: 3.5, amenities: ['WiFi', '24h Reception'], desc: 'Unique Japanese experience' },
        { name: 'Business Hotel', location: 'Shinjuku', basePrice: 3000, rating: 3.8, amenities: ['WiFi', 'Breakfast'], desc: 'Efficient budget option' }
      ],
      'Moderate': [
        { name: 'Park Hyatt Tokyo', location: 'Shinjuku', basePrice: 15000, rating: 4.7, amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'], desc: 'Luxury with city views' },
        { name: 'The Ritz-Carlton', location: 'Roppongi', basePrice: 18000, rating: 4.8, amenities: ['WiFi', 'Spa', 'Fine Dining', 'Bar'], desc: 'Ultimate luxury' }
      ],
      'Luxury': [
        { name: 'Aman Tokyo', location: 'Otemachi', basePrice: 35000, rating: 4.9, amenities: ['WiFi', 'Spa', 'Fine Dining', 'Butler Service'], desc: 'Zen luxury' },
        { name: 'Palace Hotel Tokyo', location: 'Marunouchi', basePrice: 30000, rating: 4.9, amenities: ['WiFi', 'Spa', 'Fine Dining', 'Butler Service'], desc: 'Imperial luxury' }
      ]
    }
  }
  
  // Check for destination-specific hotels
  if (destinationHotels[destinationLower] && destinationHotels[destinationLower][budget]) {
    return destinationHotels[destinationLower][budget]
  }
  
  // Generic hotel templates that work for any destination
  const hotelTemplates = {
    'Cheap': [
      { name: `${destination} Budget Hotel`, location: 'City Center', basePrice: 1200, rating: 3.8, amenities: ['WiFi', 'Parking', '24h Reception'], desc: 'Central location near main attractions' },
      { name: `${destination} Comfort Inn`, location: 'Downtown', basePrice: 1000, rating: 3.6, amenities: ['WiFi', 'Restaurant', 'Parking'], desc: 'Near transport hub' },
      { name: `${destination} City Hotel`, location: 'Main Area', basePrice: 1800, rating: 4.0, amenities: ['WiFi', 'Gym', 'Restaurant', 'Parking'], desc: 'Reliable chain hotel' }
    ],
    'Moderate': [
      { name: `${destination} Grand Hotel`, location: 'City Center', basePrice: 6000, rating: 4.5, amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar'], desc: 'Premium business hotel' },
      { name: `${destination} Resort Hotel`, location: 'Scenic Area', basePrice: 7000, rating: 4.6, amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Multiple Restaurants', 'Bar'], desc: 'Luxury location' },
      { name: `${destination} Heritage Hotel`, location: 'Historic Area', basePrice: 5500, rating: 4.4, amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Business Center'], desc: 'Business-friendly location' }
    ],
    'Luxury': [
      { name: `${destination} Luxury Resort`, location: 'Premium Area', basePrice: 12000, rating: 4.8, amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Fine Dining', 'Butler Service', 'Club Lounge'], desc: 'Ultimate luxury experience' },
      { name: `${destination} Five Star Hotel`, location: 'Exclusive Area', basePrice: 10000, rating: 4.7, amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Fine Dining', 'Butler Service', 'Bar'], desc: 'Timeless elegance' },
      { name: `${destination} Boutique Hotel`, location: 'Upscale Area', basePrice: 8500, rating: 4.6, amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Fine Dining', 'Spa', 'Business Center'], desc: 'Heritage luxury brand' }
    ]
  }
  
  return hotelTemplates[budget] || hotelTemplates['Moderate']
}

export const getDestinationFood = (destination, budget) => {
  const destinationLower = destination?.toLowerCase() || ''
  
  // Destination-specific food recommendations
  const destinationFood = {
    // France
    'paris': {
      'Cheap': [
        { name: 'Street Crepes', type: 'Street Food', price: 5, desc: 'Traditional French crepes with Nutella or ham & cheese', location: 'Various locations' },
        { name: 'Boulangerie', type: 'Local', price: 3, desc: 'Fresh baguettes, croissants, and pastries', location: 'City wide' },
        { name: 'Food Markets', type: 'Street Food', price: 8, desc: 'Local markets with fresh produce and ready-to-eat meals', location: 'Various markets' }
      ],
      'Moderate': [
        { name: 'Bistro Français', type: 'Restaurant', price: 25, desc: 'Classic French bistro with coq au vin and steak frites', location: 'City Center' },
        { name: 'Brasserie', type: 'Restaurant', price: 30, desc: 'Traditional French cuisine and seafood', location: 'Downtown' },
        { name: 'Wine Bar', type: 'Restaurant', price: 20, desc: 'French wines with cheese and charcuterie boards', location: 'Various locations' }
      ],
      'Luxury': [
        { name: 'Michelin Star Restaurant', type: 'Fine Dining', price: 150, desc: 'Gourmet French cuisine by renowned chefs', location: 'Upscale Area' },
        { name: 'Rooftop Restaurant', type: 'Fine Dining', price: 120, desc: 'French cuisine with Eiffel Tower views', location: 'Premium Location' },
        { name: 'Haute Cuisine', type: 'Fine Dining', price: 200, desc: 'Multi-course tasting menu with wine pairing', location: 'Luxury District' }
      ]
    },
    // Japan
    'tokyo': {
      'Cheap': [
        { name: 'Ramen Shop', type: 'Street Food', price: 800, desc: 'Authentic ramen bowls with rich broth', location: 'Various locations' },
        { name: 'Convenience Store', type: 'Local', price: 500, desc: 'Onigiri, bento boxes, and Japanese snacks', location: 'City wide' },
        { name: 'Yakitori Stands', type: 'Street Food', price: 600, desc: 'Grilled skewers and street food', location: 'Night markets' }
      ],
      'Moderate': [
        { name: 'Izakaya', type: 'Restaurant', price: 2500, desc: 'Japanese pub food with sake', location: 'City Center' },
        { name: 'Sushi Restaurant', type: 'Restaurant', price: 3000, desc: 'Fresh sushi and sashimi', location: 'Downtown' },
        { name: 'Tonkatsu Restaurant', type: 'Restaurant', price: 2000, desc: 'Breaded pork cutlets and Japanese comfort food', location: 'Various locations' }
      ],
      'Luxury': [
        { name: 'Kaiseki Restaurant', type: 'Fine Dining', price: 15000, desc: 'Traditional multi-course seasonal meal', location: 'Upscale Area' },
        { name: 'Omakase Sushi', type: 'Fine Dining', price: 20000, desc: 'Chef\'s selection of premium sushi', location: 'Premium Location' },
        { name: 'Teppanyaki', type: 'Fine Dining', price: 12000, desc: 'Premium grilled dishes prepared tableside', location: 'Luxury District' }
      ]
    },
    // UK
    'london': {
      'Cheap': [
        { name: 'Fish & Chips', type: 'Street Food', price: 8, desc: 'Classic British fish and chips', location: 'Various locations' },
        { name: 'Pub Food', type: 'Local', price: 12, desc: 'Traditional pub meals and ales', location: 'City wide' },
        { name: 'Pie & Mash', type: 'Street Food', price: 6, desc: 'Traditional London pie and mash', location: 'East London' }
      ],
      'Moderate': [
        { name: 'Gastropub', type: 'Restaurant', price: 35, desc: 'Modern British cuisine in pub setting', location: 'City Center' },
        { name: 'Afternoon Tea', type: 'Restaurant', price: 40, desc: 'Traditional English afternoon tea', location: 'Downtown' },
        { name: 'Indian Curry', type: 'Restaurant', price: 25, desc: 'Authentic Indian curries', location: 'Brick Lane' }
      ],
      'Luxury': [
        { name: 'Michelin Star Restaurant', type: 'Fine Dining', price: 150, desc: 'Modern British fine dining', location: 'Upscale Area' },
        { name: 'Gordon Ramsay Restaurant', type: 'Fine Dining', price: 200, desc: 'Celebrity chef fine dining experience', location: 'Premium Location' },
        { name: 'Rooftop Restaurant', type: 'Fine Dining', price: 120, desc: 'British cuisine with city views', location: 'Luxury District' }
      ]
    },
    // Italy
    'rome': {
      'Cheap': [
        { name: 'Pizza al Taglio', type: 'Street Food', price: 5, desc: 'Roman-style pizza by the slice', location: 'Various locations' },
        { name: 'Gelato', type: 'Street Food', price: 3, desc: 'Authentic Italian gelato', location: 'City wide' },
        { name: 'Trattoria', type: 'Local', price: 15, desc: 'Traditional Italian home-style cooking', location: 'Neighborhoods' }
      ],
      'Moderate': [
        { name: 'Osteria', type: 'Restaurant', price: 35, desc: 'Italian wine bar with small plates', location: 'City Center' },
        { name: 'Pasta Restaurant', type: 'Restaurant', price: 25, desc: 'Fresh pasta and Italian classics', location: 'Downtown' },
        { name: 'Roman Cuisine', type: 'Restaurant', price: 30, desc: 'Traditional Roman dishes like carbonara', location: 'Historic Center' }
      ],
      'Luxury': [
        { name: 'Michelin Star Restaurant', type: 'Fine Dining', price: 120, desc: 'Modern Italian fine dining', location: 'Upscale Area' },
        { name: 'Rooftop Restaurant', type: 'Fine Dining', price: 100, desc: 'Italian cuisine with city views', location: 'Premium Location' },
        { name: 'Wine Tasting', type: 'Fine Dining', price: 150, desc: 'Premium Italian wines with gourmet food', location: 'Luxury District' }
      ]
    },
    // Spain
    'barcelona': {
      'Cheap': [
        { name: 'Tapas Bars', type: 'Street Food', price: 3, desc: 'Small plates of Spanish tapas', location: 'Various locations' },
        { name: 'Churros', type: 'Street Food', price: 2, desc: 'Spanish churros with chocolate', location: 'City wide' },
        { name: 'Mercado', type: 'Local', price: 10, desc: 'Fresh market food and local specialties', location: 'La Boqueria' }
      ],
      'Moderate': [
        { name: 'Paella Restaurant', type: 'Restaurant', price: 25, desc: 'Traditional Spanish paella', location: 'City Center' },
        { name: 'Tapas Restaurant', type: 'Restaurant', price: 30, desc: 'Modern tapas and Spanish wines', location: 'Downtown' },
        { name: 'Sangria Bar', type: 'Restaurant', price: 20, desc: 'Spanish sangria and small plates', location: 'Various locations' }
      ],
      'Luxury': [
        { name: 'Michelin Star Restaurant', type: 'Fine Dining', price: 120, desc: 'Modern Catalan cuisine', location: 'Upscale Area' },
        { name: 'Rooftop Restaurant', type: 'Fine Dining', price: 100, desc: 'Spanish cuisine with city views', location: 'Premium Location' },
        { name: 'Wine & Dine', type: 'Fine Dining', price: 150, desc: 'Premium Spanish wines with gourmet food', location: 'Luxury District' }
      ]
    },
    // USA
    'new york': {
      'Cheap': [
        { name: 'Pizza Slice', type: 'Street Food', price: 3, desc: 'New York style pizza by the slice', location: 'Various locations' },
        { name: 'Hot Dogs', type: 'Street Food', price: 2, desc: 'Classic NYC street hot dogs', location: 'City wide' },
        { name: 'Food Trucks', type: 'Street Food', price: 8, desc: 'Diverse food truck options', location: 'Various locations' }
      ],
      'Moderate': [
        { name: 'Steakhouse', type: 'Restaurant', price: 50, desc: 'Classic American steakhouses', location: 'City Center' },
        { name: 'Brunch Spot', type: 'Restaurant', price: 30, desc: 'Popular NYC brunch restaurants', location: 'Downtown' },
        { name: 'Italian Deli', type: 'Restaurant', price: 20, desc: 'Authentic Italian-American delis', location: 'Various locations' }
      ],
      'Luxury': [
        { name: 'Michelin Star Restaurant', type: 'Fine Dining', price: 200, desc: 'World-class fine dining', location: 'Upscale Area' },
        { name: 'Rooftop Restaurant', type: 'Fine Dining', price: 150, desc: 'Fine dining with city skyline views', location: 'Premium Location' },
        { name: 'Celebrity Chef Restaurant', type: 'Fine Dining', price: 250, desc: 'Renowned chef fine dining experience', location: 'Luxury District' }
      ]
    },
    // Thailand
    'bangkok': {
      'Cheap': [
        { name: 'Street Food Stalls', type: 'Street Food', price: 50, desc: 'Pad Thai, som tam, and local favorites', location: 'Various locations' },
        { name: 'Night Markets', type: 'Street Food', price: 80, desc: 'Diverse street food options', location: 'City wide' },
        { name: 'Food Courts', type: 'Local', price: 100, desc: 'Affordable local food courts', location: 'Shopping malls' }
      ],
      'Moderate': [
        { name: 'Thai Restaurant', type: 'Restaurant', price: 300, desc: 'Authentic Thai cuisine', location: 'City Center' },
        { name: 'Riverside Dining', type: 'Restaurant', price: 400, desc: 'Thai food with river views', location: 'Chao Phraya' },
        { name: 'Tom Yum Restaurant', type: 'Restaurant', price: 250, desc: 'Traditional Thai soups and curries', location: 'Various locations' }
      ],
      'Luxury': [
        { name: 'Fine Dining Thai', type: 'Fine Dining', price: 2000, desc: 'Modern Thai fine dining', location: 'Upscale Area' },
        { name: 'Rooftop Restaurant', type: 'Fine Dining', price: 1500, desc: 'Thai cuisine with city views', location: 'Premium Location' },
        { name: 'Royal Thai Cuisine', type: 'Fine Dining', price: 2500, desc: 'Traditional royal Thai dishes', location: 'Luxury District' }
      ]
    },
    // Singapore
    'singapore': {
      'Cheap': [
        { name: 'Hawker Centers', type: 'Street Food', price: 5, desc: 'Local food stalls with diverse cuisines', location: 'Various locations' },
        { name: 'Chicken Rice', type: 'Street Food', price: 4, desc: 'Singapore\'s national dish', location: 'City wide' },
        { name: 'Laksa Stalls', type: 'Street Food', price: 6, desc: 'Spicy noodle soup', location: 'Various locations' }
      ],
      'Moderate': [
        { name: 'Peranakan Restaurant', type: 'Restaurant', price: 40, desc: 'Fusion of Chinese and Malay cuisines', location: 'City Center' },
        { name: 'Seafood Restaurant', type: 'Restaurant', price: 50, desc: 'Fresh seafood and chili crab', location: 'Downtown' },
        { name: 'Dim Sum', type: 'Restaurant', price: 35, desc: 'Authentic Chinese dim sum', location: 'Chinatown' }
      ],
      'Luxury': [
        { name: 'Michelin Star Restaurant', type: 'Fine Dining', price: 200, desc: 'World-class fine dining', location: 'Upscale Area' },
        { name: 'Rooftop Restaurant', type: 'Fine Dining', price: 150, desc: 'Fine dining with Marina Bay views', location: 'Premium Location' },
        { name: 'Celebrity Chef Restaurant', type: 'Fine Dining', price: 250, desc: 'Renowned chef fine dining', location: 'Luxury District' }
      ]
    },
    // Australia
    'sydney': {
      'Cheap': [
        { name: 'Fish & Chips', type: 'Street Food', price: 12, desc: 'Fresh Australian fish and chips', location: 'Various locations' },
        { name: 'Meat Pies', type: 'Street Food', price: 5, desc: 'Traditional Australian meat pies', location: 'City wide' },
        { name: 'Food Markets', type: 'Local', price: 15, desc: 'Fresh produce and ready-to-eat meals', location: 'Various markets' }
      ],
      'Moderate': [
        { name: 'Modern Australian', type: 'Restaurant', price: 50, desc: 'Contemporary Australian cuisine', location: 'City Center' },
        { name: 'Seafood Restaurant', type: 'Restaurant', price: 60, desc: 'Fresh Australian seafood', location: 'Harbor area' },
        { name: 'Cafe Culture', type: 'Restaurant', price: 30, desc: 'Australian brunch and coffee culture', location: 'Various locations' }
      ],
      'Luxury': [
        { name: 'Fine Dining', type: 'Fine Dining', price: 200, desc: 'World-class Australian fine dining', location: 'Upscale Area' },
        { name: 'Harbor View Restaurant', type: 'Fine Dining', price: 180, desc: 'Fine dining with harbor views', location: 'Premium Location' },
        { name: 'Celebrity Chef Restaurant', type: 'Fine Dining', price: 250, desc: 'Renowned chef fine dining', location: 'Luxury District' }
      ]
    },
    // New Zealand
    'auckland': {
      'Cheap': [
        { name: 'Fish & Chips', type: 'Street Food', price: 12, desc: 'Fresh New Zealand fish and chips', location: 'Various locations' },
        { name: 'Pies', type: 'Street Food', price: 5, desc: 'Traditional New Zealand meat pies', location: 'City wide' },
        { name: 'Food Markets', type: 'Local', price: 15, desc: 'Fresh produce and local specialties', location: 'Various markets' }
      ],
      'Moderate': [
        { name: 'Modern NZ Cuisine', type: 'Restaurant', price: 50, desc: 'Contemporary New Zealand cuisine', location: 'City Center' },
        { name: 'Seafood Restaurant', type: 'Restaurant', price: 60, desc: 'Fresh New Zealand seafood', location: 'Harbor area' },
        { name: 'Cafe Culture', type: 'Restaurant', price: 30, desc: 'Kiwi brunch and coffee culture', location: 'Various locations' }
      ],
      'Luxury': [
        { name: 'Fine Dining', type: 'Fine Dining', price: 200, desc: 'World-class New Zealand fine dining', location: 'Upscale Area' },
        { name: 'Harbor View Restaurant', type: 'Fine Dining', price: 180, desc: 'Fine dining with harbor views', location: 'Premium Location' },
        { name: 'Wine & Dine', type: 'Fine Dining', price: 250, desc: 'Premium NZ wines with gourmet food', location: 'Luxury District' }
      ]
    },
    // Dubai
    'dubai': {
      'Cheap': [
        { name: 'Shawarma Stands', type: 'Street Food', price: 15, desc: 'Middle Eastern shawarma wraps', location: 'Various locations' },
        { name: 'Falafel', type: 'Street Food', price: 10, desc: 'Fresh falafel and hummus', location: 'City wide' },
        { name: 'Food Courts', type: 'Local', price: 25, desc: 'Diverse international food options', location: 'Shopping malls' }
      ],
      'Moderate': [
        { name: 'Lebanese Restaurant', type: 'Restaurant', price: 80, desc: 'Authentic Lebanese cuisine', location: 'City Center' },
        { name: 'Arabic Restaurant', type: 'Restaurant', price: 100, desc: 'Traditional Arabic dishes', location: 'Downtown' },
        { name: 'International Cuisine', type: 'Restaurant', price: 90, desc: 'Diverse international options', location: 'Various locations' }
      ],
      'Luxury': [
        { name: 'Fine Dining', type: 'Fine Dining', price: 400, desc: 'World-class fine dining', location: 'Upscale Area' },
        { name: 'Burj Al Arab Restaurant', type: 'Fine Dining', price: 500, desc: 'Luxury dining in iconic hotel', location: 'Premium Location' },
        { name: 'Celebrity Chef Restaurant', type: 'Fine Dining', price: 600, desc: 'Renowned chef fine dining', location: 'Luxury District' }
      ]
    },
    // Egypt
    'cairo': {
      'Cheap': [
        { name: 'Koshary', type: 'Street Food', price: 20, desc: 'Egyptian national dish', location: 'Various locations' },
        { name: 'Falafel & Ta\'ameya', type: 'Street Food', price: 15, desc: 'Traditional Egyptian street food', location: 'City wide' },
        { name: 'Food Stalls', type: 'Street Food', price: 25, desc: 'Local Egyptian street food', location: 'Various locations' }
      ],
      'Moderate': [
        { name: 'Traditional Restaurant', type: 'Restaurant', price: 150, desc: 'Authentic Egyptian cuisine', location: 'City Center' },
        { name: 'Nile View Restaurant', type: 'Restaurant', price: 200, desc: 'Egyptian food with Nile views', location: 'Nile Corniche' },
        { name: 'Kebab Restaurant', type: 'Restaurant', price: 120, desc: 'Grilled meats and Egyptian dishes', location: 'Various locations' }
      ],
      'Luxury': [
        { name: 'Fine Dining', type: 'Fine Dining', price: 500, desc: 'Modern Egyptian fine dining', location: 'Upscale Area' },
        { name: 'Rooftop Restaurant', type: 'Fine Dining', price: 400, desc: 'Fine dining with city views', location: 'Premium Location' },
        { name: 'Luxury Hotel Restaurant', type: 'Fine Dining', price: 600, desc: 'World-class fine dining', location: 'Luxury District' }
      ]
    }
  }
  
  // Check for destination-specific food
  if (destinationFood[destinationLower] && destinationFood[destinationLower][budget]) {
    return destinationFood[destinationLower][budget]
  }
  
  // Generic food recommendations that work for any destination
  const foodData = {
    'Cheap': [
      { name: 'Local Street Food', type: 'Street Food', price: 80, desc: 'Authentic local flavors', location: 'Various locations' },
      { name: 'Local Eateries', type: 'Local', price: 150, desc: 'Traditional meals', location: 'City wide' },
      { name: 'Food Stalls', type: 'Street Food', price: 50, desc: 'Quick bites and snacks', location: 'Market areas' }
    ],
    'Moderate': [
      { name: 'Multi-cuisine Restaurant', type: 'Restaurant', price: 300, desc: 'Variety of cuisines', location: 'City Center' },
      { name: 'Local Restaurant', type: 'Restaurant', price: 250, desc: 'Regional specialties', location: 'Downtown' },
      { name: 'Cafe & Bistro', type: 'Restaurant', price: 200, desc: 'Casual dining', location: 'Main Street' }
    ],
    'Luxury': [
      { name: 'Fine Dining Restaurant', type: 'Fine Dining', price: 1200, desc: 'Gourmet cuisine', location: 'Upscale Area' },
      { name: 'Rooftop Restaurant', type: 'Fine Dining', price: 1000, desc: 'Scenic views with dining', location: 'Premium Location' },
      { name: 'Specialty Restaurant', type: 'Fine Dining', price: 800, desc: 'Chef\'s special menu', location: 'Luxury Hotel' }
    ]
  }
  
  return foodData[budget] || foodData['Moderate']
}

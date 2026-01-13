// Currency mapping for destinations

export const getCurrencyForDestination = (destination) => {
  const destinationLower = destination?.toLowerCase() || ''
  
  const currencyMap = {
    // India
    'india': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'pune': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'mumbai': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'delhi': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'goa': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'bangalore': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'hyderabad': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'kolkata': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'chennai': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'jaipur': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'udaipur': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'shimla': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'manali': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    'mahabaleshwar': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    
    // Europe - EUR
    'france': { symbol: '€', code: 'EUR', name: 'Euro' },
    'paris': { symbol: '€', code: 'EUR', name: 'Euro' },
    'spain': { symbol: '€', code: 'EUR', name: 'Euro' },
    'barcelona': { symbol: '€', code: 'EUR', name: 'Euro' },
    'madrid': { symbol: '€', code: 'EUR', name: 'Euro' },
    'italy': { symbol: '€', code: 'EUR', name: 'Euro' },
    'rome': { symbol: '€', code: 'EUR', name: 'Euro' },
    'milan': { symbol: '€', code: 'EUR', name: 'Euro' },
    'venice': { symbol: '€', code: 'EUR', name: 'Euro' },
    'florence': { symbol: '€', code: 'EUR', name: 'Euro' },
    'germany': { symbol: '€', code: 'EUR', name: 'Euro' },
    'berlin': { symbol: '€', code: 'EUR', name: 'Euro' },
    'austria': { symbol: '€', code: 'EUR', name: 'Euro' },
    'vienna': { symbol: '€', code: 'EUR', name: 'Euro' },
    'portugal': { symbol: '€', code: 'EUR', name: 'Euro' },
    'lisbon': { symbol: '€', code: 'EUR', name: 'Euro' },
    'greece': { symbol: '€', code: 'EUR', name: 'Euro' },
    'athens': { symbol: '€', code: 'EUR', name: 'Euro' },
    'santorini': { symbol: '€', code: 'EUR', name: 'Euro' },
    'mykonos': { symbol: '€', code: 'EUR', name: 'Euro' },
    'netherlands': { symbol: '€', code: 'EUR', name: 'Euro' },
    'amsterdam': { symbol: '€', code: 'EUR', name: 'Euro' },
    'belgium': { symbol: '€', code: 'EUR', name: 'Euro' },
    'brussels': { symbol: '€', code: 'EUR', name: 'Euro' },
    'switzerland': { symbol: 'CHF', code: 'CHF', name: 'Swiss Franc' },
    'zurich': { symbol: 'CHF', code: 'CHF', name: 'Swiss Franc' },
    
    // UK - GBP
    'united kingdom': { symbol: '£', code: 'GBP', name: 'British Pound' },
    'uk': { symbol: '£', code: 'GBP', name: 'British Pound' },
    'england': { symbol: '£', code: 'GBP', name: 'British Pound' },
    'london': { symbol: '£', code: 'GBP', name: 'British Pound' },
    'edinburgh': { symbol: '£', code: 'GBP', name: 'British Pound' },
    'scotland': { symbol: '£', code: 'GBP', name: 'British Pound' },
    'ireland': { symbol: '€', code: 'EUR', name: 'Euro' },
    'dublin': { symbol: '€', code: 'EUR', name: 'Euro' },
    
    // Asia
    'japan': { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
    'tokyo': { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
    'osaka': { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
    'kyoto': { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
    'singapore': { symbol: 'S$', code: 'SGD', name: 'Singapore Dollar' },
    'thailand': { symbol: '฿', code: 'THB', name: 'Thai Baht' },
    'bangkok': { symbol: '฿', code: 'THB', name: 'Thai Baht' },
    'phuket': { symbol: '฿', code: 'THB', name: 'Thai Baht' },
    'uae': { symbol: 'AED', code: 'AED', name: 'UAE Dirham' },
    'united arab emirates': { symbol: 'AED', code: 'AED', name: 'UAE Dirham' },
    'dubai': { symbol: 'AED', code: 'AED', name: 'UAE Dirham' },
    'abu dhabi': { symbol: 'AED', code: 'AED', name: 'UAE Dirham' },
    'hong kong': { symbol: 'HK$', code: 'HKD', name: 'Hong Kong Dollar' },
    'china': { symbol: '¥', code: 'CNY', name: 'Chinese Yuan' },
    'beijing': { symbol: '¥', code: 'CNY', name: 'Chinese Yuan' },
    'shanghai': { symbol: '¥', code: 'CNY', name: 'Chinese Yuan' },
    'south korea': { symbol: '₩', code: 'KRW', name: 'South Korean Won' },
    'seoul': { symbol: '₩', code: 'KRW', name: 'South Korean Won' },
    'malaysia': { symbol: 'RM', code: 'MYR', name: 'Malaysian Ringgit' },
    'kuala lumpur': { symbol: 'RM', code: 'MYR', name: 'Malaysian Ringgit' },
    'indonesia': { symbol: 'Rp', code: 'IDR', name: 'Indonesian Rupiah' },
    'jakarta': { symbol: 'Rp', code: 'IDR', name: 'Indonesian Rupiah' },
    'bali': { symbol: 'Rp', code: 'IDR', name: 'Indonesian Rupiah' },
    'philippines': { symbol: '₱', code: 'PHP', name: 'Philippine Peso' },
    'manila': { symbol: '₱', code: 'PHP', name: 'Philippine Peso' },
    'vietnam': { symbol: '₫', code: 'VND', name: 'Vietnamese Dong' },
    'ho chi minh city': { symbol: '₫', code: 'VND', name: 'Vietnamese Dong' },
    'hanoi': { symbol: '₫', code: 'VND', name: 'Vietnamese Dong' },
    'taiwan': { symbol: 'NT$', code: 'TWD', name: 'Taiwan Dollar' },
    'taipei': { symbol: 'NT$', code: 'TWD', name: 'Taiwan Dollar' },
    'turkey': { symbol: '₺', code: 'TRY', name: 'Turkish Lira' },
    'istanbul': { symbol: '₺', code: 'TRY', name: 'Turkish Lira' },
    
    // Americas - USD
    'united states': { symbol: '$', code: 'USD', name: 'US Dollar' },
    'usa': { symbol: '$', code: 'USD', name: 'US Dollar' },
    'america': { symbol: '$', code: 'USD', name: 'US Dollar' },
    'new york': { symbol: '$', code: 'USD', name: 'US Dollar' },
    'los angeles': { symbol: '$', code: 'USD', name: 'US Dollar' },
    'san francisco': { symbol: '$', code: 'USD', name: 'US Dollar' },
    'chicago': { symbol: '$', code: 'USD', name: 'US Dollar' },
    'miami': { symbol: '$', code: 'USD', name: 'US Dollar' },
    'las vegas': { symbol: '$', code: 'USD', name: 'US Dollar' },
    'canada': { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
    'toronto': { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
    'vancouver': { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
    'montreal': { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
    'mexico': { symbol: 'Mex$', code: 'MXN', name: 'Mexican Peso' },
    'mexico city': { symbol: 'Mex$', code: 'MXN', name: 'Mexican Peso' },
    'brazil': { symbol: 'R$', code: 'BRL', name: 'Brazilian Real' },
    'rio de janeiro': { symbol: 'R$', code: 'BRL', name: 'Brazilian Real' },
    'sao paulo': { symbol: 'R$', code: 'BRL', name: 'Brazilian Real' },
    'argentina': { symbol: '$', code: 'ARS', name: 'Argentine Peso' },
    'buenos aires': { symbol: '$', code: 'ARS', name: 'Argentine Peso' },
    'peru': { symbol: 'S/', code: 'PEN', name: 'Peruvian Sol' },
    'lima': { symbol: 'S/', code: 'PEN', name: 'Peruvian Sol' },
    'colombia': { symbol: '$', code: 'COP', name: 'Colombian Peso' },
    'bogota': { symbol: '$', code: 'COP', name: 'Colombian Peso' },
    
    // Oceania
    'australia': { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
    'sydney': { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
    'melbourne': { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
    'brisbane': { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
    'perth': { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
    'adelaide': { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
    'new zealand': { symbol: 'NZ$', code: 'NZD', name: 'New Zealand Dollar' },
    'auckland': { symbol: 'NZ$', code: 'NZD', name: 'New Zealand Dollar' },
    'wellington': { symbol: 'NZ$', code: 'NZD', name: 'New Zealand Dollar' },
    'queenstown': { symbol: 'NZ$', code: 'NZD', name: 'New Zealand Dollar' },
    'christchurch': { symbol: 'NZ$', code: 'NZD', name: 'New Zealand Dollar' },
    
    // Africa
    'egypt': { symbol: 'E£', code: 'EGP', name: 'Egyptian Pound' },
    'cairo': { symbol: 'E£', code: 'EGP', name: 'Egyptian Pound' },
    'south africa': { symbol: 'R', code: 'ZAR', name: 'South African Rand' },
    'cape town': { symbol: 'R', code: 'ZAR', name: 'South African Rand' },
    'johannesburg': { symbol: 'R', code: 'ZAR', name: 'South African Rand' },
    'morocco': { symbol: 'د.م.', code: 'MAD', name: 'Moroccan Dirham' },
    'marrakech': { symbol: 'د.م.', code: 'MAD', name: 'Moroccan Dirham' },
    'casablanca': { symbol: 'د.م.', code: 'MAD', name: 'Moroccan Dirham' },
    'kenya': { symbol: 'KSh', code: 'KES', name: 'Kenyan Shilling' },
    'nairobi': { symbol: 'KSh', code: 'KES', name: 'Kenyan Shilling' },
    'nigeria': { symbol: '₦', code: 'NGN', name: 'Nigerian Naira' },
    'lagos': { symbol: '₦', code: 'NGN', name: 'Nigerian Naira' },
    'ghana': { symbol: '₵', code: 'GHS', name: 'Ghanaian Cedi' },
    'accra': { symbol: '₵', code: 'GHS', name: 'Ghanaian Cedi' },
    
    // Middle East
    'qatar': { symbol: 'QR', code: 'QAR', name: 'Qatari Riyal' },
    'doha': { symbol: 'QR', code: 'QAR', name: 'Qatari Riyal' },
    'saudi arabia': { symbol: '﷼', code: 'SAR', name: 'Saudi Riyal' },
    'riyadh': { symbol: '﷼', code: 'SAR', name: 'Saudi Riyal' },
    'israel': { symbol: '₪', code: 'ILS', name: 'Israeli Shekel' },
    'tel aviv': { symbol: '₪', code: 'ILS', name: 'Israeli Shekel' },
    'jerusalem': { symbol: '₪', code: 'ILS', name: 'Israeli Shekel' },
    'lebanon': { symbol: 'ل.ل', code: 'LBP', name: 'Lebanese Pound' },
    'beirut': { symbol: 'ل.ل', code: 'LBP', name: 'Lebanese Pound' },
    
    // Other popular destinations
    'maldives': { symbol: 'Rf', code: 'MVR', name: 'Maldivian Rufiyaa' },
    'mauritius': { symbol: '₨', code: 'MUR', name: 'Mauritian Rupee' },
    'seychelles': { symbol: '₨', code: 'SCR', name: 'Seychellois Rupee' },
    'czech republic': { symbol: 'Kč', code: 'CZK', name: 'Czech Koruna' },
    'prague': { symbol: 'Kč', code: 'CZK', name: 'Czech Koruna' }
  }
  
  // Try exact match first
  if (currencyMap[destinationLower]) {
    return currencyMap[destinationLower]
  }
  
  // Try partial match
  for (const [key, currency] of Object.entries(currencyMap)) {
    if (destinationLower.includes(key) || key.includes(destinationLower)) {
      return currency
    }
  }
  
  // Country-level fallbacks
  if (destinationLower.includes('france') || destinationLower.includes('paris')) {
    return currencyMap['france']
  }
  if (destinationLower.includes('uk') || destinationLower.includes('united kingdom') || destinationLower.includes('england') || destinationLower.includes('london')) {
    return currencyMap['united kingdom']
  }
  if (destinationLower.includes('italy') || destinationLower.includes('rome')) {
    return currencyMap['italy']
  }
  if (destinationLower.includes('spain') || destinationLower.includes('barcelona')) {
    return currencyMap['spain']
  }
  if (destinationLower.includes('japan') || destinationLower.includes('tokyo')) {
    return currencyMap['japan']
  }
  if (destinationLower.includes('china') || destinationLower.includes('beijing')) {
    return currencyMap['china']
  }
  if (destinationLower.includes('australia') || destinationLower.includes('sydney')) {
    return currencyMap['australia']
  }
  if (destinationLower.includes('zealand') || destinationLower.includes('new zealand')) {
    return currencyMap['new zealand']
  }
  if (destinationLower.includes('usa') || destinationLower.includes('united states') || destinationLower.includes('america')) {
    return currencyMap['united states']
  }
  if (destinationLower.includes('canada') || destinationLower.includes('toronto')) {
    return currencyMap['canada']
  }
  if (destinationLower.includes('thailand') || destinationLower.includes('bangkok')) {
    return currencyMap['thailand']
  }
  if (destinationLower.includes('uae') || destinationLower.includes('united arab emirates') || destinationLower.includes('dubai')) {
    return currencyMap['uae']
  }
  if (destinationLower.includes('egypt') || destinationLower.includes('cairo')) {
    return currencyMap['egypt']
  }
  if (destinationLower.includes('south africa') || destinationLower.includes('cape town')) {
    return currencyMap['south africa']
  }
  if (destinationLower.includes('turkey') || destinationLower.includes('istanbul')) {
    return currencyMap['turkey']
  }
  
  // Default to USD for unknown destinations
  return { symbol: '$', code: 'USD', name: 'US Dollar' }
}

export const formatPrice = (price, destination) => {
  const currency = getCurrencyForDestination(destination)
  return `${currency.symbol}${price.toLocaleString()}`
}




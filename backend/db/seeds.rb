UserItinerary.destroy_all
User.destroy_all
Plan.destroy_all
Attraction.destroy_all
Area.destroy_all
City.destroy_all
Itinerary.destroy_all

# Create Alexa
alexa = User.create(username: "lexietx", name: "Alexa")
alexa.password = "password"
alexa.save

adam = User.create(username: "moranja", name: "Adam")
adam.password = "password"
adam.save

# Create Japan Itinerary
japan_itinerary = Itinerary.create(title: "10 days in Japan!", vital_info: "Flight info, hotel reservations, etc", helpful_info: "train tables, tour reservations", notes: "Check out this New York Times article...", description: "Visiting Kyoto, Tokyo, Hakone and Osaka on our first trip to Japan", image_url: "https://cdn-images-1.medium.com/max/1600/1*NrNiYv3grGH4aSkE2w51zQ.jpeg")

# Join them
UserItinerary.create(user: alexa, itinerary: japan_itinerary)
UserItinerary.create(user: adam, itinerary: japan_itinerary)

# Cities Hash
cities = [
  {
    name: "Tokyo",
    country: "Japan",
    content: "Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens. The city's many museums offer exhibits ranging from classical art (in the Tokyo National Museum) to a reconstructed kabuki theater (in the Edo-Tokyo Museum)."
  },
  {
    name: "Kyoto",
    country: "Japan",
    content: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It’s also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district."
  },
  {
    name: "Osaka",
    country: "Japan",
    content: "Osaka is a large port city and commercial center on the Japanese island of Honshu. It's known for its modern architecture, nightlife and hearty street food. The 16th-century shogunate Osaka Castle, which has undergone several restorations, is its main historical landmark. It's surrounded by a moat and park with plum, peach and cherry-blossom trees. Sumiyoshi-taisha is among Japan’s oldest Shinto shrines."
  },
  {
    name: "Hakone",
    country: "Japan",
    content: "Hakone, in Japan's Fuji-Hakone-Izu National Park west of Tokyo, is a mountainous town known for its hot springs resorts (onsen) and views of the iconic volcano Mount Fuji. It also encompasses Hakone Shrine, a Shinto shrine with a red “torii” gate overlooking Lake Ashi, which can be toured by boat, as well as the boiling sulphur springs of the Owakudani Valley."
  },
]

# cities.each do |city|
#   city[:name] = City.create(name: city[:name], country: city[:country], content: city[:content])
# end

# Create the cities
tokyo = City.create(itinerary: japan_itinerary, name: cities[0][:name], country: cities[0][:country], content: cities[0][:content])
kyoto = City.create(itinerary: japan_itinerary, name: cities[1][:name], country: cities[1][:country], content: cities[1][:content])
osaka = City.create(itinerary: japan_itinerary, name: cities[2][:name], country: cities[2][:country], content: cities[2][:content])
hakone = City.create(itinerary: japan_itinerary, name: cities[3][:name], country: cities[3][:country], content: cities[3][:content])

# Create the detailed schedule
Plan.create(city: tokyo, date: "2017-10-25", time: "midday", content: "Shibuya crossing and street food")
Plan.create(city: tokyo, date: "2017-10-25", time: "afternoon", content: "Shop along Omote-sando")
Plan.create(city: tokyo, date: "2017-10-25", time: "evening", content: "Harajuku people watching and dinner")
Plan.create(city: tokyo, date: "2017-10-25", time: "night", content: "Barhopping in Golden Gai, Shinjuku")

Plan.create(city: tokyo, date: "2017-10-26", time: "morning", content: "Tsukiji fish market for breakfast")
Plan.create(city: tokyo, date: "2017-10-26", time: "midday", content: "Ginza Shopping and Imperial Palace")
Plan.create(city: tokyo, date: "2017-10-26", time: "afternoon", content: "Nerd out in Akihabara")

Plan.create(city: tokyo, date: "2017-10-27", time: "morning", content: "Asakusa temple")
Plan.create(city: tokyo, date: "2017-10-27", time: "midday", content: "Asahi Beer Headquarters")
Plan.create(city: tokyo, date: "2017-10-27", time: "afternoon", content: "Tokyo Skytree")
Plan.create(city: tokyo, date: "2017-10-27", time: "evening", content: "Robot Restaurant at 7!")
Plan.create(city: tokyo, date: "2017-10-27", time: "night", content: "Shinjuku nightlife")

Plan.create(city: tokyo, date: "2017-10-28", time: "afternoon", content: "Roppongi Hills?")

# Create Areas
shibuya = Area.create(city: tokyo, name: "Shibuya", content: "Bustling modern area famous for the Shibuya Crossing, the busiest crosswalk in the world!")
harajuku = Area.create(city: tokyo, name: "Harajuku", content: "Unique area with interesting people-watching opportunities")
roppongi = Area.create(city: tokyo, name: "Roppongi", content: "Upscale, modern area with a more western feel")
shinjuku = Area.create(city: tokyo, name: "Shinjuku", content: "Neon capital of Tokyo's nightlife")
akihabara = Area.create(city: tokyo, name: "Akihabara", content: "Mecca for nerdy gaming stuff")
central_tokyo = Area.create(city: tokyo, name: "Central Tokyo", content: "Ginza, the Imperial Palace, and the Tsukiji Fish Market")
asakusa = Area.create(city: tokyo, name: "Asakusa", content: "Massive temple surrounded by interesting shops")

# Attractions hash
attractions = [
  {
    area: shibuya,
    name: "Reissue",
    classification: "Food and Drink",
    latitude: "35.67117629999999",
    longitude: "139.70795829999997",
    place_id: "ChIJfyW8OaOMGGARiYF53TCqEsM",
    address: nil,
    hours: nil,
    cost: nil,
    description: "3D Latte Art"
  },
  {
    area: shibuya,
    name: "Tsunahachi Tempura",
    classification: "Food and Drink",
    latitude: "35.6908266",
    longitude: "139.70337470000004",
    place_id: "ChIJj3qsV9qMGGARM4vedGDY0k0",
    address: nil,
    hours: nil,
    cost: nil,
    description: "by shibuya station"
  },
  {
    area: shibuya,
    name: "Narukiyo",
    classification: "Food and Drink",
    latitude: "35.660497",
    longitude: "139.70785580000006",
    place_id: "ChIJgVIRH1-LGGARoFHJWa1Q7JM",
    address: nil,
    hours: nil,
    cost: nil,
    description: "famous izakaya with omakase"
  },
  {
    area: shibuya,
    name: "Nonbee Yokocho",
    classification: "Food and Drink",
    latitude: "35.6598629",
    longitude: "139.70138840000004",
    place_id: "ChIJpwDSAViLGGARVaJ_WUwQrt8",
    address: nil,
    hours: nil,
    cost: nil,
    description: "narrow passageway along JR Railway with tiny restaurants & bars"
  },
  {
    area: shibuya,
    name: "Nadaichi",
    classification: "Food and Drink",
    latitude: "35.731825",
    longitude: "139.781475",
    place_id: "ChIJa_8773yOGGARYxWeYmb-v3c",
    address: nil,
    hours: nil,
    cost: nil,
    description: "hotpot"
  },
  {
    area: shibuya,
    name: "Bar Piano",
    classification: "Food and Drink",
    latitude: "35.6600497",
    longitude: "139.70149809999998",
    place_id: "ChIJCYB-AFiLGGARdySmdO063Ts",
    address: nil,
    hours: nil,
    cost: nil,
    description: "bar featured in Anthony Bourdain’s Parts Unknown"
  },
  {
    area: shibuya,
    name: "Uogashi Standing Sushi",
    classification: "Food and Drink",
    latitude: "35.68996979999999",
    longitude: "139.6972899",
    place_id: "ChIJ5-LVSdGMGGARO2nfNb18X8c",
    address: nil,
    hours: nil,
    cost: nil,
    description: "in center Gai where locals go, next to burger king, set menu for lunch, a la carte for dinner"
  },
  {
    area: shibuya,
    name: "Sushi-no-midori",
    classification: "Food and Drink",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "popular sushi place with wait"
  },
  {
    area: shibuya,
    name: "Shibuya Crossing",
    classification: "Attraction",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "Busiest crosswalk in the world"
  },
  {
    area: shibuya,
    name: "Hachiko Statue",
    classification: "Attraction",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "Movie based on this sad tale"
  },
  {
    area: shibuya,
    name: "Center Gai",
    classification: "Nightlife",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "Bar hopping"
  },
  {
    area: harajuku,
    name: "Yai Yai",
    classification: "Food and Drink",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "Okonomiyaki"
  },
  {
    area: harajuku,
    name: "Calbee Plus",
    classification: "Food and Drink",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "potato snacks on Takeshita Dori"
  },
  {
    area: harajuku,
    name: "Glaciel",
    classification: "Food and Drink",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "Ice cream cakes"
  },
  {
    area: harajuku,
    name: "Maisen",
    classification: "Food and Drink",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "Excellent tonkatsu"
  },
  {
    area: harajuku,
    name: "Harajuku Taproom",
    classification: "Food and Drink",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "Craft beer"
  },
  {
    area: harajuku,
    name: "100 Yen stores",
    classification: "Shopping",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "check out the popular Japanese version of dollar stores"
  },
  {
    area: roppongi,
    name: "Gonpachi",
    classification: "Food and Drink",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "Upscale izakaya, inspiration for a scene in Kill Bill"
  },
  {
    area: roppongi,
    name: "Warayakiya",
    classification: "Food and Drink",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "cool izakaya, make reservations"
  },
  {
    area: roppongi,
    name: "Tokyo tower",
    classification: "Attraction",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "most famous observation tower, modeled after the Eiffel tower"
  },
  {
    area: shinjuku,
    name: "Torikawa Nagamasa",
    classification: "Food and Drink",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "incredible yakitori!"
  },
  {
    area: shinjuku,
    name: "New York Bar",
    classification: "Food and Drink",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "Swanky hotel bar, seen in 'Lost in Translation'"
  },
  {
    area: shinjuku,
    name: "Golden Gai",
    classification: "Nightlife",
    latitude: "35.65834099999999",
    longitude: "139.69898579999995",
    place_id: "ChIJo4dGzFeLGGARO7BvenQ8U3s",
    address: nil,
    hours: nil,
    cost: nil,
    description: "Really cool spot to bar hop, tons of tiny bars with a lot of character!"
  }
]

attractions.each do |att|
  Attraction.create(area: att[:area], name: att[:name], latitude: att[:latitude], longitude: att[:longitude], place_id: att[:place_id], classification: att[:classification], description: att[:description])
end


#=================================================================================

# Create Itinerary
west_coast = Itinerary.create(title: "Family reunion in San Fran, then PNW", vital_info: "Flight info, hotel reservations, etc", helpful_info: "train tables, tour reservations", notes: "Check out this New York Times article...", description: "Our first trip to San Francisco, Portland, and Seattle", image_url: "https://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/landmark-images/golden-gate_web.jpg")

# Join it
UserItinerary.create(user: alexa, itinerary: west_coast)

#=================================================================================

# Create Itinerary
barcelona = Itinerary.create(title: "Honeymoon in Barcelona", vital_info: "Flight info, hotel reservations, etc", helpful_info: "train tables, tour reservations", notes: "Check out this New York Times article...", description: "Two weeks wining and dining in Barcelona", image_url: "https://hotelarclarambla.com/wp-content/uploads/2018/01/hotel-arc-la-rambla-conoce-sagrada-familia.jpg")

# Join it
UserItinerary.create(user: alexa, itinerary: barcelona)
UserItinerary.create(user: adam, itinerary: barcelona)

#=================================================================================

# Create Itinerary
greece = Itinerary.create(title: "Island hopping in Greece", vital_info: "Flight info, hotel reservations, etc", helpful_info: "train tables, tour reservations", notes: "Check out this New York Times article...", description: "History and beaches!", image_url: "https://www.discovergreece.com/~/media/images/article-background-images/santorini-the-one-and-only/santorini-view.ashx")

# Join it
UserItinerary.create(user: alexa, itinerary: greece)
UserItinerary.create(user: adam, itinerary: greece)

#=================================================================================

# Create Itinerary
uk_malta = Itinerary.create(title: "Ireland, England, & Malta", vital_info: "Flight info, hotel reservations, etc", helpful_info: "train tables, tour reservations", notes: "Check out this New York Times article...", description: "Meeting the family in London, with some stops before and after for ourselves", image_url: "https://cdn.londonandpartners.com/visit/general-london/areas/river/76709-640x360-houses-of-parliament-and-london-eye-on-thames-from-above-640.jpg")

# Join it
UserItinerary.create(user: alexa, itinerary: uk_malta)

#=================================================================================

# Create Itinerary
iceland = Itinerary.create(title: "A long weekend in Iceland", vital_info: "Flight info, hotel reservations, etc", helpful_info: "train tables, tour reservations", notes: "Check out this New York Times article...", description: "Seeing the beautiful land of fire and ice and hunting the Aurora Borealis", image_url: "https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1544200275/northern-lights-kirkjufell-mountain-snaefellsnes-iceland-ICELANDLIGHTS1218.jpg?itok=hZwXB01a")

# Join it
UserItinerary.create(user: alexa, itinerary: iceland)
UserItinerary.create(user: adam, itinerary: iceland)

#=================================================================================

# Create Itinerary
italy = Itinerary.create(title: "Visiting Italy with my parents", vital_info: "Flight info, hotel reservations, etc", helpful_info: "train tables, tour reservations", notes: "Check out this New York Times article...", description: "Returning to some of my favorite places in Italy with my parents", image_url: "https://live.staticflickr.com/3753/9311590822_7bc867de1d_b.jpg")

# Join it
UserItinerary.create(user: alexa, itinerary: italy)

#=================================================================================

# Create Houston Itinerary
houston_itinerary = Itinerary.create(title: "Houston Heights", vital_info: "Flight info, hotel reservations, etc", helpful_info: "train tables, tour reservations", notes: "Check out this New York Times article...", description: "A walk up the boulevard in the cultural capital of the South.", image_url: "https://scontent-dfw5-1.xx.fbcdn.net/v/t31.0-8/30171615_1657692390986955_7965322445269873040_o.jpg?_nc_cat=104&_nc_oc=AQkYlyRqYxRtPzta2mRT8omGw2DtjafxzChjquEjKlRvnUCqn77YaC10h3NmgVUchlU&_nc_ht=scontent-dfw5-1.xx&oh=16e5f29334e2a7be99b579fd6f0bc83a&oe=5D9FB925")

# Join it
UserItinerary.create(user: alexa, itinerary: houston_itinerary)

#=================================================================================

class Itinerary < ApplicationRecord
  has_many :user_itineraries
  has_many :users, through: :user_itineraries
  has_many :cities
  has_many :areas, through: :cities
  has_many :attractions, through: :areas
  has_many :plans, through: :cities

  before_save :default_values

  def default_values
    self.vital_info ||= "Flight info, hotel reservations, etc"
    self.helpful_info ||= "Train tables, tour reservations, etc"
    self.notes ||= "Check out this New York Times article..."
  end

  def attractions_by_distance (lat, lng)
    self.attractions.sort_by{|att| Math.sqrt((att.latitude.to_f - lat)**2 + (att.longitude.to_f - lng)**2)}
  end

  def plans_by_date
    self.plans.group_by{|i| i.date}.keys.sort
  end

  def full_itinerary
    itinerary_hash = {}
    itinerary_hash[:details] = self
    itinerary_hash[:schedule] = self.plans_by_date
    itinerary_hash[:users] = self.users
    itinerary_hash[:attractions] = self.attractions
    itinerary_hash[:cities] = []
    self.cities.each do |city|
      area_array = []
      city.areas.each do |area|
        area_array.push({id: area.id, name: area.name, content: area.content, attractions: area.attractions})
      end
      itinerary_hash[:cities].push(id: city.id, name: city.name, country: city.country, content: city.content, areas: area_array, plans: city.plans_by_date)
    end
    itinerary_hash
  end

  def export_attractions
    # CSV.open("csv/#{file_name}.csv", "w+") do |csv|
    #   csv << ["Latitude, Longitude", "Name", "Address", "Cost", "Classification", "Description"]
    #   keys = ["name", "address", "cost", "classification", "description"]
    #   self.attractions.each do |att|
    #     attraction_array = []
    #     attraction_array.push(att.lat_lng)
    #     keys.each do |k|
    #       attraction_array.push(att[k])
    #     end
    #     csv << attraction_array
    #   end
    # end
    # this downloads a csv to the server...
      
    csv = []
    csv << ["Latitude, Longitude", "Name", "Address", "Cost", "Classification", "Description"]
    keys = ["name", "address", "cost", "classification", "description"]
    self.attractions.each do |att|
      attraction_array = []
      attraction_array.push(att.lat_lng)
      keys.each do |k|
        attraction_array.push(att[k])
      end
      csv << attraction_array
    end
    return csv
  end # This correctly exports attractions in a format that is easily imported into Google's My Maps. Now to get the site to give it to the user...
end

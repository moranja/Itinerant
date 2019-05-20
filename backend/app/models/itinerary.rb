class Itinerary < ApplicationRecord
  has_many :user_itineraries
  has_many :users, through: :user_itineraries
  has_many :cities
  has_many :plans, through: :cities

  def full_itinerary
    itinerary_hash = {}
    itinerary_hash[:details] = self
    itinerary_hash[:schedule] = self.plans.group_by{|i| i.date}
    itinerary_hash[:cities] = []
    self.cities.each do |city|
      area_array = []
      city.areas.each do |area|
        area_array.push({id: area.id, name: area.name, content: area.content, attractions: area.attractions})
      end
      itinerary_hash[:cities].push(id: city.id, name: city.name, country: city.country, content: city.content, areas: area_array, plans: city.plans)
    end
    itinerary_hash
  end

end

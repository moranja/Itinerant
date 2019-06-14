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

  def self.export_attractions(file_name)
    CSV.open("csv/#{file_name}.csv", "w+") do |csv|
      # title_row = School_Day.all.map {|sd| sd.date}
      # title_row.unshift("Students")
      # csv << title_row
      # Student.find_each do |student|
      #   if student.is_teacher
      #   else
      #     array_test = student.attendances.map {|x| x.arrival_time.in_time_zone("Central Time (US & Canada)")}
      #     array_test.unshift(student.full_name)
      #     csv << array_test
      # end
    end
  end
end

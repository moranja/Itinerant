class Itinerary < ApplicationRecord
    has_many :user_itineraries
    has_many :users, through: :user_itineraries
    has_many :cities
    has_many :plans, through: :cities
end

class City < ApplicationRecord
  has_many :plans
  belongs_to :itinerary
  has_many :areas
  has_many :attraction, through: :areas
end

class City < ApplicationRecord
  has_many :plans
  has_many :itineraries, through: :plans
  has_many :areas
  has_many :attraction, through: :areas
end

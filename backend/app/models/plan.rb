class Plan < ApplicationRecord
  belongs_to :city
  belongs_to :itinerary
end

class City < ApplicationRecord
  has_many :plans
  belongs_to :itinerary
  has_many :areas
  has_many :attraction, through: :areas

  def plans_by_date
    result = self.plans.sort_by{|p| p.date}
    return result
  end

end

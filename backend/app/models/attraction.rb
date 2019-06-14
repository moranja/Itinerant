class Attraction < ApplicationRecord
  belongs_to :area

  def lat_lng
    "#{self.latitude} #{self.longitude}"
  end
end

class Attraction < ApplicationRecord
  belongs_to :area


  def lat_lng
    "#{self.latitude} #{self.longitude}"
  end

  #need this to become a key in the hash that comes up when you look at the attraction...
end

class AttractionsController < ApplicationController
  def index
    itin = Itinerary.first
    render json: itin.full_itinerary #testing
  end
end

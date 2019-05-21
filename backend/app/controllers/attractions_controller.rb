class AttractionsController < ApplicationController
  def create
    new_attraction = Attraction.create(attraction_params)
    # new_attraction.classification = new_attraction.classification.titleize
    # new_attraction.save

    render json: new_attraction.area.city.itinerary.full_itinerary
  end

  private

    def attraction_params
      params.permit(:area_id, :name, :classification, :description)
    end
end

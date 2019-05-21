class ItinerariesController < ApplicationController

  def index
    render json: Itinerary.all
  end

  def show
    render json: Itinerary.find(params[:id]).full_itinerary
  end

  def update
    itinerary = Itinerary.find(params[:id])
    new_attraction = Attraction.create(attraction_params)
    # new_attraction.classification = new_attraction.classification.titleize
    # new_attraction.save

    render json: itinerary.full_itinerary
  end

  private
  
    def attraction_params
      params.permit(:area_id, :name, :classification, :description)
    end
end

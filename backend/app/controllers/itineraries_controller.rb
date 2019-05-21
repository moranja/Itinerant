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
    def itinerary_id_params
      params.permit(:id)
    end

    def city_params
      params.permit(:city)
    end

    def area_params
      params.permit(:area)
    end

    def attraction_params
      params.permit(:area_id, :name, :classification, :description)
    end
end

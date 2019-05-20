class ItinerariesController < ApplicationController
  def update
    itinerary = Itinerary.find(params[:id])
    area = itinerary.cities.filter{ |c| c.name == city_params[:city] }.first.areas.filter{ |a| a.name == area_params[:area] }.first

    new_attraction = Attraction.new(attraction_params)
    new_attraction.classification = new_attraction.classification.titleize
    new_attraction.area_id = area.id
    new_attraction.save

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
      params.permit(:name, :classification, :description)
    end
end

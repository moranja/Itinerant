class AttractionsController < ApplicationController

  def create
    area = Area.find_by(id: params[:area_id])

    if area.city.itinerary.users.map{|u| u.id}.include?(@current_user.id)
      new_attraction = Attraction.create(attraction_params)
      # new_attraction.classification = new_attraction.classification.titleize
      # new_attraction.save

      render json: new_attraction.area.city.itinerary.full_itinerary
    else
      render json: {
        error: true,
        message: 'You do not have permission to edit this itinerary'
      }
    end
  end

  private

    def attraction_params
      params.permit(:area_id, :name, :longitude, :latitude, :place_id, :address, :hours, :cost, :classification, :description)
    end
end

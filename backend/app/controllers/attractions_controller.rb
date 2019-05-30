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

  def update
    attraction = Attraction.find(params[:id])

    if attraction.area.city.itinerary.users.map{|u| u.id}.include?(@current_user.id)
      attraction.update(name: params[:name], classification: params[:classification], description: params[:description])
      render json: attraction.area.city.itinerary.full_itinerary
    else
      render json: {
        error: true,
        message: 'You do not have permission to edit this itinerary'
      }
    end
  end

  def destroy
    attraction = Attraction.find(params[:id])

    itinerary = attraction.area.city.itinerary
    if itinerary.users.map{|u| u.id}.include?(@current_user.id)
      attraction.destroy
      render json: itinerary.full_itinerary
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

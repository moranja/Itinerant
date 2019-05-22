class CitiesController < ApplicationController
  def create
    itinerary = Itinerary.find_by(id: params[:itinerary_id])

    byebug
    if itinerary.users.map{|u| u.id}.include?(@current_user.id)
      new_city = City.create(city_params)
      render json: new_city.itinerary.full_itinerary
    else
      render json: {
        error: true,
        message: 'You do not have permission to edit this itinerary'
      }
    end
  end

  private

    def city_params
      params.permit(:itinerary_id, :name, :country, :content)
    end
end

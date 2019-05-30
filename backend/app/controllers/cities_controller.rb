class CitiesController < ApplicationController
  def create
    itinerary = Itinerary.find_by(id: params[:itinerary_id])

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

  def update
    city = City.find(params[:id])

    if city.itinerary.users.map{|u| u.id}.include?(@current_user.id)
      city.update(city_params)
      render json: city.itinerary.full_itinerary
    else
      render json: {
        error: true,
        message: 'You do not have permission to edit this itinerary'
      }
    end
  end

  def destroy
    city = City.find(params[:id])

    itinerary = city.itinerary
    if itinerary.users.map{|u| u.id}.include?(@current_user.id)
      city.destroy
      render json: itinerary.full_itinerary
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

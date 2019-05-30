class AreasController < ApplicationController
  def create
    city = City.find_by(id: params[:city_id])

    if city.itinerary.users.map{|u| u.id}.include?(@current_user.id)
      new_area = Area.create(area_params)

      render json: new_area.city.itinerary.full_itinerary
    else
      render json: {
        error: true,
        message: 'You do not have permission to edit this itinerary'
      }
    end
  end

  def update
    area = Area.find(params[:id])

    if area.city.itinerary.users.map{|u| u.id}.include?(@current_user.id)
      area.update(area_params)
      render json: area.city.itinerary.full_itinerary
    else
      render json: {
        error: true,
        message: 'You do not have permission to edit this itinerary'
      }
    end
  end

  def destroy
    area = Area.find(params[:id])

    itinerary = area.city.itinerary
    if itinerary.users.map{|u| u.id}.include?(@current_user.id)
      area.destroy
      render json: itinerary.full_itinerary
    else
      render json: {
        error: true,
        message: 'You do not have permission to edit this itinerary'
      }
    end
  end

  private

    def area_params
      params.permit(:city_id, :name, :content)
    end
end

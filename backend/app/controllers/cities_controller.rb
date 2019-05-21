class CitiesController < ApplicationController
  def create
    new_city = City.create(city_params)

    render json: new_city.itinerary.full_itinerary
  end

  private

    def city_params
      params.permit(:itinerary_id, :name, :country, :content)
    end
end

class AreasController < ApplicationController
    def create
      new_area = Area.create(area_params)

      render json: new_area.city.itinerary.full_itinerary
    end

    private

      def area_params
        params.permit(:city_id, :name, :content)
      end
end

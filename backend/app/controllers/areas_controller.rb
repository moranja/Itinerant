class AreasController < ApplicationController
    def create
      byebug
      new_area = Area.create(area_params)
      # new_attraction.classification = new_attraction.classification.titleize
      # new_attraction.save

      render json: new_area.city.itinerary.full_itinerary
    end

    private

      def itinerary_id_params
        params.permit(:id)
      end

      def area_params
        params.permit(:city_id, :name, :content)
      end
end

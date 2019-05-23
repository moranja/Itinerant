class PlansController < ApplicationController
  def create
    city = City.find(params[:city_id])
    if city.itinerary.users.map{|u| u.id}.include?(@current_user.id)
      plan = Plan.create(plan_params)

      render json: plan.city.itinerary.full_itinerary
    else
      render json: {
        error: true,
        message: 'You do not have permission to edit this itinerary'
      }
    end
  end

  private

    def plan_params
      params.permit(:city_id, :date, :time, :content)
    end
end

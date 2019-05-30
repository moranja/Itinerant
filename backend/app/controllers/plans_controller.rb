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

  def update
    plan = Plan.find(params[:id])

    if plan.city.itinerary.users.map{|u| u.id}.include?(@current_user.id)
      plan.update(plan_params)
      render json: plan.city.itinerary.full_itinerary
    else
      render json: {
        error: true,
        message: 'You do not have permission to edit this itinerary'
      }
    end
  end

  def destroy
    plan = Plan.find(params[:id])

    itinerary = plan.city.itinerary
    if itinerary.users.map{|u| u.id}.include?(@current_user.id)
      plan.destroy
      render json: itinerary.full_itinerary
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

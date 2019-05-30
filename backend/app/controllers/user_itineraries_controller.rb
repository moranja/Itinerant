class UserItinerariesController < ApplicationController

  def create
    user = User.find_by(username: params["username"])
    itinerary = Itinerary.find(params["itineraryId"])
    byebug

    if itinerary.users.map{|u| u.id}.include?(@current_user.id)
      UserItinerary.create(user_id: user.id, itinerary_id: itinerary.id)
      render json: itinerary.full_itinerary
    else
      render render json: {
        error: true,
        message: 'Stop that'
      }
    end
  end

  private
end

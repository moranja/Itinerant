class ItinerariesController < ApplicationController
  skip_before_action  :logged_in?, only: [ :index, :show ]

  def index
    render json: Itinerary.all
  end

  def show
    render json: Itinerary.find(params[:id]).full_itinerary
  end

  def update
  end

  private
end

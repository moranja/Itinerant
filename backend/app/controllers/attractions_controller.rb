class AttractionsController < ApplicationController
  def index
    render json: Attraction.all
  end
end

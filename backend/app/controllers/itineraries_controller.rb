class ItinerariesController < ApplicationController
  skip_before_action  :logged_in?, only: [ :index, :show ]

  def create
    itinerary = Itinerary.create(title: params[:title], description: params[:description], image_url: params[:image_url])
    UserItinerary.create(user_id: @current_user.id, itinerary_id: itinerary.id)
    render json: itinerary.full_itinerary
  end

  def index
    render json: Itinerary.all
  end

  def show
    render json: Itinerary.find(params[:id]).full_itinerary
  end

  def update
    itinerary = Itinerary.find(params[:id])

    if itinerary.users.map{|u| u.id}.include?(@current_user.id)
      itinerary.update(itinerary_params)
      render json: itinerary.full_itinerary
    else
      render json: {
        error: true,
        message: 'You do not have permission to edit this itinerary'
      }
    end
  end

  def copy
    itinerary = Itinerary.find(params[:id])
    new_itinerary = Itinerary.create(title: "#{@current_user.username}'s copy of #{itinerary.title}", notes: itinerary.notes, image_url: itinerary.image_url)
    itinerary.cities.each do |c|
      new_city = City.create(itinerary_id: new_itinerary.id, name: c.name, country: c.country, content: c.content)
      c.areas.each do |a|
        new_area = Area.create(city_id: new_city.id, name: a.name, content: a.content)
        a.attractions.each do |att|
          new_att = Attraction.create(area_id: new_area.id, name: att.name, place_id: att.place_id, address: att.address, hours: att.hours, cost: att.cost, classification: att.classification, description: att.description)
        end
      end
    end

    UserItinerary.create(user_id: @current_user.id, itinerary_id: new_itinerary.id)

    render json: new_itinerary.full_itinerary
  end

  def destroy
    itinerary = Itinerary.find(params[:id])

    if itinerary.users.map{|u| u.id}.include?(@current_user.id)
      itinerary.destroy
      render json: {error: false}
    else
      render json: {
        error: true,
        message: 'You do not have permission to edit this itinerary'
      }
    end
  end

  def nearest
    render json: Itinerary.find(params[:id]).attractions_by_distance(params[:latitude], params[:longitude])
  end

  private

    def itinerary_params
      params.permit(:title, :description, :vital_info, :helpful_info, :notes)
    end
end

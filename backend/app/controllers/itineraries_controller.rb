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
  end

  def copy
    itinerary = Itinerary.find(params[:id])
    new_itinerary = Itinerary.create(title: itinerary.title, notes: itinerary.notes)
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

  def nearest
    render json: Itinerary.find(params[:id]).attractions_by_distance(params[:latitude], params[:longitude])
  end
end

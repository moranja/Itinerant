Rails.application.routes.draw do

  constraints(lambda {|request| request.xhr? && !request.format.html? }) do
    resources :attractions
    resources :areas
    resources :cities
    resources :plans
    resources :itineraries
    resources :user_itineraries
    resources :users

    post '/login', to: 'users#authenticate'
    post '/copyItinerary', to: 'itineraries#copy'
    get '/itineraries/:id/csv', to: 'itineraries#csv'
    post '/itineraries/:id/nearest', to: 'itineraries#nearest'
  end
  # All xhr (i.e. fetches) requests get caught by the above and routed accordingly.
  # Any html request however, gets sent through react router with the code below.
  get '*path', to: "application#react_app", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end

Rails.application.routes.draw do
  resources :attractions, constraints: ->(request) do
    request.xhr? && !request.format.html?
  end
  resources :areas, constraints: ->(request) do
    request.xhr? && !request.format.html?
  end
  resources :cities, constraints: ->(request) do
    request.xhr? && !request.format.html?
  end
  resources :plans, constraints: ->(request) do
    request.xhr? && !request.format.html?
  end
  resources :itineraries, constraints: ->(request) do
    request.xhr? && !request.format.html?
  end
  resources :user_itineraries, constraints: ->(request) do
    request.xhr? && !request.format.html?
  end
  resources :users, constraints: ->(request) do
    request.xhr? && !request.format.html?
  end

  post '/login', to: 'users#authenticate', constraints: ->(request) do
    request.xhr? && !request.format.html?
  end
  post '/copyItinerary', to: 'itineraries#copy', constraints: ->(request) do
    request.xhr? && !request.format.html?
  end
  post '/itineraries/:id/nearest', to: 'itineraries#nearest', constraints: ->(request) do
    request.xhr? && !request.format.html?
  end

  get '*path', to: "application#react_app", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end

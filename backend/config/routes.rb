Rails.application.routes.draw do
  resources :attractions
  resources :areas
  resources :cities
  resources :plans
  resources :itineraries
  resources :user_itineraries
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

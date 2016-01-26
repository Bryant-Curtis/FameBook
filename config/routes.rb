Rails.application.routes.draw do
  resources :users, only: [:create, :show]
  root to: 'static_pages#root'
end

# If have time later and it seems viable and a good thing to do, create
# a custom route for the homepage for user sign in/log in.

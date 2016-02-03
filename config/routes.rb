Rails.application.routes.draw do
  root to: 'static_pages#homepage'
  get 'users/:id/settings', to: 'users#settings', as: 'user_settings'
  resources :users, only: [:create, :show]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show]
    resources :posts, only: [:index, :create, :destroy]
  end
end

# If have time later and it seems viable and a good thing to do, create
# a custom route for the homepage for user sign in/log in.

# This is one way to add custom routes. Keep for later use if necessary. Delete
# when no longer needed.
    # resources :users, only: [:create, :show] do
    #   get 'settings', to: 'users#settings'
    # end

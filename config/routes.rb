Rails.application.routes.draw do
  root to: 'static_pages#homepage'
  get 'users/:id/settings', to: 'users#settings', as: 'user_settings'

  resources :users, only:   [:create, :show]
  resource  :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :update] do
      resources :posts, only: [:index]
      resources :friendships, only: [:show]
    end
    resources :posts, only: [:index, :create, :destroy]
    resources :friendships, only: [:create, :show, :destroy]
  end
end

# The nested posts#index route under the api_users is a refactor to
# get the posts from each user (in the jbuilder) and then get the
# feed by using a feedscontroller.

# If have time later and it seems viable and a good thing to do, create
# a custom route for the homepage for user sign in/log in.

# This is one way to add custom routes. Keep for later use if necessary. Delete
# when no longer needed.
    # resources :users, only: [:create, :show] do
    #   get 'settings', to: 'users#settings'
    # end

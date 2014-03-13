NewReader::Application.routes.draw do
  resources :feeds, only: [:index, :create, :show] do
    resources :entries, only: [:index, :show]
  end
  resources :users, only: [:create, :new]
  resource :session, only: [:new, :create, :destroy]

  root to: "feeds#index"
end

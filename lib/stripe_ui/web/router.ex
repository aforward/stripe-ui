defmodule StripeUi.Web.Router do
  use StripeUi.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", StripeUi.Web do
    pipe_through :browser
    get "/", PageController, :index
    get "/charge", ChargeController, :index
    get "/customer", CustomerController, :index
    get "/token", TokenController, :index
  end

  scope "/api", StripeUi.Web do
    pipe_through :api
    post "/tokens", TokenController, :create
  end

end

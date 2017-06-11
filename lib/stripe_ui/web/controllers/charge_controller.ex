defmodule StripeUi.Web.ChargeController do
  use StripeUi.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

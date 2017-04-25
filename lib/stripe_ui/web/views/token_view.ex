defmodule StripeUi.Web.TokenView do
  use StripeUi.Web, :view

  def render("index.json", %{tokens: tokens}) do
    tokens
  end

  def render("create.json", %{token: token}) do
    token
  end

end

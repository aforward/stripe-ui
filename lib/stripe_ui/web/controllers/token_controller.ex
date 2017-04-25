defmodule StripeUi.Web.TokenController do
  use StripeUi.Web, :controller
  alias StripeCallbacks.{Token,Repo}

  def index(conn, _params) do
    render conn, tokens: Repo.all(Token)
  end

  def create(conn, %{"token" => params}) do
    {:ok, token} = Token.process(params)
    conn
    |> put_status(:created)
    |> render(token: token)
  end

end

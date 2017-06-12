defmodule StripeUi.Web.TokenController do
  use StripeUi.Web, :controller
  alias StripeCallbacks.{Token,Repo}

  def index(conn, _params) do
    render conn, tokens: Repo.all(Token)
  end

  def create(conn, %{"token" => params, "mode" => mode}) do
    {:ok, token} = case mode do
      "create" -> Token.create(params)
      _ -> Token.process(params)
    end
    conn
    |> put_status(:created)
    |> render(token: token)
  end

  def analyze(conn, %{"token_identifier" => id}) do
    {:ok, token} = id |> Token.get_by_stripe_id |> Token.analyze
    conn
    |> render(token: token)
  end

end

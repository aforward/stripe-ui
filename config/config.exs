# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :stripe_ui, StripeUi.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "KQrkKYN+9H3onmOFc9zjWkG49OgPusWp03Z1hKu50xcsgPvURA4rwJgFgmGd0WCC",
  render_errors: [view: StripeUi.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: StripeUi.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

use Mix.Config

config :stripe_callbacks, StripeCallbacks.Repo, [
  adapter: Ecto.Adapters.Postgres,
  database: "stripe_ui_callbacks_#{Mix.env}",
  username: "postgres",
  password: "",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox]

config :stripe_post,
  secret_key: "sk_test_abc123",
  public_key: "pk_test_def456"

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :stripe_ui, StripeUi.Web.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

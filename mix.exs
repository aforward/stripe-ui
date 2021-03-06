defmodule StripeUi.Mixfile do
  use Mix.Project

  def project do
    [
      app: :stripe_ui,
      version: "0.0.1",
      elixir: "~> 1.4",
      elixirc_paths: elixirc_paths(Mix.env),
      compilers: [:phoenix, :gettext] ++ Mix.compilers,
      start_permanent: Mix.env == :prod,
      deps: deps(),
      aliases: aliases(),
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {StripeUi.Application, []},
     extra_applications: [:logger, :runtime_tools]]
  end

  def aliases() do
    [
      "ecto.reset": ["ecto.drop --quiet", "ecto.create --quiet", "ecto.migrate"],
      "test.once": ["ecto.reset", "test"],
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.3.0-rc"},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_html, "~> 2.6"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.11"},
      {:cowboy, "~> 1.0"},
      {:mix_test_watch, github: "aforward/mix-test.watch", only: :dev, runtime: false},
      {:stripe_callbacks, "~> 0.5.1"},
    ]
  end
end

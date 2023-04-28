set dotenv-load
set positional-arguments

branch := env_var_or_default("BRANCH", "none")
env := if branch == "main" {
    "prod"
} else if branch == "master" {
    "prod"
} else if branch == "develop" {
    "staging"
} else {
    "dev"
}
fly_app_env := if branch == "main" {
    "--env SIMSE_IO_HOST=simse.io"
} else if branch == "master" {
    "--env SIMSE_IO_HOST=simse.io"
} else if branch == "develop" {
    "--env SIMSE_IO_HOST=simse.cloud"
} else {
    "--env SIMSE_IO_HOST=simse.dev"
}

build:
    depot build --push --tag ghcr.io/simse/simse.io:latest --project lcf3hcmtrt .

deploy:
    flyctl deploy --app simse-{{ env }} --local-only {{ fly_app_env }}

load-test:
    k6 run k6/test.js


# dev stuff
dev:
    tmux new-session -d -s dev -n server 'just dev-server' \; \
        split-window -h -p 20 -t dev 'just css-watch' \; \
        select-pane -t dev:0 \; \
        attach 

dev-server:
    ./bin/air -- -primary

dev-server-once:
    go run main.go -primary

dev-litefs:
    ./bin/litefs mount

css:
    echo '@tailwind base;@tailwind components;@tailwind utilities;' > /tmp/input.css
    tailwindcss -i /tmp/input.css -o static/style.css --minify

css-watch:
    echo '@tailwind base;@tailwind components;@tailwind utilities;' > /tmp/input.css
    tailwindcss -i /tmp/input.css -o static/style.css --watch

test:
    gotest ./...
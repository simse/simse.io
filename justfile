set dotenv-load
set positional-arguments

branch := env_var_or_default("BRANCH", "none")
random_string := `openssl rand -hex 24`
env := if branch == "main" {
    "prod"
} else if branch == "develop" {
    "staging"
} else {
    "dev"
}
fly_app_env := if branch == "main" {
    "--env SIMSE_IO_HOST=simse.io"
} else if branch == "develop" {
    "--env SIMSE_IO_HOST=simse.cloud"
} else {
    "--env SIMSE_IO_HOST=simse.dev"
}
docker_image := "ghcr.io/simse/simse.io:" + env + "-" + random_string

depot_build_command := "depot build --push --tag " + docker_image + " --project lcf3hcmtrt ."
buildx_build_command := "docker buildx build --push --tag " + docker_image + " ."
docker_build_command := if branch == "main" {
    depot_build_command
} else if branch == "develop" {
    depot_build_command
} else {
    buildx_build_command
}

build:
    {{ docker_build_command }}

deploy: build
    flyctl deploy --app simse-{{ env }} --image {{ docker_image }} {{ fly_app_env }}

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
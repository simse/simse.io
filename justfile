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

deploy:
    flyctl deploy --app simse-{{ env }} --local-only

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
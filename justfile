set dotenv-load

build_tag := `git rev-parse --short HEAD`
branch := env_var_or_default("BRANCH", "none")
env := if branch == "main" {
    "prod"
} else {
    "dev"
}
random_tag := if branch == "main" {
    ""
} else {
    "-" + uuid()
}
docker_image := "ghcr.io/simse/simse.io:" + build_tag + "-" + env + random_tag

build:
    docker build . -t {{docker_image}}
    docker push {{docker_image}}

deploy: build tf-apply

# dev stuff
css:
    echo '@tailwind base;@tailwind components;@tailwind utilities;' > input.css
    tailwindcss -i input.css -o static/style.css --minify
    rm input.css

# terraform stuff
workspace := `terraform -chdir=infra workspace show`

tf-plan:
    terraform -chdir=infra plan -var-file={{workspace}}.tfvars -var="app_image={{docker_image}}"

tf-apply:
    terraform -chdir=infra apply -auto-approve -var-file={{workspace}}.tfvars -var="app_image={{docker_image}}"

tf-destroy:
    terraform -chdir=infra destroy -var-file={{workspace}}.tfvars -var="app_image={{docker_image}}"
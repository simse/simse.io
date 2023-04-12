set dotenv-load

build_tag := `git rev-parse --short HEAD`
branch := env_var_or_default("BRANCH", "none")
env := if branch == "main" {
    "prod"
} else {
    "dev"
}
docker_image := "ghcr.io/simse/simse.io:" + build_tag + "-" + env

build:
    docker build . -t {{docker_image}}
    docker push {{docker_image}}

# terraform stuff
workspace := `terraform -chdir=infra workspace show`

tf-plan:
    terraform -chdir=infra plan -var-file={{workspace}}.tfvars -var="app_image={{docker_image}}"

tf-apply:
    terraform -chdir=infra apply -auto-approve -var-file={{workspace}}.tfvars -var="app_image={{docker_image}}"

tf-destroy:
    terraform -chdir=infra destroy -var-file={{workspace}}.tfvars -var="app_image={{docker_image}}"
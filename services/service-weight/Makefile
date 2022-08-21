build-docker:
	docker build . -t ghcr.io/simse/service-weight:latest

deploy-docker:
	docker push ghcr.io/simse/service-weight:latest
	levant deploy nomad.job
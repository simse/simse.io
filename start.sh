#!/bin/sh

/app/tailscaled --state=/var/lib/tailscale/tailscaled.state --socket=/var/run/tailscale/tailscaled.sock > /dev/null &
/app/tailscale up --authkey=${TAILSCALE_AUTHKEY} --hostname=${FLY_APP_NAME}-${FLY_REGION} > /dev/null
/app/simse
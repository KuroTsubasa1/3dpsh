#!/usr/bin/env bash
# Idempotent nginx provisioning for 3dps.space. Run on every deploy.
#
# This host already holds a certificate for 3dps.space (lineage
# `3dps.space-0001`, renewed by the certbot systemd timer with
# authenticator = standalone). So this script deliberately does NOT run certbot:
# a `certonly` here would mint a third lineage (`-0002`) and leave the vhost
# pointing at a cert nothing renews. It only keeps the vhost in sync.
#
# Requires: nginx installed; the invoking user is root or has (passwordless)
# sudo — /etc/nginx and systemctl are root-only.
set -euo pipefail

DOMAIN="3dps.space"
CERT_LINEAGE="3dps.space-0001"
APP_DIR="/opt/3dpsh"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

NGINX_AVAIL="/etc/nginx/sites-available/3dpsh.conf"
NGINX_ENABLED="/etc/nginx/sites-enabled/3dpsh.conf"
# The pre-Actions manual setup used this extension-less name. It declares the
# same server_name, so it must go — otherwise nginx keeps the first vhost it
# parses and which one that is depends on filename order.
LEGACY_ENABLED="/etc/nginx/sites-enabled/3dpsh"

if [ "$(id -u)" -eq 0 ]; then SUDO=""; else SUDO="sudo"; fi

# /etc/letsencrypt/live is root-only (0700), so this needs sudo to see the truth.
if ! $SUDO test -f "/etc/letsencrypt/live/$CERT_LINEAGE/fullchain.pem"; then
    echo "ERROR: no certificate at /etc/letsencrypt/live/$CERT_LINEAGE/" >&2
    echo "Refusing to issue one from the deploy pipeline — that would create a" >&2
    echo "new lineage outside the renewal config. Fix the cert on the server," >&2
    echo "then re-run the deploy. (certbot certificates)" >&2
    exit 1
fi

$SUDO mkdir -p /var/www/certbot "$APP_DIR"

$SUDO cp "$SCRIPT_DIR/nginx/3dpsh.conf" "$NGINX_AVAIL"
$SUDO ln -sf "$NGINX_AVAIL" "$NGINX_ENABLED"
$SUDO rm -f "$LEGACY_ENABLED"
# NB: keep `nginx -t` and the reload on separate lines. In a `cmd && cmd` list a
# failure of the first command is exempt from `set -e`, so a bad config would be
# swallowed and the deploy would go green anyway.
$SUDO nginx -t
$SUDO systemctl reload nginx

echo "Provisioning complete: https://$DOMAIN"

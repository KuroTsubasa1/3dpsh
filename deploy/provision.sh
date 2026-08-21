#!/usr/bin/env bash
# Idempotent server provisioning for 3dps.space.
#
# Run on every deploy. On first run (no cert yet) it bootstraps a temporary
# HTTP-only vhost so Let's Encrypt can answer the http-01 challenge, obtains the
# certificate, then installs the real (SSL) vhost. On later runs it just keeps
# the nginx config in sync and reloads. Cert *renewal* is handled by the certbot
# systemd timer; the port-80 block keeps webroot challenges working.
#
# The app itself (Nuxt/Nitro under PM2) is (re)started by the deploy workflow.
#
# Requires: nginx, certbot installed; the invoking user is root or has
# (passwordless) sudo.
set -euo pipefail

DOMAIN="3dps.space"
ALT_DOMAIN="www.3dps.space"
EMAIL="${CERTBOT_EMAIL:-lasse.harm@di-unternehmer.com}"
WEBROOT="/var/www/certbot"
APP_DIR="/opt/3dpsh"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

NGINX_AVAIL="/etc/nginx/sites-available/3dpsh.conf"
NGINX_ENABLED="/etc/nginx/sites-enabled/3dpsh.conf"
BOOTSTRAP_AVAIL="/etc/nginx/sites-available/3dpsh-bootstrap.conf"
BOOTSTRAP_ENABLED="/etc/nginx/sites-enabled/3dpsh-bootstrap.conf"
# Pre-Actions manual setup used this extension-less name; it declares the same
# server_name, so it must go or nginx picks a winner at random.
LEGACY_ENABLED="/etc/nginx/sites-enabled/3dpsh"

if [ "$(id -u)" -eq 0 ]; then SUDO=""; else SUDO="sudo"; fi

$SUDO mkdir -p "$WEBROOT" "$APP_DIR"

# --- Bootstrap: obtain the cert if it doesn't exist yet -----------------------
# Note: /etc/letsencrypt/live is root-only (0700), so this must use sudo or it
# always reads "missing" and needlessly re-bootstraps on every deploy.
if ! $SUDO test -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem"; then
    echo "No certificate for $DOMAIN yet — bootstrapping via http-01 challenge."

    # Temporary HTTP-only vhost that only serves the ACME challenge.
    $SUDO tee "$BOOTSTRAP_AVAIL" >/dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN $ALT_DOMAIN;
    location /.well-known/acme-challenge/ { root $WEBROOT; }
    location / { return 200 'bootstrapping'; }
}
EOF

    # Enable only the bootstrap vhost (the real one references a cert that does
    # not exist yet, so it must not be loaded during bootstrap).
    $SUDO rm -f "$NGINX_ENABLED" "$LEGACY_ENABLED"
    $SUDO ln -sf "$BOOTSTRAP_AVAIL" "$BOOTSTRAP_ENABLED"
    # NB: keep `nginx -t` and the reload on separate lines. In a `cmd && cmd`
    # list, a failure of the first command is exempt from `set -e`, so a bad
    # config would be silently swallowed and the deploy would go green anyway.
    $SUDO nginx -t
    $SUDO systemctl reload nginx

    $SUDO certbot certonly --webroot -w "$WEBROOT" -d "$DOMAIN" -d "$ALT_DOMAIN" \
        --non-interactive --agree-tos -m "$EMAIL"
fi

# --- Install the real (SSL) vhost ---------------------------------------------
$SUDO rm -f "$BOOTSTRAP_ENABLED" "$LEGACY_ENABLED"
$SUDO cp "$SCRIPT_DIR/nginx/3dpsh.conf" "$NGINX_AVAIL"
$SUDO ln -sf "$NGINX_AVAIL" "$NGINX_ENABLED"
$SUDO nginx -t
$SUDO systemctl reload nginx

echo "Provisioning complete: https://$DOMAIN"

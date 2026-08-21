# Deployment — 3D Print Shop Harm (3dps.space)

Deployment runs in CI. On every push to `master` (or a manual run of the
**Deploy** workflow), [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. builds the Nuxt app (`npm ci && npm run build`),
2. rsyncs the self-contained `.output/` bundle plus `ecosystem.config.js` to
   `/opt/3dpsh` on the server,
3. runs [`deploy/provision.sh`](deploy/provision.sh) there, which installs the
   nginx vhost and — on the very first deploy — obtains the Let's Encrypt
   certificate (http-01 challenge), then reloads nginx,
4. restarts the app under PM2 (`pm2 startOrRestart ecosystem.config.js`),
5. smoke-tests `http://127.0.0.1:5001/` on the server and `https://3dps.space/`
   from the runner, failing the deploy if either does not answer.

`.output/` is a complete Nitro bundle with dependencies inlined, so there is no
`npm install` step on the server.

The app listens on **port 5001** (`ecosystem.config.js`); nginx reverse-proxies
`3dps.space` and `www.3dps.space` to it (`deploy/nginx/3dpsh.conf`).

## GitHub repo configuration

Secrets (Settings → Secrets and variables → Actions), in the `production`
environment or at repo level:

| Secret            | Purpose                                                                        |
| ----------------- | ------------------------------------------------------------------------------ |
| `SSH_PRIVATE_KEY` | Private key whose public half is in the deploy user's `~/.ssh/authorized_keys` |
| `SSH_HOST`        | Server hostname or IP                                                          |
| `SSH_USER`        | SSH/deploy user                                                                |

Variables (optional):

| Variable        | Purpose                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------- |
| `CERTBOT_EMAIL` | Email for Let's Encrypt expiry notices. Defaults to `lasse.harm@di-unternehmer.com` if unset. |

## One-time server setup

The pipeline installs the nginx vhost and obtains the certificate itself. Only
these prerequisites are manual:

### 1. DNS

`3dps.space` and `www.3dps.space` must resolve to the server **before** the
first deploy, or the http-01 challenge fails.

### 2. Install nginx, certbot, Node and PM2

```bash
sudo apt update
sudo apt install -y nginx certbot
# Node 20 + PM2, if not already present
sudo npm install -g pm2
```

### 3. Create the app directory, owned by the deploy user

```bash
sudo mkdir -p /opt/3dpsh
sudo chown "$USER":"$USER" /opt/3dpsh
sudo chmod 755 /opt/3dpsh
```

### 4. Add the deploy key

Put the public half of `SSH_PRIVATE_KEY` into the deploy user's
`~/.ssh/authorized_keys` ([`setup-ssh-key.sh`](setup-ssh-key.sh) prints a key you
can use).

### 5. Passwordless sudo (only if the deploy user is not root)

`provision.sh` runs `certbot`, `nginx` and `systemctl` over a non-interactive
SSH session. Create `/etc/sudoers.d/3dpsh-deploy` (replace `DEPLOY_USER`):

```
DEPLOY_USER ALL=(root) NOPASSWD: /usr/bin/certbot, /usr/sbin/nginx, /bin/systemctl reload nginx, /bin/mkdir, /bin/cp, /bin/ln, /bin/rm, /usr/bin/tee
```

### 6. Make PM2 survive reboots

```bash
pm2 startup   # then run the command it prints
pm2 save
```

## Triggering a deploy

- Push to `master`, or
- run the **Deploy** workflow from the Actions tab (`workflow_dispatch`).

Deploys are serialized by a `deploy-production` concurrency group; a newer run
cancels an in-flight one.

## Migrating from the old manual flow

The previous process was a local `npm run build`, `tar`, `scp` and a hand-run
`pm2` restart, with the nginx vhost edited on the server. After the first CI
deploy:

- `/etc/nginx/sites-enabled/3dpsh` (the old extension-less vhost) is removed by
  `provision.sh` and replaced by `3dpsh.conf` — the repo file is now the source
  of truth, so edit `deploy/nginx/3dpsh.conf` and push instead of editing on the
  server.
- The old vhost proxied to port 3000 while PM2 serves 5001; the new one uses
  5001 consistently.
- Don't keep anything else in `/opt/3dpsh/.output` — it is rsynced with
  `--delete`.

## Troubleshooting

```bash
pm2 status
pm2 logs 3dpsh --lines 100
sudo tail -f /var/log/nginx/error.log
sudo nginx -t
ss -tlnp | grep 5001
curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:5001/
```

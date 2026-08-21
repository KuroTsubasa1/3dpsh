# Deployment — 3D Print Shop Harm (3dps.space)

Deployment runs in CI. On every push to `master` (or a manual run of the
**Deploy** workflow), [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. builds the Nuxt app (`npm ci && npm run build`),
2. rsyncs the self-contained `.output/` bundle plus `ecosystem.config.js` to
   `/opt/3dpsh` on the server,
3. runs [`deploy/provision.sh`](deploy/provision.sh) there, which syncs the nginx
   vhost and reloads nginx,
4. restarts the app under PM2,
5. smoke-tests `http://127.0.0.1:5001/` on the server and `https://3dps.space/`
   from the runner, failing the deploy if either does not answer.

`.output/` is a complete Nitro bundle with dependencies inlined, so there is no
`npm install` step on the server.

## The production host

`3dps.space` runs on a **shared** DigitalOcean droplet that also hosts mailcow,
gitea, katachi, ukibori, tanzaku, Nextcloud and a dozen other vhosts. Facts that
matter when touching this deploy:

| | |
| --- | --- |
| App port | **5001** (`ecosystem.config.js`). Port 3000 on this box belongs to gitea — do not move the app there. |
| App directory | `/opt/3dpsh`, owned by `deploy`. Also contains an unrelated `homepage/` directory and old `.output.backup.*` dirs — the pipeline only touches `.output/` and `ecosystem.config.js`. |
| Process manager | PM2 under **root** (`pm2-root.service` resurrects it on boot). The deploy user reaches that daemon with `sudo -H /usr/bin/pm2`; without `-H` pm2 would start a second daemon under `/home/deploy/.pm2` and fight for port 5001. |
| TLS | Certificate lineage **`3dps.space-0001`** (not `3dps.space`), renewed by the certbot timer with `authenticator = standalone`. `provision.sh` never calls certbot — issuing from CI would create a `-0002` lineage that nothing renews. |
| nginx | `deploy` is in the `nginx-editors` group and has passwordless sudo. |

## GitHub repo configuration

Secrets (Settings → Secrets and variables → Actions), in the `production`
environment:

| Secret            | Value                                                                          |
| ----------------- | ------------------------------------------------------------------------------ |
| `SSH_PRIVATE_KEY` | Private key whose public half is in `/home/deploy/.ssh/authorized_keys`        |
| `SSH_HOST`        | `46.101.138.222`                                                               |
| `SSH_USER`        | `deploy`                                                                       |

## One-time server setup

Already satisfied on the current host; documented for a rebuild.

1. **DNS** — `3dps.space` and `www.3dps.space` resolve to the server.
2. **Packages** — nginx, certbot, Node 20, PM2 (`/usr/bin/pm2`).
3. **App directory** — `/opt/3dpsh`, plus `.output/` and `ecosystem.config.js`,
   owned by `deploy`; the directory itself `755`.
4. **Deploy key** — public half of `SSH_PRIVATE_KEY` in
   `/home/deploy/.ssh/authorized_keys` (mode `600`, owned by `deploy`).
5. **Passwordless sudo** — `deploy` needs it for `nginx -t`,
   `systemctl reload nginx` and `sudo -H pm2`. On this host
   `/etc/sudoers.d/deploy` grants `NOPASSWD: ALL`.
6. **Reboot persistence** — `pm2 save` as root, with `pm2-root.service` enabled.
7. **Certificate** — a valid lineage in `/etc/letsencrypt/live/`; if the name is
   not `3dps.space-0001`, update `CERT_LINEAGE` in `provision.sh` and the
   `ssl_certificate` paths in `deploy/nginx/3dpsh.conf`.

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
  `provision.sh` and replaced by `3dpsh.conf`. The repo file is now the source of
  truth — edit `deploy/nginx/3dpsh.conf` and push instead of editing on the
  server.
- The stale root-level `nginx-site.conf` proxied to port 3000 and is gone.
- Don't keep anything else in `/opt/3dpsh/.output` — it is rsynced with
  `--delete`.

Left over from the manual era and safe to delete by hand (≈900 MB in
`/opt/3dpsh`): 25 `.output.backup.*` directories, `deployment.tar.gz` (33 MB),
`node_modules/`, the `._*` AppleDouble files, and the stray `coaster-catalog.vue`
/ `pages/` / `assets/` copies. The pipeline needs none of them.

## Troubleshooting

```bash
sudo -H pm2 status
sudo -H pm2 logs 3dpsh --lines 100
sudo tail -f /var/log/nginx/error.log
sudo nginx -t
ss -tlnp | grep 5001
curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:5001/
sudo certbot certificates          # confirm the lineage name
```

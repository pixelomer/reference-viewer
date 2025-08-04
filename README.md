# reference-viewer

Simple self-hosted reference image viewer

![screenshot](screenshot.webp)

## Docker Usage Examples

With Docker CLI:

```bash
docker run --name reference-viewer -p 8011:8011 -v /path/to/images:/images:ro -e 'REFERENCE_PATHS=/images/**/*' ghcr.io/pixelomer/reference-viewer:latest
```

With `docker-compose.yml`:

```yml
services:
  reference-viewer:
    image: ghcr.io/pixelomer/reference-viewer:latest
    container_name: reference-viewer
    volumes:
      - /path/to/images:/images:ro
    environment:
      - "REFERENCE_PATHS=/images/**/*"
    ports:
      - "8011:8011"
```

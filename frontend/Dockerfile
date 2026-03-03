# Stage 0, "build-stage", based on Bun, to build and compile the frontend
FROM oven/bun:1-alpine AS build-stage

WORKDIR /app

COPY package.json bun.lock /app/

COPY frontend/package.json /app/frontend/

WORKDIR /app/frontend

RUN bun install --frozen-lockfile

COPY ./frontend /app/frontend
ARG TARGET=app
ARG VITE_API_URL

ENV APP_TARGET=${TARGET}
ENV VITE_API_URL=${VITE_API_URL}

RUN bun run build


# Stage 1, based on Nginx Alpine, to have only the compiled app, ready for production
FROM nginx:1-alpine

COPY --from=build-stage /app/frontend/dist/ /usr/share/nginx/html

COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf.template
COPY ./frontend/nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf

ENV PORT=80

HEALTHCHECK --interval=30s --timeout=5s --retries=5 \
    CMD wget --spider -q http://127.0.0.1:${PORT}/

# Use envsubst to inject $PORT into nginx.conf at runtime, then start nginx
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

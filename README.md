[![Greenkeeper badge](https://badges.greenkeeper.io/windingtree/wt-hotel-explorer.svg)](https://greenkeeper.io/)

# Winding Tree hotel explorer

Example web application showcasing what the Winding Tree platform is capable of.
**This is not meant as a real life application.**

## Requirements

- NodeJS >= 10

## Getting started

### Running locally

To run this app locally, use `npm start` command. It will be connected to the
[playground environment](https://github.com/windingtree/wiki/blob/master/developer-resources.md#publicly-available-wt-deployments)
and you can happily develop with [HMR enabled](https://webpack.js.org/concepts/hot-module-replacement/).
It will be available on `http://localhost:3000`

You can also run this app from a docker container. Please note that there is
a handful of environment variables required for a successful build. If you want
to run the app against a different [wt-read-api](https://github.com/windingtree/wt-read-api),
change the `WT_READ_API` environment variable. Currently,
version 0.8.x of the read api is assumed.

```sh
$ docker build --build-arg NODE_ENV=production --build-arg GIT_REV=`git rev-parse --short HEAD` --build-arg WT_READ_API=https://playground-api.windingtree.com  -t windingtree/wt-hotel-explorer .
$ docker run -p 8080:8080 windingtree/wt-hotel-explorer
```

In a similar fashion, you can build and run the docker image in a production-like
environment.

### Experimental build for Swarm

If you run `npm run build-for-swarm-playground`, you will get
a slightly different build that can be uploaded to and served
from [Swarm](https://swarm-guide.readthedocs.io/en/latest/index.html).

It uses a different react router (hash-based) to circumvent the
limitations of running the app not from a root domain (such as `https://example.com/`)
but from a relative path (such as `https://swarm.example.com/bzz:/0xsupersecrethash`).

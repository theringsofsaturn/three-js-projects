## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

// What is a bundler?

// A bundler is a tool in which we send assets like JavaScript, CSS, HTML, images, TypeScript, Stylus, and other languages. The bundler will handle those assets, apply potential modifications, and output a "bundle" composed of web friendly files like HTML, CSS, images, JavaScript

We can see that like a pipe in which we send non-web-friendly assets and, at the end of the tube, we get web-friendly assets.

Bundler can do even more. We can use a bundler to create a local server, manage dependencies, improve compatibility, support modules, optimize images, deploy on a server, minify the code, etc.

// Webpack

Webpack is currently the most popular bundler. 
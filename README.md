# atlas

## Historical Description:
Atlas the Greek/Roman Titan of astronomy and navigation.

## Technical Description:
Atlas, a light weight Node.js web crawler, navigates the web efficiently.
* Allows for ```Content-type``` specific crawl instructions (at least in the future)
* Start with a few seed uri's and you'll be off.
* To deal with growing frontier mongodb is integrated.

## Setup:
* Make sure there is a MongoDB instance setup to reference in config/default.json:DB:url (current config should work for a normal local setup)
``` npm install ```

### How to run
```npm start ```
or
```node atlas```

(don't you love node)

### TODO
* Instructions (based on content-types i.e. application, text, audio, video, image, etc.)
* Politeness (aka robots.txt awareness)

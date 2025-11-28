I know in the mail that I received that I was supossed to name my readme RENE.md, but this didn't display here on github so I chose to leave it with README.md


-What requirements coudln't you fill?
+**I was able to fill all requirements** - what I think I did really cool was to render the first 20 movies with SSR and then continue rendering the next movies with infinite scrolling by using client side - this reduces LCP render time in 
lighthouse significally

-Issues faced during development
+Initially I was deciding between using react query or just normal http calls, but at the end I still decided to opt with react query because they offered a native infinite scrolling hook which was super useful for me to deliver a smooth UX
+I didn't really run into many issues, except maybe setting up jest - I haven't set it up too many times before, mostly when I joined projects it was already set up

-What I would improve if I had more time
+Definetly improve tests, currently I'm just testing if a black div sucessfully appears when an image fials to load
+Improve the intersection observer logic on homepage - currently it's not too robust - but I think its fine for MVP
+Improve how querying works - I would use a debounce method but currently TMDB was rate limiting me and I had to opt with an old approach to search (enter keypress)
+Add more comments and split movieinfo component into more seperate components for reusability (etc. star rating)
+Display a nice grid of more popular movies on the movie/id page to add more volume to the page
+Add dynamic meta tags with SSR on movie/id page so it would show up nice on google
+Improve some code readability
+Add skeleton loaders so the site doesn't "jump"

+But I didn't want to overcomplicate this and over-drag this application out

+I tried my best with the logic I have to implement a smooth application

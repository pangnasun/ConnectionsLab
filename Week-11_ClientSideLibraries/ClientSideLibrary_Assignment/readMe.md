# Assignment 5: Working with p5.play

I wanted to build a webpage with p5.play because this library holds so much potential when it comes to creating 2D games. I started this process by exploring various existing [examples](https://p5play.org/demos/). After learning from these examples, I tried to create my own project with p5.play.

### Process
#### 1. Embedding p5.play in HTML
Testing the demos on the official p5.play was not as tedious as testing them with VS Cod because I needed to embed the library in HTML. My first attemp was not successful because I used V2 version of p5.play:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js"></script>
<script src="https://p5play.org/v2/p5.play.js"></script>
```
I changed to p5.play V3 to successfully embed this library:
```html
<script src="https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@latest/lib/addons/p5.sound.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/planck@latest/dist/planck.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5.play@3/p5.play.js"></script>
```


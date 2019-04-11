# Build your First Web VR Game for the Absolute Beginner
This is source and tutorial for building your first website and first web vr game - all in one!

### Download VS Code and create index.html file
1. First things first. We need the right tools for the right job. (Download VsCode)[] if you dont already have it.
2. Open VS code and create a new file called index.html
3. Copy and paste this html and css into the file
```html <!DOCTYPE html>
<html>

    <head>
        <style>
            html,
            body {
                overflow: hidden;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                text-align: center;
            }

            #renderCanvas {
                width: 100%;
                height: 100%;
                touch-action: none;
            }
        </style>
    </head>

    <body>
        <canvas id="renderCanvas"></canvas>
        <script src="dist/index.js"></script>
    </body>

</html>
```
4. Now create the index.js file and copy and paste this code into it.
5. Save file and navigate to the file explorer. Double click the index.html (browswer will open ooo ahhh I made a site)


### Import scripts needed to help us build our site
1. Ok now in order to use babylonjs – we need to import the framework in the `<head>` of our site
2. Copy and paste code into site Add script tag


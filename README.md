# workshop
This will be a site for editing and sharing creative writing works such as short stories, poems, screenplays, personal essays, etc. It will be designed in a way similar to Medium, where you can create the works inside the site with a rich text editor, and save them there. Then you can also read and discover other people's works, add comments, and also follow users.

**Technologies used**
 * Node.js
 * Express.js; Passport.js
 * MongoDB
 * React.js; Redux; React-Router; Redux-Thunk
 * Webpack
 * Slate.js (an opensource react framework for building rich text editors)
 
## Current State
![](https://github.com/ebadgio/workshop/blob/master/assets/demo.gif)

## Usage

  1. **Clone Repsository**
      * Clone repository, enter package (```cd workshop/```) from command line, and continue with the next steps.
  2. **Install dependencies:**
      * Command: ```npm install```
  3. **Run Webpack**
      * Command: ```npm run build```
  4. **Set env variables**
      * To run express server, some env variables must be set:
        * `SECRET` -- Some string of text for mongo session to use as it's secret
        * `MONGODB_URI` -- your mongo db instance uri for this app (I use [mLab](https://mlab.com/))
        * `HASH_KEY` -- hash key used by the password encryption package (bcrypt)
  5. **Start the server**
      * Command: ```npm run server```
      * Navigate to http://localhost:3000 and you should see a page saying "Home Page"
      * You must register/login in order to see the editor.
  6. **After making changes always  run webpack**
      * During development: ```npm run build```
      * For production: ```npm run prod```


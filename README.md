# workshop-web
This will be a site for editing and sharing creative writing works such as short stories, poems, screenplays, personal essays, etc. It will be designed in a way similar to Medium, where you can create the works inside the site with a rich text editor, and save them there. Then you can also read and discover other people's works, add comments, and also follow users.

**Technologies used**
 * Node.js
 * Express.js; Passport.js
 * MongoDB
 * React.js; Redux; React-Router; Redux-Thunk
 * Webpack
 * Slate.js (an opensource react framework for building rich text editors)

## TODO
*Updated and added to as stages of development are finished*

### User Auth
* ~finish user model~
  * ~password hashing~
  * ~Writing stats?~
  * ~Followers (later?)~
  * ~Following (later?)~
* ~Create mlab sandbox~
* ~Configure passport~
* ~Auth routes~
  * ~Register~
  * ~Login~
* ~Auth frontend~
  * ~Register~
  * ~Login~
* Frontend auth error handling
  * Register
  * Login
* ~Load user from session~
* ~Logout~

### work creation with rich text editor
* Text formatting
    * ~Bold~
    * ~Italics~
    * ~Underline~
    * ~Header~
    * ~Text alignment (left, center, right)~
    * ~Tab to indent~
* editing page design
    * ~Hovering Toolbar~
    * ~User photo and name~
    * ~Title input~
* functionality
    * ~Autosave draft while editing~
    * Load draft into editor
    * Publish
* mongo models
    * ~Draft~
    * ~Work~
    * ~Type~
    * ~Topic~

### User Account
* Profile page
    * ~Pro pic~
    * ~name, username, bio~
    * stats
    * works
* Your Works page
    * Display a list of active drafts 
     * ~Drafts fetched from backend and populated on frontend~
     * styled draft cards
    * Display a list of published works

### Navbar
* logged in user dropdown
    * ~tab: Profile~
    * ~tab: Your Works~
    * ~tab: New Story~
    * tab: Settings
    * ~tab: logout~

### Issues
* Session inconsistency
* Server stuck when first laoded page is not base '/'

## Usage

  1. **Clone Repsository**
      * Clone repository, enter package (```cd workshop/```) from command line, and continue with the next steps.
  2. **Install dependencies:**
      * Command: ```npm install```
  3. **Run Webpack**
      * Command: ```npm run build```
  3. **Start the server**
      * Command: ```npm run server```
      * Navigate to http://localhost:3000 and you should see **We're up and running!**
  4. **After making changes always  run webpack**
      * During development: ```npm run build```
      * For production: ```npm run prod```


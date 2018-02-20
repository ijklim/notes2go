# notes2go

Notes sharing between devices or users without login

<p align="center">
  <a href="https://notes-2go.firebaseapp.com">
    <img src="https://github.com/ijklim/notes2go/blob/master/screenshot.jpg" width="1000px">
    <br>
    Live Demo
  </a>
</p>

## Technologies
* Vue.js 2.0
* [Vuelidate](https://github.com/monterail/vuelidate)
* [Vuetify](https://vuetifyjs.com)
* Vuex
* [vue-sweetalert2](https://www.npmjs.com/package/vue-sweetalert2)
* [Material Icons](https://material.io/icons)
* Firebase


## Development Setup

1.  Install depedencies using `npm` or `yarn`

        npm install

    or

        yarn install

1.  Create Firebase account on https://firebase.google.com.

1.  Create a new Firebase project. Be aware that Project Id cannot be modified once selected, and it will be used for hosting your app (e.g. https://<project_id>.firebaseapp.com)

1.  Select project, click on **Authentication**, then **SET UP SIGN-IN METHOD**, enable provider **Anonymous**

1.  In the local project folder, make a copy of `config/app.env.js.example` and name it `config/app.env.js`. Replace all FIREBASE related settings in `config/app.env.js` with settings from Firebase **WEB SETUP**. Be careful to leave the double quotes intact.

1.  Set up Firebase database. Under **RULES** enter security rules to prevent unauthorized access. Samples:

    ```json
    {
      "rules": {
        "notes": {
          ".read": "auth != null",

          ".indexOn": ["code"],

          "$notesId": {
            ".read": "auth != null",
            ".write": "auth != null",
            "code": {
              ".validate": "newData.val().length >= 3 && newData.val().length <= 30"
            }
          }
        }
      }
    }
    ```
 
1.  Serve with hot reload at localhost:8080

        npm run dev

    or

        yarn run dev


## Credits

* [App icon made by Smashicons](https://www.flaticon.com/authors/smashicons)
# notes2go

> Notes sharing between devices or users without login

## Technologies
* Vue.js 2.0
* [Vuetify](https://vuetifyjs.com)
* [Vuelidate](https://github.com/monterail/vuelidate)
* Vuex
* [Material Icons](https://material.io/icons)
* [vue-sweetalert2](https://www.npmjs.com/package/vue-sweetalert2)

## Build Setup

1.  Install depedencies using `npm` or `yarn`

        npm install

    or

        yarn install

1.  Create Firebase account on https://firebase.google.com. Access **Console** and retrieve settings from **Web Setup**. Make a copy of `config/app.env.js.example` and name it `config/app.env.js`. Replace settings in `config/app.env.js` with settings from Firebase console.

1.  On Firebase, enable [**Anonymous** Sign-in](https://firebase.google.com/docs/auth/web/anonymous-auth).

1.  Set up Firebase rules to prevent unauthorized access. Samples below:

    ```json
    {
      "rules": {
        "notes": {
          ".read": "auth != null",

          // Indexing for faster query
          ".indexOn": ["code"],

          "$notesId": {
            ".read": "auth != null",
            ".write": "auth != null",
            "code": {
              // newData is a reserved word
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
<template>
  <v-toolbar class="yellow lighten-4">
    <!-- App Name, top left -->
    <v-toolbar-title>
      <router-link :to="menuHome" router tag="span" class="clickable">{{ appName }}</router-link>
    </v-toolbar-title>
    <v-spacer />

    <!-- Icons -->
    <div class="mr-3">
      <v-tooltip bottom>
        <v-btn icon slot="activator" @click="deleteNote" v-if="showDeleteIcon">
          <v-icon>delete</v-icon>
        </v-btn>
        <span>Delete</span>
      </v-tooltip>

      <v-tooltip bottom>
        <v-btn icon slot="activator" @click="shareNote" v-if="showShareIcon">
          <v-icon>share</v-icon>
        </v-btn>
        <span>Share</span>
      </v-tooltip>
    </div>

    <!-- Search bar: https://vuetifyjs.com/en/components/text-fields#main-toolbar -->
    <v-text-field
      append-icon="search"
      class="toolbar__search mr-2"
      flat
      label="Code search"
      solo-inverted
      v-model="searchText"
      :autofocus="searchAutofocus"
      :append-icon-cb="searchNote"
      @keyup.enter.native="searchNote"
    />
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppNavbar',
  props: {
    appName: String
  },
  data () {
    return {
      menuHome: '/',
      menuItems: [
        { icon: 'smartphone', title: 'Share', link: '/note' }
      ],
      searchAutofocus: false,
      searchText: ''
    }
  },
  computed: {
    showDeleteIcon () {
      return this.$store.getters.isDataEditable && this.showShareIcon
    },
    showShareIcon () {
      return this.$store.getters.linkViewOnly.length > 0
    }
  },

  methods: {
    deleteNote () {
      this.$store.dispatch('deleteNote')
    },
    searchNote () {
      this.$store.dispatch('submitSearch', this.searchText)
    },
    shareNote () {
      this.$store.dispatch('shareNote')
    }
  }
}
</script>

<style scoped>
.toolbar__search {
  max-width: 250px;
}
</style>

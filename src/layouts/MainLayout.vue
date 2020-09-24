<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat dense round
          icon="home" aria-label="Home"
          @click="goHome()"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  components: { },
  data () {
    return {
    }
  },
  methods: {
    goHome: function () {
      this.$router.push('/').catch(() => false)
    }
  }
}
</script>

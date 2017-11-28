<style lang="scss">
@import '../styles/variables.scss';

.navigation {
  width: 100%;
  top: 0;
  margin: 0;
  padding: 0;
  // position: fixed;
  background-color: $dark;
  color: white;
  li {
    display: inline-block;
    font-size: 1.2rem;
    width: 18%;
    margin: 0;
    padding: 1%;
    text-align: center;
    &:nth-child(1) {
      display: none;
    }
    &:nth-child(2) {
      margin-left: 10%;
    }
    &:hover {
      cursor: pointer;
      background-color: $green;
    }
  }
}
@media(max-width: 1080px) {
  .navigation {
    width: 60%;
    height: 100vh;
    position: fixed;
    left: -60%;
    transition-duration: .5s;
    li {
      margin: 1% 0;
      width: 90%;
      display: block;
      &:nth-child(1) {
        position: fixed;
        display: block;
        left: 0;
        background-color: $transparentDark;
        width: 2rem;
        border-radius: .5rem;
      }
      &:nth-child(2) {
        margin-left: 0;
      }
    }
  }
  .open {
    left: 0;
  }
}
</style>
<template lang="html">

<ul class="navigation" :class="{ open: panelOpen }">
  <li v-on:click="togglePanel"><i class="fa fa-bars" aria-hidden="true"></i></li>
  <li v-on:click="navigate('home')"><i class="fa fa-home" aria-hidden="true"></i> Home</li>
  <li><i class="fa fa-info-circle" aria-hidden="true"></i> About</li>
  <li v-on:click="navigate('search')"><i class="fa fa-search" aria-hidden="true"></i> Search</li>
  <li><i class="fa fa-envelope" aria-hidden="true"></i> Contact</li>
</ul>

</template>
<script>
export default {
  data: function() {
    return {
      panelOpen: false
    };
  },
  methods: {
    navigate: function(page) {
      this.$router.push(page);
    },
    togglePanel: function() {
      this.panelOpen = !this.panelOpen;
    }
  }
}
</script>

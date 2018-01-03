<style lang="scss">
.searchResult {
  color: rgb(31.6%, 28.9%, 28.9%);
  list-style-type: none;
  display: block;
  .columns {
    .col {
      vertical-align: bottom;
    }
  }
}

.listBusinessItem {
  img {
    width: 50%;
    max-width: 20rem;
  }
}

.viewProfile {
  &:hover {
    cursor: pointer;
  }
}

@media(max-width: 1080px) {
  .searchResult {
    .columns {
      .col {
        display: block !important;
        width: 100%;
        margin: 0;
      }
    }
  }
  .listBusinessItem {
    img {
      width: 80%;
      max-width: 80%;
      margin: 0 auto;
    }
  }
}
</style>


<template>
  <li class="box searchResult">
    <ul class="zero columns">
      <li class="col listBusinessItem">
        <img :src="pictures[picIdx]" :alt="user.info.businessName">
        <h1>{{ user.info.businessName }}</h1>
      </li>

      <li class="col">
        <p>
          {{ user.info.description }}
        </p>
        <h6 class="viewProfile" v-on:click="viewProfile">View Profile</h6>
      </li>
    </ul>
  </li>
</template>


<script>
export default {
  data: function() {
    return {
      pictures: [],
      picIdx: 0
    };
  },
  props: [
    'user'
  ],
  mounted: function() {
    this.pictures = this.user.info.images.map((i) => `${process.env.API_HOST}/api/images/${i}`);
  },
  methods: {
    viewProfile: function() {
      // this.$router.push()
    }
  }
}
</script>

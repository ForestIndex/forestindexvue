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
        <img :src="baseUrl + image" :alt="user.info.businessName">
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
      baseUrl: `${process.env.API_HOST}/api/images/`,
      image: 'no-picture.png'
    };
  },
  props: [
    'user'
  ],
  mounted: function() {
    if (this.user.info.images.length > 0) {
      const latest = this.user.info.images.length - 1;
      this.image = this.user.info.images[latest];
    }
  },
  methods: {
    viewProfile: function() {
      this.$router.push({ name: 'profile', params: { id: this.user._id }});
    }
  }
}
</script>

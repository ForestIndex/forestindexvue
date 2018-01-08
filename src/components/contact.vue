<style lang="scss">
@import "../styles/common.scss";
@import "../styles/buttons.scss";

.input {
  width: 70%;
  padding: .5%;
  margin: 1% 14.5%;
  font-size: 1.2rem;
  border-radius: .3rem;
  border: .05rem solid gray;
  outline: none;
}

.errorInput {
  outline: .05rem solid $red;
}

#messageBox {
  width: 70%;
  margin: 0 14.5%;
  font-size: 1rem;
  border-radius: .3rem;
  border: .05 solid gray;
  padding: .5%;
}

@media(max-width: 1080px) {
  #messageBox, .input {
    width: 99%;
  }
  .input { margin: 1% 0; }
  #messageBox { margin: 0; }
}
</style>

<template>
<section class="outerSection">
  <banner></banner>
  <navigation></navigation>

  <div class="box">
    <h1 class="mainTitle">Contact Us</h1>
    <input type="text" :class="{ input: true, errorInput: error.email }" placeholder="Email address" v-model="email">
    <input type="text" :class="{ input: true, errorInput: error.email }" placeholder="Confirm Email" v-model="confirmEmail">
    <textarea cols="30" id="messageBox" rows="10" placeholder="Message" :class="{errorInput: error.message}" v-model="message"></textarea>

    <button id="submit" v-on:click="sendEmail">Send</button>
    <h5 v-if="error.displayText.length > 0" class="red">{{ error.displayText }}</h5>
  </div>
</section>
</template>

<script>
import banner from './child.banner.vue';
import navigation from './child.navigation.vue';

export default {
  data: function() {
    return {
      email: '',
      confirmEmail: '',
      message: '',
      error: {
        email: false,
        message: false,
        displayText: ''
      }
    };
  },
  components: {
    banner,
    navigation
  },
  methods: {
    sendEmail: function() {
      const payLoad = {
        email: this.email,
        message: this.message
      };
      const url = `${process.env.API_HOST}/api/email`;
      const formIsValid = this.validForm();

      if (formIsValid) {
        this.$http.post(url, payLoad)
        .then((res) => {
          this.email = '';
          this.confirmEmail = '';
          this.message = '';
          alert('Thanks for contacting us. We will do our best to respond as soon as possible.');
        }, (err) => {
          console.log(err);
          this.error.displayText = 'There was an error sending message';
        });
      }
    },
    validForm: function() {
      if (!this.goodEmail(this.email)) {
        this.error.email = true;
        this.error.displayText = 'Please enter a valid email address.';
        return false;
      } else if (this.email !== this.confirmEmail) {
        this.error.email = true;
        this.error.displayText = 'Email addresses do not match!';
        return false;
      } else if (!this.message || this.message.length === 0) {
        this.error.displayText = 'Please include a message body.';
        this.error.message = true;
        return false;
      }
      return true;
    },
    goodEmail: function(email) {
      if (!email) return false;

      const atIdx = email.indexOf('@');
      const dotIdx = email.indexOf('.');
      const lastIdx = email.length - 1;

      if (atIdx < 1 || atIdx >= lastIdx) {
        return false;
      } else if (dotIdx < 2 || dotIdx >= lastIdx) {
        return false;
      }
      return true;
    }
  },
  watch: {
    'email': function(newVal, oldVal) {
      this.error.email = false;
      this.error.displayText = '';
    },
    'confirmEmail': function(newVal, oldVal) {
      this.error.email = false;
      this.error.displayText = '';
    },
    'message': function(newVal, oldVal) {
      this.error.message = false;
      this.error.displayText = '';
    }
  }
}
</script>

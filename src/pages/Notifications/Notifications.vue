<template xmlns:div="http://www.w3.org/1999/html">
  <v-container fluid class="notification-page">
    <h1 class="page-title mt-10 mb-6">Notifications</h1>
    <v-row class="mb-5">
      <v-card width="100%" class="d-flex flex-row mx-3">
       <v-row no-gutters>
         <v-col lg="4" cols=12>
           <v-card-title class="pa-5 pb-3">
             <p>Notifications Types</p>
           </v-card-title>
           <v-card-text class="pa-5 pt-0">
             <p>Different types of notifications for lost of use cases. Custom classes are also supported.</p>
             <v-row no-gutters class="action-buttons pb-6">
               <v-col cols="12">
                 <v-btn
                     block
                     @click="addInfoNotification"
                     color="primary"
                     class="text-capitalize my-2"
                 >Info Message</v-btn>
                 <div class="w-100"></div>
                 <v-btn
                     block
                     @click="addErrorNotification"
                     color="error"
                     class="text-capitalize my-2"
                 >Error + Retry Message</v-btn>
                 <div class="w-100"></div>
                 <v-btn
                     block
                     @click="addSuccessNotification"
                     color="success"
                     class="text-capitalize my-2"
                 >Success Message</v-btn>
               </v-col>
             </v-row>
           </v-card-text>
         </v-col>
       </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Notifications',
  data() {
    return {
      notificationsType: [
        {
          icon: 'mdi-email',
          text: 'Thanks for Checking out Messenger',
          color: "error"
        },
        {
          icon: 'mdi-message-alert',
          text: 'New user feedback received',
          color: 'primary'
        },
        {
          icon: 'mdi-account-box',
          text: 'New customer is registered',
          color: 'success'
        },
        {
          icon: 'mdi-check',
          text: 'The order was shipped',
          color: 'warning'
        },
        {
          icon: 'mdi-briefcase-variant',
          text: 'The order was deliver',
          color: 'primary'
        },
        {
          icon: 'mdi-information-outline',
          text: '5 Defence alerts',
          color: 'info'
        },
      ],
      position: 'top-right'
    }
  },
  methods: {
    addInfoNotification() {
      this.$toast.info("New user feedback received", {
        position: this.position,
        timeout: 6000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true
      });
    },
    addErrorNotification() {
      this.$toast.error("Message was not sent!", {
        position: this.position,
        timeout: 6000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true
      });
    },
    addSuccessNotification() {
      this.$toast.success("The item was shipped", {
        position: this.position,
        timeout: 6000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true
      });
    },

    toggleLocation(position) {
      this.position = position;
      this.$toasted.options.position = this.position;
      this.$toasted.show(null);
    },
  }
};

</script>

<style src="./Notifications.scss" lang="scss"></style>

<template>
  <v-container fluid>
    <div class="user-info-full">
      <h1 class="page-title mt-10 mb-6">Информация о пользователе по ID</h1>
      <v-spacer></v-spacer>
      <v-row>
        <div class="mr-7" style="width: 250px;">
          <v-text-field
              color="light-blue accent-2"
              v-model.number="userId"
              label="Введите ID Пользователя"
              filled
          ></v-text-field>
        </div>
        <v-btn
            class="text-capitalize white--text"
            large
            :disabled="!Number.isInteger(userId)"
            color="#25bfec"
            @click="getUser"
            style="margin-top: 7px"
        >Найти</v-btn>
      </v-row>
      <v-row>
        <v-col cols="5">
          <v-card v-if="loading" class="pa-7">
            <v-text-field
                v-model="user.id"
                label="ID"
                disabled
            ></v-text-field>
            <v-text-field
                v-model="user.fullName"
                label="ФИО"
                disabled
            ></v-text-field>
            <v-text-field
                v-model="user.email"
                label="Почта"
                disabled
            ></v-text-field>
            <v-text-field
                v-model="user.phone"
                label="Телефон"
                disabled
            ></v-text-field>
            <v-text-field
                v-model="user.birth_date"
                label="Дата рождения"
                disabled
            ></v-text-field>
            <div class="flex-row">
              <span>Почта</span>
              <v-chip
                  v-if="user.confirmed"
                  class="ma-2"
                  color="green"
                  text-color="white"
              >
                Подтверждина
              </v-chip>
              <div v-else>
                <v-chip
                    class="ma-2"
                    color="red"
                    text-color="white"
                >
                  Не подтверждина
                </v-chip>
                <v-btn
                    class="text-capitalize white--text"
                    large
                    color="#25bfec"
                    @click="sendConfirmed"
                >
                  Отправить повторно
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col v-if="loading" >
          <h1 class="page-title mt-10 mb-6">Все заявления</h1>
          <v-data-table
              :headers="headers"
              :items="request"
              item-key="id"
              class="elevation-1"
          >
            <template v-slot:item.status="{ item }">
              <v-chip
                  :color="getColorStatus(item.status)"
                  dark
              >
                {{ item.status }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                  class="mr-2"
                  @click="showItem(item)"
              >
                mdi-book-search-outline
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "InfoUser",
  props: ['uId'],
  data() {
    return {
      loading: false,
      user: {
        id: undefined,
        email: undefined,
        surname: undefined,
        phone: undefined,
        name: undefined,
        confirmed: false,
        free_request: false,
        birth_date: undefined,
        patronymic: undefined,
        fullName: ''
      },
      request: [],
      requestUserData: {
        id: undefined,
        amount: undefined,
        term_in_month: undefined,
        status: undefined
      },
      userId: '',
      headers: [
        { text: 'ID', align: 'start', value: 'id' },
        { text: 'Amount', value: 'amount' },
        { text: 'Term in month', value: 'term_in_month' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions' }
      ],
    }
  },
  methods: {
    getUser() {
      axios.get(`/api/admin/users/${this.userId}`).then( res => {
            this.user = res.data.user
            this.user.fullName = this.mergname(this.userId)
            this.request = res.data.requests.data
            this.loading = true
          })
    },
    sendConfirmed() {
      axios.post(`/api/admin/users/${this.user.is}/activation-email`)
    },
    mergname(el) {
      return `${el.name} ${el.surname} ${el.patronymic || ' '}`
    },
    getColorStatus (itemStatus) {
      const colorStatus = { CREATED: 'blue darken-1', PENDING_SERVICE: 'indigo darken-1', PENDING_BANK: 'deep-purple darken-1', APPROVED: 'green', CANCEL: 'gray' }
      return colorStatus[itemStatus];
    },
    showItem (item) {
      this.editedIndex = this.request.indexOf(item)
      this.editedItem = Object.assign({}, item )
      this.$router.push({ name: 'Request', params: { uId: this.userId, rId: item.id }})
      //this.dialog = true
    },
  },
  created() {
    if(this.uId) {
      console.log(this.uId)
      this.userId = this.uId
      this.getUser()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/app';

.page-title {
  padding-bottom: 20px;
  @include media-breakpoint-up(sm) {
    padding-bottom: 0;
  }
}

.v-card {
  .v-card__text {
    .subtext {
      font-size: 1.142rem;
      font-weight: 400;
      color: $title-grey;
    }
    .subtext-index {
      font-size: 11px;
      color: $text-color;
      font-weight: 400;
    }
  }
}

</style>

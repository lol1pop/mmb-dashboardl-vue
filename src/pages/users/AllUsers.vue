<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Все пользователи</h1>
      <v-row>
        <v-col >
          <v-card class="employee-list mb-1">
            <v-card-title class="pa-5 pb-3">
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Поиск"
                  clearable
                  single-line
                  hide-details
                  color="light-blue accent-2"
              />
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="list"
                :search="search"
                item-key="id"
                :page.sync="page"
                :items-per-page="sizePage"
                class="elevation-1"
                :loading="listLoading"
                loading-text="Loading... Please wait"
                hide-default-footer
            >
              <template v-slot:item.confirmed="{ item }">
                <v-chip
                    :color="getColor(item.confirmed)"
                    dark
                >
                  {{ item.confirmed }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                    class="mr-2"
                    @click="showItem(item)"
                >
                  mdi-badge-account-outline
                </v-icon>
                <v-icon
                    @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination
                  v-model="page"
                  :length="pageCount"
              ></v-pagination>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "AllUsers",
  data() {
    return {
      search: '',
      selected: [],
      headers: [
        { text: 'ID', align: 'start', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'BirthDay', value: 'birth_date' },
        { text: 'State', value: 'confirmed' },
        { text: 'Actions', value: 'actions' }
      ],
      list: [],
      page: 1,
      pageCount: 0,
      sizePage: 50,
      totalItems: undefined,
      listLoading: false
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      axios.get('/api/admin/users').then(response => {
        this.list = response.data.data.map( el => { el.name = this.mergname(el); return el })
        this.totalItems = response.data.total
        if(this.sizePage < this.totalItems) this.pageCount =Math.round(this.totalItems / this.sizePage)
        this.listLoading = false
      })
    },
    nextData(page, size) {
      this.listLoading = true
      axios.get('/api/admin/users', { page, size }).then(response => {
        this.list = response.data.items
        this.totalItems = response.data.total
        if(this.sizePage < this.totalItems) this.pageCount = Math.round(this.totalItems / this.sizePage)
        this.listLoading = false
      })
    },
    mergname(el) {
      return `${el.name} ${el.surname} ${el.patronymic || ' '}`
    },
    getColor (item) {
      return item ? 'green' : 'red';
    },
    showItem (item) {
      this.editedIndex = this.list.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$router.push({ name: 'Info users', params: { uId: item.id } })
      //this.dialog = true
    },
    deleteItem (item) {
      const index = this.list.indexOf(item)
      this.listLoading = true
      axios.get(`/api/admin/users/${item.id}`).then(() => {
        this.list.splice(index, 1)
        this.listLoading = false
      })
    },
  },
  watch: {
    page: () => {
      this.nextData(this.page, this.sizePage)
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/app';

.page-title {
  padding-bottom: 20px;
  @include media-breakpoint-up(sm) {
    padding-bottom: 0;
  }
}

.employee-list {
  .v-card__title {
    .v-input {
      max-width: 45%;
      @include media-breakpoint-up(md) {
        max-width: 20%;
      }
    }
  }

  .v-data-table {
    .v-text-field > .v-input__control > .v-input__slot {
      &:after, &:before {
        border: none !important;
      }
    }
  }
}

</style>

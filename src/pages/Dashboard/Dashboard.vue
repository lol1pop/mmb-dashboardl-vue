<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-14 mb-6">
        <h1 class="page-title">Dashboard</h1>
      </v-row>
      <v-row>
        <v-col cols=12>
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-5 pb-0">
              <p>Support Requests</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                  <tr>
                    <th class="text-left pa-6">NAME</th>
                    <th class="text-left">EMAIL</th>
                    <th class="text-left">PRODUCT</th>
                    <th class="text-left">PRICE</th>
                    <th class="text-left">DATE</th>
                    <th class="text-left">CITY</th>
                    <th class="text-left">STATUS</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in mock.table" :key="item.name">
                    <td class="pa-6">{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.product }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.city }}</td>
                    <td v-if="item.status === 'Sent'">
                      <v-chip
                        link
                        color="success"
                        class="ma-2 ml-0"
                      >
                        Sent
                      </v-chip>
                    </td>
                    <td v-else-if="item.status === 'Pending'">
                      <v-chip
                        link
                        color="warning"
                        class="ma-2 ml-0"
                      >
                        Pending
                      </v-chip>
                    </td>
                    <td v-else-if="item.status === 'Declined'">
                      <v-chip
                        link
                        color="secondary"
                        class="ma-2 ml-0"
                      >
                        Declined
                      </v-chip>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
  import mock from './mock';

  export default {
    name: 'Dashboard',
    data() {
      return {
        mock,
        apexLoading: false,
        value: this.getRandomInt(10,90),
        value2: this.getRandomInt(10,90),
        mainApexAreaSelect: 'Daily',
      };
    },
    methods: {
      getRandomDataForTrends() {
        const arr = [];
        for (let i = 0; i < 12; i += 1) {
          arr.push(Math.random().toFixed(1) * 10);
        }
        return arr;
      },
      generatePieSeries() {
        let series = [];

        for (let i = 0; i < 4; i++) {
          let y = Math.floor(Math.random() * (500 - 100 + 100)) + 100;
          series.push(y)
        }
        return series;
      },
      getRandomInt(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
      },
    },
    mounted() {
      setTimeout(() => {
        this.apexLoading = true
      })
    }
  };
</script>

<style src="./Dashboard.scss" lang="scss"/>

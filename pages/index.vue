<template>
  <v-app class="dark-grey" theme="dark">
    <v-app-bar flat>
      <v-container class="fill-height d-flex align-center">
        <v-avatar
          class="mr-10 ml-4"
          color="grey-darken-1"
          size="32"
          
        >ami&sup2;</v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            density="compact"
            hide-details
            variant="solo"
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-darken-3 pa-3 mt-16" min-height="500px">
      <v-container>
        <v-row>

          <v-col>
            <v-sheet
              min-height="85vh"
            >
            <v-row class="pa-2">
              <v-card
                v-for="item in resultData()"
                class="mx-auto"
                max-width="344"
              >
                <v-img
                  :src="item.image"
                  height="200px"
                  
                ></v-img>
              
                <v-card-title>
                  {{item.title}}
                </v-card-title>
              
                <v-card-subtitle>
                  {{item.code}}
                </v-card-subtitle>
              
                <v-card-actions>
                  <v-btn
                    :href="'https://www.amiami.com' + item.url"
                    color="orange-lighten-2"
                    variant="text"
                  >
                    View on AmiAmi
                  </v-btn>
              
                </v-card-actions>
              
              </v-card>
              </v-row>
              <v-row class="pa-4">
              <p class="float-right">Page {{page}} out of {{pages}} <v-btn v-if="pages > page" @click="increasePage">Next Page</v-btn> <v-btn v-if="page > 1" @click="decreasePage">Previous Page</v-btn></p>
              </v-row>
            </v-sheet>
            
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
const itemLimit = 10;
let page = ref(1);
let pageItems = ref(((itemLimit*page.value)-10));

let items = (itemLimit*page.value)-10;
const { data, pending, error, refresh } = await useAsyncData(
  'amiami',
  () =>
    $fetch(`/api/amiami`, {
      params: {
      skip: pageItems.value,
      take: itemLimit
      },
    }),
  {
    watch: [pageItems],
  }
);

let count = data.value.count;
let pages = Math.ceil(count / itemLimit);


const links = [
  'Figures',
];

let resultData = () => {
  return data.value.results;
};


let increasePage = async () => {
  page.value++
  pageItems.value = ((itemLimit*page.value)-10);
  
  console.log('Page Number', page.value);
  console.log('Page Items', pageItems.value);
  refresh();
};

let decreasePage = async () => {
  page.value--
  pageItems.value = ((itemLimit*page.value)-10);
  
  console.log('Page Number', page.value);
  console.log('Page Items', pageItems.value);
  refresh();
};

</script>

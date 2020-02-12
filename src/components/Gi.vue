<template>
  <v-container>
    <v-row>
      <v-col
        :cols="12"
        :xs="12"
        :sm="10"
        :offset-sm="1"
        :md="10"
        :offset-md="1"
        :lg="10"
        :offset-lg="1"
        :xl="8"
        :offset-xl="2"
      >
        <v-card style="padding-bottom:10px">
          <v-card-title class="display-1">심상요법</v-card-title>
          <v-card style="margin:10px">
            <v-tabs show-arrows center-active v-model="tab" background-color="primary" dark>
              <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item.tab">
                <v-card flat>
                  <v-card-text style="color: black;">{{ item.content }}</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        {
          tab: "1회기",
          content: "편안한 장소, 자신의 미래에 대한 긍정적인 심상 떠올리기"
        },
        {
          tab: "2회기",
          content:
            "좋아하는 장소와 자신을 지지하는 사람, 아이에 대한 긍정적인 심상 떠올리기"
        },
        {
          tab: "3회기",
          content: "자신이 집과 가족에 대한 긍정적인 심상 떠올리기"
        },
        {
          tab: "4회기",
          content: "미래의 나와 아이의 모습에 대한 긍정적인 심상 떠올리기"
        }
      ]
    };
  }
};
</script>

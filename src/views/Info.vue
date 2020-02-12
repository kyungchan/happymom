<template>
    <v-container>
        <v-tabs
            show-arrows
            center-active
            v-model="tab"
            background-color="primary"
            dark
        >
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item><info1 /></v-tab-item>
            <v-tab-item><info2 /></v-tab-item>
            <v-tab-item><info3 /></v-tab-item>
            <v-tab-item><info4 /></v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
import info1 from "@/components/Info";
import info2 from "@/components/Info2";
import info3 from "@/components/Info3";
import info4 from "@/components/Info4";
export default {
    components: { info1, info2, info3, info4 },
    watch: {},

    data() {
        return {
            tab: null,
            items: [
                { tab: "임신중 불편감 완화방법", content: "" },
                {
                    tab: "건강한 임신 출산을 위한 생활습관",
                    content: "Tab 2 Content"
                },
                { tab: "행복한 분만을 위하여", content: "Tab 3 Content" },
                { tab: "신생아 관리", content: "Tab 4 Content" }
            ]
        };
    }
};
</script>

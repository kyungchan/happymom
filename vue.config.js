var path = require("path")

module.exports = {
    outputDir: path.resolve(__dirname, "./backend/public/"),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                pathRewrite: { "^/api": '' }
            }
        }
    },

    transpileDependencies: ["vuetify"],
    pluginOptions: {
        i18n: {
            locale: "ko",
            fallbackLocale: "ko",
            localeDir: "locales",
            enableInSFC: false
        }
    }
};
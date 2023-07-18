import type { Config } from 'tailwindcss'
import defaultTheme from "tailwindcss/defaultTheme"

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                "accent": "#f27d29",
            },
            screens: {
                'md': '902px',
                'lg': '900px'
            },
        },

        fontFamily: {
            Roboto: ["Roboto", "sans-serif"],
        },

        container: {
            padding: "2rem",
            center: true,
        },

        screens: {
            'xs': '473px',
            ...defaultTheme.screens,
        }
    },

    plugins: [
        require("tailwindcss-all")
    ]
}

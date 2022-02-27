module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            height: {
                'screen-50': '50vh',
                'screen-70': '70vh',
            },
            colors: {
                'header-text': 'var(--header-text-color)',
                myGray: {
                    3: "var(--grey-3)",
                    5: "var(--grey-5)",
                    6: "var(--grey-6)"
                }
            },
            fontFamily: {
                'Fredericka': ['Fredericka the Great', 'Mulish', '-apple-system', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
                'ic': 'ic'
            },
            boxShadow: {
                'body-bg': '0 1.25rem 1rem .3125rem var(--body-bg-shadow)',
                'line': '0 0 .5rem rgba(0, 0, 0, .5)',
            },
            keyframes: {
                slideUpIn: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(10px)',
                    },
                    'to': {
                        opacity: 1,
                        transform: 'translateY(0)',
                    }
                },
                slideUpBigIn: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(80px)'
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0)'
                    }
                },
                imageAnimation: {
                    '0%': {
                        opacity: 0,
                        'animation-timing-function': 'ease-in'
                    },

                    '2%': {
                        opacity: 1
                    },

                    '8%': {
                        opacity: 1,
                        transform: 'scale(1.05)',
                        'animation-timing-function': 'ease-out'
                    },

                    '17%': {
                        opacity: 1,
                        transform: 'scale(1.1)'
                    },

                    ' 25%': {
                        opacity: 0,
                        transform: 'scale(1.1)'
                    },

                    '100%': {
                        opacity: 0
                    }
                }
            },
            animation: {
                'slideUpIn': 'slideUpIn .3s',
                'slideUpBigIn': 'slideUpBigIn .5s',
            },
        },
    },
    variants: {
        extend: {}
        ,
    }
    ,
    plugins: [],
}

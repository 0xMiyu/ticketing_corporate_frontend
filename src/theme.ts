interface colorSchema {
  0?: string,
  10?: string,
  50?: string,
  100: string,
  200: string,
  300: string,
  400: string,
  500: string,
  600: string,
  700: string,
  800: string,
  900: string,
  1000?: string
}
interface tokenType {
  secondary: colorSchema,
  primary: colorSchema,
  grey: colorSchema
}

export const tokensDark: tokenType = {
    secondary: {
    //pink/purple
    100: "#f0dbfd",
    200: "#e0b7fa",
    300: "#d193f8",
    400: "#c16ff5",
    500: "#b24bf3",
    600: "#8e3cc2",
    700: "#6b2d92",
    800: "#471e61",
    900: "#240f31"
},
primary: {
    //indigo/blue
    100: "#e6e8eb",
    200: "#cdd1d6",
    300: "#b4b9c2",
    400: "#9ba2ad",
    500: "#828b99",
    600: "#686f7a",
    700: "#4e535c",
    800: "#34383d",
    900: "#1a1c1f"
},
grey: {
    //for background etc
    0: "#ffffff", 
    10: "#f6f6f6", 
    50: "#f0f0f0", 
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", 
  }};

  const reverseTokenTheme = (tokensDark:tokenType) => {
    const reversedTokens:any = {};
    Object.entries(tokensDark).forEach(([key,val]:any) => {
        //Within each entry
        const keys = Object.keys(val);
        const values = Object.values(val);
        const len = keys.length;
        const reversedTheme:any= {};
        for (let i = 0; i < len; i++){
            reversedTheme[keys[i] as keyof typeof reversedTheme] = values[len - i - 1];
        }
        reversedTokens[key] = reversedTheme;
    });
    return reversedTokens;
  };

  export const tokensLight = reverseTokenTheme(tokensDark);

  //mui theme settings
  const themeSettings = (mode:any) => {
    return{
        palette: {
            mode: mode,
            ...(mode === 'dark') ? {
                primary: {
                    ...tokensDark.primary,
                    main: tokensDark.primary[400],
                    light: tokensDark.primary[400]
                },
                secondary: {
                    ...tokensDark.secondary,
                    main: tokensDark.secondary[300]
                },
                neutral: {
                    ...tokensDark.grey,
                    main: tokensDark.grey[500],
                },
                background:{
                    default: tokensDark.primary[700],
                    alt: tokensDark.primary[500],
                }
            } :
            {
                primary: {
                    ...tokensLight.primary,
                    main: tokensDark.grey[50],
                    light: tokensDark.grey[100],
                  },
                  secondary: {
                    ...tokensLight.secondary,
                    main: tokensDark.secondary[600],
                    light: tokensDark.secondary[700],
                  },
                  neutral: {
                    ...tokensLight.grey,
                    main: tokensDark.grey[500],
                  },
                  background: {
                    default: tokensDark.grey[0],
                    alt: tokensDark.grey[50],
                  },
            }
        },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
              fontFamily: ["Inter", "sans-serif"].join(","),
              fontSize: 40,
            },
            h2: {
              fontFamily: ["Inter", "sans-serif"].join(","),
              fontSize: 32,
            },
            h3: {
              fontFamily: ["Inter", "sans-serif"].join(","),
              fontSize: 24,
            },
            h4: {
              fontFamily: ["Inter", "sans-serif"].join(","),
              fontSize: 20,
            },
            h5: {
              fontFamily: ["Inter", "sans-serif"].join(","),
              fontSize: 16,
            },
            h6: {
              fontFamily: ["Inter", "sans-serif"].join(","),
              fontSize: 14,
            },
          },

          overrides: {
            MuiCssBaseline: {
              "@global": {
                "*::-webkit-scrollbar": {
                  width: "2px"
                }
              }
            }
          }
    }
  }

  export default themeSettings;
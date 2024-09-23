const generateColorStyles = () => {
     const colors = {
        black: {
            'darkest': 'rgba(0, 0, 0, 1)',
            'dark': 'rgba(0, 0, 0, 0.75)',
            'medium': 'rgba(0, 0, 0, 0.5)',
            'light': 'rgba(0, 0, 0, 0.35)',
            'lightest': 'rgba(0, 0, 0, 0.2)'
        }
    };

    const colorStyles = {};

    Object.keys(colors).forEach((colorGroup) => {
        const colorValues = colors[colorGroup];
        Object.keys(colorValues).forEach((shadeKey) => {
            // ex: 'black-darkest', 'black-dark', etc....
            colorStyles[`${colorGroup}-${shadeKey}`] = colorValues[shadeKey];
        });
    });

    return colorStyles;
};

export const COLORS = generateColorStyles();

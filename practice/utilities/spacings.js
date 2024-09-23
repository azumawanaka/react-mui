const predefinedSpacings = [10, 20, 30, 40, 50];
let styles = {};

export const generateSpacingStyles = (values) => {
    if (!Array.isArray(values)) {
        console.error('Expected an array of values');
        return styles;
    }

    values.forEach((value) => {
        if (!predefinedSpacings.includes(value)) {
            predefinedSpacings.push(value);
        }
    });

    predefinedSpacings.forEach((value) => {
        // margins
        styles[`mt-${value}`] = { marginTop: `${value}px` };
        styles[`mb-${value}`] = { marginBottom: `${value}px` };
        styles[`ml-${value}`] = { marginLeft: `${value}px` };
        styles[`mr-${value}`] = { marginRight: `${value}px` };
        styles[`mx-${value}`] = { marginLeft: `${value}px`, marginRight: `${value}px` };
        styles[`my-${value}`] = { marginTop: `${value}px`, marginBottom: `${value}px` };

        // paddings
        styles[`pt-${value}`] = { paddingTop: `${value}px` };
        styles[`pb-${value}`] = { paddingBottom: `${value}px` };
        styles[`pl-${value}`] = { paddingLeft: `${value}px` };
        styles[`pr-${value}`] = { paddingRight: `${value}px` };
        styles[`px-${value}`] = { paddingLeft: `${value}px`, paddingRight: `${value}px` };
        styles[`py-${value}`] = { paddingTop: `${value}px`, paddingBottom: `${value}px` };
    });

    return styles;
};

export const combineSpacingStyles = (...keys) => {
    const combinedStyles = {};
    const importants = {};

    keys.forEach((key) => {
        if (key.includes("!important")) {
            key = key.replace("!important", "").trim();
            Object.assign(importants, styles[key]);
        }

        if (styles[key]) {
            Object.assign(combinedStyles, styles[key]);
        }
    });

    Object.keys(importants).forEach((impKey) => {
        if (combinedStyles[impKey]) {
            combinedStyles[impKey] = `${combinedStyles[impKey]} !important`;
        }
    });

    return combinedStyles;
};

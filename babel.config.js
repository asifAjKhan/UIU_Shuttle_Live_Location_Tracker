// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    //plugins: ["nativewind/babel"],
    plugins: [
      ['module:react-native-dotenv', {
        "moduleName": "@env",
        "path": ".env",
        "safe": false,
        "allowUndefined": true,
      }],
      ["nativewind/babel"]
    ]
  };
};


/*

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        "moduleName": "@env",
        "path": ".env",
        "safe": false,
        "allowUndefined": true,
      }]
    ]
  };
};



*/

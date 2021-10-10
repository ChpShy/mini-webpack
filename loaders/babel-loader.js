const { transform } = require('@babel/core')
module.exports = (content, options) => {
  const { code } = transform(content, {
    presets: ["@babel/preset-env"]
  })
  return code;
}
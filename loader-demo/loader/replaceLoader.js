
module.exports = function (source) {
  const result = source.replace("hello", 'world');
  this.callback(null, result);
};

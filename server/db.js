module.exports = new (function () {
  this.data = [];
  this.db = function () {
    return this.data;
  };
  this.add = (session) => {
    this.data.push(session);
    return true;
  };
  this.session = function (id) {
    return this.data.find((el) => el.id === id);
  };
})();

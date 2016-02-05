const plots = [
  'clear',
  'create-users',
  'create-aliases',
];

module.exports = function(storyline) {
  plots.forEach((plot) => {
    storyline.addPlot(plot, require(`./${plot}`));
  });
};

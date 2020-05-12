(function() {
  'use strict';

  module.exports = function (players, totalInvestment) {
    if (!players || players.length === 0) return [];

    let totalInvestments = [];
    let rValuesClosure = [];
    let playerIdsClosure = [];
    let roisClosure = [];

    players.forEach(player => {
      playerIdsClosure.push(player.id);
      rValuesClosure.push(
        (player.projection || 0) != 0 ? ((player.performance || 0) / (player.projection || 0)) : 0
      );
      totalInvestments.push(player.totalInvestment || 0);
    });

    let denominator = totalInvestments.map((totalInvestment, index) => {
      return totalInvestment * rValuesClosure[index];
    }).reduce((sum, value) => {
      return sum + value;
    });

    let c = denominator != 0 ? totalInvestment / denominator : 0;
    roisClosure = rValuesClosure.map(r => {
      return parseFloat((r * c).toFixed(4));
    });

    let playerReturns = [];
    playerIdsClosure.forEach((id, index) => {
      playerReturns.push({roi: roisClosure[index], id: id})
    });

    return playerReturns;
}
}());
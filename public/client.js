// client-side js
// run by the browser each time your view template is loaded

/*globals Trello,trelloBoard:false */

var stagesSummary = {};

var now = new Date();
var oneWeekAgo = new Date();
oneWeekAgo.setDate(now.getDate() - 7);

var logError = function(err) {
  // error occurred
  console.log("Error occurred compiling stages: " + err);
};

var render = function() {
  $('div#date-picker').html('<b>From:</b>' + oneWeekAgo.toLocaleString() + '<br>' +
                            '<b>To:</b>' + now.toLocaleString());
  
  for (var key in stagesSummary) {
    // skip loop if the property is from prototype
    if (!stagesSummary.hasOwnProperty(key)) continue;
    
    $('<li></li>').html('<div>' +
                        stagesSummary[key].name + ': <b>'+stagesSummary[key].count+'</b>'+
                        '</div>').appendTo('ul#stages');
  }
};

var filterStages = function(stages) {
  Promise.all(stages.filter(function(stage) {
    // Filter DONE Stages
    return stage.name.indexOf('DONE') > -1;
  }).map(function(stage) {
    // Promise: Get all Cards
    stagesSummary[stage.id] = {
      name: stage.name,
      count: 0
    };
    return Trello.get('lists/' + stage.id + '/cards/open');
  })).then(function(cards){
    // Merge all cards into single array
    var merged = [].concat.apply([], cards);
    // Consolidate all actions, then render
    return Promise.all(merged.map(function(card) {
      return Trello.get('cards/' + card.id + '/actions?filter=updateCard:idList&limit=1&since=' + oneWeekAgo, 
        function(actions) {
          if(actions.length > 0) {
            stagesSummary[card.idList].count += actions.length;
          }
        });
    })).then(function(x) {
      render();
    }, logError)
  }, logError);
};

var authenticationSuccess = function() {
  console.log('Successful authentication');
  // Get all cards on our recipe list.
  Trello.get('boards/' + trelloBoard + '/lists/open', filterStages)
};

var authenticationFailure = function() { console.log('Failed authentication'); };

// Where the magic happens: let's authorize!
Trello.authorize({
  type: 'popup',
  name: 'Getting Started Application',
  scope: {
    read: true,
    write: true },
  expiration: 'never',
  success: authenticationSuccess,
  error: authenticationFailure
});
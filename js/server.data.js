var data = [];

function genData(){
  data = [];
  var names = ['Alice', 'Bob', 'Charlie', 'Doris', 'Eve', 'Frank', 'Gloria', 'Harry', 'Igor', 'Jon'];
  
  // Generate data for each name until no names left
  while(names.length > 0){
    data.push({
      // Pull out a name randomly
      'name': names.splice(Math.floor(Math.random() * names.length),1)[0],
      // Generate a random value from 0 to 100
      'value': Math.floor(Math.random() * 33) + Math.floor(Math.random() * 33) + Math.floor(Math.random() * 34)
    });
  }
  
  return data;
}

function genCard(title,content){
  // New data holder using semantic ui card notiation
  var $new_card = $('<a href="#" class="ui card"><div class="content"><div class="header"></div><div class="description"></div></div></a>');
  
  // Set card's header
  $new_card.find('.header').html(title);
  
  // Set card's description
  $new_card.find('.description').html(content);
  
  return $new_card;
}

$('#generate').click(function(){
  // Generate data and sort it by name in ascending order
  var data = genData().sort(function(a,b){
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });
  
  // Data exists, enable send data button
  $('#send').removeClass('disabled');
  
  // Generate html cards using the generated data
  var cards = [];
  data.forEach(function(d){
    cards.push(genCard(d.name,d.value));
  });
  
  $('.ui.four.cards').html('');
  $('.ui.four.cards').append(cards);
});

$('#send').click(function(){
  send(data);
});
var pubnub = PUBNUB({
  // Replace the following with the keys found in your PubNub account
  publish_key: 'pub-c-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  subscribe_key: 'sub-c-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
});


pubnub.subscribe({
  channel : 'user_data_channel',
  message : function(user_data){
    updateData(user_data);
  }
});
var pubnub = PUBNUB({
  // Replace the following with the keys found in your PubNub account
  publish_key: 'pub-c-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  subscribe_key: 'sub-c-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
});

function send(user_data) {
  pubnub.publish({
    channel : 'user_data_channel',
    message : user_data,
    callback: function(m){
      console.log(m);
    }
  });
}
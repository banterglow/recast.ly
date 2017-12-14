// TODO: Render the `App` component to the DOM
$.ajax({
  url: 'https://www.googleapis.com/youtube/v3/search',
  data: {
    part: 'snippet',
    key: window.YOUTUBE_API_KEY,
    q: 'The Last Jedi',
    maxResults: 5,
    type: 'video',
    videoEmbeddable: 'true'
  },
  success: function (data) {
    ReactDOM.render(<App videoList={data.items} />, document.getElementById('app'));
  }
});

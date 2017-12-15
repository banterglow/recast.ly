class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeVideoPlayer = this.changeVideoPlayer.bind(this);
    this.newSearch = this.newSearch.bind(this);
    this.state = {
      currentVideo: this.props.videoList.items[0],
      videoList: this.props.videoList.items,
      channel: null,
      channelId: null,
      views: null,
      likes: null,
      dislikes: null,
      datePosted: null
    };
  }

  changeVideoPlayer(videoId) {
    for (var i = 0; i < this.state.videoList.length; i++) {
      if (this.state.videoList[i].id.videoId === videoId) {
        let self = this;
        $.ajax({
          url: 'https://www.googleapis.com/youtube/v3/videos',
          data: {
            part: 'statistics, snippet',
            key: window.YOUTUBE_API_KEY,
            id: videoId,
          },
          success: function (data) {
            self.setState({
              currentVideo: self.state.videoList[i],
              channel: data.items[0].snippet.channelTitle,
              channelId: data.items[0].snippet.channelId,
              views: data.items[0].statistics.viewCount,
              likes: data.items[0].statistics.likeCount,
              dislikes: data.items[0].statistics.dislikeCount,
              datePosted: moment(data.items[0].snippet.publishedAt).format('MMMM Do YYYY')
            });
          }
        });
        
        break;
      }
    }
  }

  newSearch(results) {
    this.setState({
      page: 1,
      videoList: results.items
    });
  }

  nextPage() {
    this.setState({
      page: this.page++
    });
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <img src="../../media/logo.png" alt="logo" />
          <div className="col-md-11">
            <div><h5> <Search callbackParent={this.newSearch} page={this.page}/></h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><h5> <VideoPlayer video={this.state}/></h5></div>
          </div>
          <div className="col-md-5">
            <div><h5> <VideoList videos={this.state.videoList} callbackParentVideo={this.changeVideoPlayer} callbackParentNextPage={this.nextPage}/> </h5></div>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeVideoPlayer = this.changeVideoPlayer.bind(this);
    this.newSearch = this.newSearch.bind(this);
    this.state = {
      currentVideo: this.props.videoList[0],
      videoList: this.props.videoList
    };
  }

  changeVideoPlayer(videoId) {
    for (var i = 0; i < this.state.videoList.length; i++) {
      if (this.state.videoList[i].id.videoId === videoId) {
        this.setState({
          currentVideo: this.state.videoList[i]
        });
        break;
      }
    }
  }

  newSearch(results) {
    this.setState({
      videoList: results.items
    });
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <img src="../../media/logo.png" alt="logo" />
          <div className="col-md-11">
            <div><h5> <Search callbackParent={this.newSearch}/></h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><h5> <VideoPlayer video={this.state.currentVideo}/></h5></div>
          </div>
          <div className="col-md-5">
            <div><h5> <VideoList videos={this.state.videoList} callbackParent={this.changeVideoPlayer}/> </h5></div>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
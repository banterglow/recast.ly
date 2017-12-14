class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedVideo: false
    };
    this.newVideoSelected = this.newVideoSelected.bind(this);
  }

  newVideoSelected(videoId) {
    this.props.callbackParent(videoId);
    this.setState({
      clickedVideo: videoId
    });
  }
  
  render() {
    return (
      <div className="video-list">
        <div><h5><VideoListEntry video={this.props.videos[0]} callbackParent={this.newVideoSelected}/></h5></div>
        <div><h5><VideoListEntry video={this.props.videos[1]} callbackParent={this.newVideoSelected}/></h5></div>
        <div><h5><VideoListEntry video={this.props.videos[2]} callbackParent={this.newVideoSelected}/></h5></div>
        <div><h5><VideoListEntry video={this.props.videos[3]} callbackParent={this.newVideoSelected}/></h5></div>
        <div><h5><VideoListEntry video={this.props.videos[4]} callbackParent={this.newVideoSelected}/></h5></div>
      </div>
    );
  }


}

// PropTypes tell other developers what `this.props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoList.propTypes = {
  videos: React.PropTypes.array.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
window.VideoList = VideoList;

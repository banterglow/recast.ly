class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.newVideoSelected = this.newVideoSelected.bind(this);
  }

  newVideoSelected(videoId) {
    this.props.callbackParent(videoId);
  }
  
  render() {
    return (
      <div className="video-list">
        {this.props.videos.map(newVideo => {
          // using map requires that you assign a unique key to each child. Added key, but still getting error.
          return <div><h5> <VideoListEntry key={newVideo.id.videoId.toString()} video={newVideo} callbackParent={this.newVideoSelected} /></h5></div>;
        })}
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

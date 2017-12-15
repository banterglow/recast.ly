class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    // this.getVideoDetails = this.getVideoDetails.bind(this);
    // this.getChannelIcon = this.getChannelIcon.bind(this);
    // this.property = {};
  }

  // componentWillMount() {
  //   this.getVideoDetails(this.props.video.id.videoId);
  //   this.getChannelIcon(this.props.video.snippet.channelId);
  // }

  // getChannelIcon(creatorId) {
  //   console.log(creatorId);
  //   let outerThis = this;
  //   return $.ajax({
  //     url: 'https://www.googleapis.com/youtube/v3/channels',
  //     data: {
  //       part: 'snippet',
  //       key: window.YOUTUBE_API_KEY,
  //       id: creatorId,
  //     },
  //     success: function (data) {
  //       console.log('first log', data);
  //       outerThis.setState({
  //         creatorIcon: data.items[0].snippet.thumbnails.default.url
  //       });
  //     }
  //   });
  // }

  // getVideoDetails(videoId) {
  //   let outerThis = this;
  //   return $.ajax({
  //     url: 'https://www.googleapis.com/youtube/v3/videos',
  //     data: {
  //       part: 'statistics, snippet',
  //       key: window.YOUTUBE_API_KEY,
  //       id: videoId,
  //     },
  //     success: function (data) {
  //       outerThis.property.channel = data.items[0].snippet.channelTitle;
  //       outerThis.property.channelId = data.items[0].snippet.channelId;
  //       outerThis.property.views = data.items[0].statistics.viewCount;
  //       outerThis.property.likes = data.items[0].statistics.likeCount;
  //       outerThis.property.dislikes = data.items[0].statistics.dislikeCount;
  //       outerThis.property.datePosted = moment(data.items[0].snippet.publishedAt).format('MMMM Do YYYY');
  //     }
  //   });
  // }

  render() {
    // bug where video may load before the async ajax call for details is completed
    // first load does not include details
    // this.getVideoDetails(this.props.video.currentVideo.id.videoId);
    return (
      <div className="video-player">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${this.props.video.currentVideo.id.videoId}`} allowFullScreen></iframe>
        </div>
        <div className="video-player-details container-fluid">
          <h3>{this.props.video.currentVideo.snippet.title}</h3>
          {/* <img className = "creatorIcon" src={this.state.creatorIcon} /> */}
          <p className="channel"> <strong>{this.props.video.channel}</strong></p>
          <div className="featured-video-caption">{this.props.video.currentVideo.snippet.description}</div>
          <div className="row">
            <div className="statistics col-sm-4"> <strong>Date Posted: </strong>{this.props.video.datePosted}</div>
            <div className="statistics col-sm-6"> <strong>Views:</strong> {new Intl.NumberFormat().format(this.props.video.views)} </div>
            <div className="like-number statistics col-sm-4"> <strong><img className = "likes" src="../../media/like.png" alt="like" /></strong> {new Intl.NumberFormat().format(this.props.video.likes)}</div>
            <div className="like-number statistics col-sm-6"> <strong><img className = "likes" src="../../media/dislike.png" alt="dislike" /></strong> {new Intl.NumberFormat().format(this.props.video.dislikes)}</div>
          </div>
        </div>
      </div>
    );
  }

}

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoPlayer.propTypes = {
  video: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.VideoPlayer = VideoPlayer;

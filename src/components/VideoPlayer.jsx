class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.getVideoDetails = this.getVideoDetails.bind(this);
    this.state = {
      channel: null,
      views: null,
      likes: null,
      dislikes: null,
      datePosted: null,
      creatorId: null,
      creatorIcon: null
    };
  }

  getVideoDetails(videoId) {
    let outerThis = this;
    return $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/videos',
      data: {
        part: 'statistics, snippet',
        key: window.YOUTUBE_API_KEY,
        id: videoId,
      },
      success: function (data) {
        outerThis.setState({
          channel: data.items[0].snippet.channelTitle,
          views: data.items[0].statistics.viewCount,
          likes: data.items[0].statistics.likeCount,
          dislikes: data.items[0].statistics.dislikeCount,
          datePosted: moment(data.items[0].snippet.publishedAt).format('MMMM Do YYYY')
        });
      }
    });

    // getCreatorIcon(creatorId) {
    //   let outerThis = this;
    //   return $.ajax({
    //     url: 'https://www.googleapis.com/youtube/v3/videos',
    //     data: {
    //       part: 'statistics, snippet',
    //       key: window.YOUTUBE_API_KEY,
    //       id: videoId,
    //     },
    //     success: function (data) {
    //       outerThis.setState({
    //         channel: data.items[0].snippet.channelTitle,
    //         views: data.items[0].statistics.viewCount,
    //         likes: data.items[0].statistics.likeCount,
    //         dislikes: data.items[0].statistics.dislikeCount,
    //         datePosted: moment(data.items[0].snippet.publishedAt).format('MMMM Do YYYY')
    //       });
    //     }
    //   });

  }

  render() {
    // issue. this uses setState to force the video details to load on page open. 
    // this then causes an endless loop of calling the function -> setState -> render -> function
    this.getVideoDetails(this.props.video.id.videoId);
    return (
      <div className="video-player">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${this.props.video.id.videoId}`} allowFullScreen></iframe>
        </div>
        <div className="video-player-details container-fluid">
          <h3>{this.props.video.snippet.title}</h3>
          <p className="channel"> <strong>{this.state.channel}</strong></p>
          <div className="featured-video-caption">{this.props.video.snippet.description}</div>
          <div className="row">
            <div className="statistics col-sm-4"> <strong>Date Posted: </strong>{this.state.datePosted}</div>
            <div className="statistics col-sm-6"> <strong>Views:</strong> {new Intl.NumberFormat().format(this.state.views)} </div>
            <div className="like-number statistics col-sm-4"> <strong><img className = "likes" src="../../media/like.png" alt="like" /></strong> {new Intl.NumberFormat().format(this.state.likes)}</div>
            <div className="like-number statistics col-sm-6"> <strong><img className = "likes" src="../../media/dislike.png" alt="dislike" /></strong> {new Intl.NumberFormat().format(this.state.dislikes)}</div>
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

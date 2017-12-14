class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchSubmit = this.searchSubmit.bind(this);
  }



  searchSubmit(e) {
    let query = $('.form-control').val();
    let outerThis = this;
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
        part: 'snippet',
        key: window.YOUTUBE_API_KEY,
        q: query,
        maxResults: 5,
        type: 'video',
        videoEmbeddable: 'true'
      },
      success: function (data) {
        outerThis.props.callbackParent(data);
      }
    });

  }

  render() {
    return (
      <div className="search-bar form-inline">
        <input className="form-control" type="text" onKeyUp={this.searchSubmit}/>
        <button className="btn hidden-sm-down" onClick={this.searchSubmit}>
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div> 
    );
  }
}


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;

var DownloadForm = React.createClass({
  getInitialState() {
    return {
      inputUrl: 'https://soundcloud.com/dj-macattack/deadmau5-ghosts-n-stuff-feat-1'
    };
  },
  handleInputChange(event) {
    this.setState({inputUrl: event.target.value});
  },
  downloadSong() {
    var fs = require('fs');
    var path = require('path');
    var youtubedl = require('youtube-dl');

    var song = youtubedl(this.state.inputUrl,
      // Optional arguments passed to youtube-dl.
      ["--extract-audio", "--audio-format", "mp3", "--audio-quality", "0"],
      // Additional options can be given for calling `child_process.execFile()`.
      { cwd: __dirname });

    // Will be called when the download starts.
    song.on('info', function(info) {
      console.log('Download started');
      console.log('filename: ' + info._filename);
      console.log('size: ' + info.size);

      fs.mkdir('downloads', function (err) {
        var filePath = path.join('downloads', info._filename);

        song.pipe(fs.createWriteStream(filePath));
      });

    });

    song.on('end', function () {
      alert('Finished downloading!');
    });
  },
  render: function() {
    return (
      <div className="downloadForm">
        <h2 className="form-download-heading">
          Download a song
        </h2>
        <input type="text" className="form-control"
          value={this.state.inputUrl}
          onChange={this.handleInputChange}
          required/>
        <button className="btn btn-lg btn-primary btn-block"
          onClick={this.downloadSong}>Download</button>
      </div>
    );
  }
});

ReactDOM.render(
  <DownloadForm />,
  document.getElementById('main-thing')
);

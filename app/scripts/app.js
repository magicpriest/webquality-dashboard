'use strict';

var React = require('react');
var Firebase = require('firebase');
var ShowStatus = require('../../elements/showStatus');
var ShowScore = require('../../elements/showScore');
var config = require('../../config');
var sites = config.SITES;
var fbUrl = config.FIREBASE_URL + config.FIREBASE_DB;

var App = React.createClass({
  getInitialState: function() {
    return {data:{}};
  },
  componentWillMount: function() {
    this.firebaseRef = new Firebase(fbUrl);
    this.firebaseRef.on("value", function(dataSnapshot) {
      var data = dataSnapshot.val();
      this.setState({
        data: data
      });
    }.bind(this));
  },
  render: function(){
    var self = this;
    return (
      <div>
        <table>
          <thead>
          <tr>
            <th className="explain">Site/Page</th>
            <th className="explain">Valid html</th>
            <th className="explain">Accessibilty</th>
            <th className="explain">Speed desktop</th>
            <th className="explain">Speed mobile</th>
            <th className="explain">UX mobile</th>
            <th className="explain">Score</th>
          </tr>
          </thead>
          <tbody>

            {sites.map(function(site){
              return (
                <tr>
                <td className="explain"><a href={site.url} target="_blank">{site.name}</a></td>
                <ShowStatus data={self.state.data} services={config.SERVICE_URLS} filter="html" instance={site.id} url={site.url}></ShowStatus>
                <ShowStatus data={self.state.data} services={config.SERVICE_URLS} filter="wcag" instance={site.id} url={site.url}></ShowStatus>
                <ShowStatus data={self.state.data} services={config.SERVICE_URLS} filter="desktopSpeed" instance={site.id} url={site.url}></ShowStatus>
                <ShowStatus data={self.state.data} services={config.SERVICE_URLS} filter="mobileSpeed" instance={site.id} url={site.url}></ShowStatus>
                <ShowStatus data={self.state.data} services={config.SERVICE_URLS} filter="mobileUX" instance={site.id} url={site.url}></ShowStatus>
                <ShowScore data={self.state.data} instance={site.id}></ShowScore>
                </tr>
              );
            })}
          </tbody>
        </table>
  </div>
  );
  }
});

React.render(
  <App />,
  document.getElementById('app')
);
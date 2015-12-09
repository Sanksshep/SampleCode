var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var baseLink = 'https://glaring-inferno-9320.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      things: {},
      loaded: false
    }
  },
  componentWillMount: function() {
    this.fireBase = new Firebase(baseLink + 'things/');
    this.bindAsObject(this.fireBase, 'things');
    this.fireBase.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          Things To Do
        </h2>
        <Header thingsStore={this.firebaseRefs.things} />
        <hr />
        <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
          <List things={this.state.things} />
          {this.deleteIcon()}
        </div>
      </div>
    </div>
  },
  deleteIcon: function() {
    if(!this.state.loaded) {
      return
    } else {
      return <div className="text-center clear-complete">
        <hr />
        <button
          type="button"
          onClick={this.afterDeleteDoneClick}
          className="btn btn-default">
          Delete 
        </button>
      </div>
    }
  },
  afterDeleteDoneClick: function() {
    for(var key in this.state.things) {
      if(this.state.things[key].done === true) {
        this.fireBase.child(key).remove();
      }
    }
  },
  handleDataLoaded: function(){
    this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));

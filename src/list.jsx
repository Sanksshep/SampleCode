var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
  render: function() {
    return <div>
      {this.renderList()}
    </div>
  },
  renderList: function() {
    if(!this.props.things) {
      return <h4>
        Add a thing you would like to do.
      </h4>
    } else {
      var children = [];

      for(var key in this.props.things) {
        var item = this.props.things[key];
        item.key = key;

        children.push(
          <ListItem
            item={item}
            key={key}
            >
          </ListItem>
        )
      }

      return children;
    }
  }
});

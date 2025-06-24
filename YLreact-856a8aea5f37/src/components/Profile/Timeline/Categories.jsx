import React from 'react';
class PostCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
    this.select = this.select.bind(this);
  }
  select() {
    const selected = this.state.selected;
    this.props.select(parseInt(this.props.id));
    this.setState({ selected: !selected });
  }
  render() {
    const active = this.state.selected ? 'selected' : '';
    return (
      <span className={`post-category-item ${active}`} onClick={this.select}>
        {this.props.name}
      </span>
    );
  }
}

export default class Categories extends React.Component {
  render() {
    return (
      <div>
        {this.props.categories.map((category, index) => {
          return (
            <PostCategory
              select={this.props.selecting}
              name={category.name}
              id={category.category_id}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}

import React from 'react';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { category } from '../../../redux/actions/actions';

import Spinner from '../../Common/Spinner/Spinner.jsx';
import Error from '../../Common/Error/Error';
import { ErrorMessages } from '../../../constants';

class Category extends React.Component {
  render() {
    const img = {
      height: '2.5em',
      width: '2.5em',
      //objectFit: 'cover',
      //borderRadius: '50%'
    };

    const bt = {
      borderTop: '1px solid whitesmoke',
    };

    return (
      <div
        className="py-1 col-lg-12 col-sm-12 col-12"
        onClick={() =>
          browserHistory.push(
            '/categories/' +
              this.props.category.category_id +
              '/' +
              this.props.category.name,
          )
        }
        style={{ cursor: 'pointer' }}
      >
        <div className="media">
          <img
            className="align-self-center mr-3"
            src={process.env.PUBLIC_URL + this.props.category.image}
            alt="Category"
            style={img}
          />
          <div className="media-body" style={bt}>
            {/*<h5 className="mt-0">Center-aligned media</h5>*/}
            <p className="mt-3">
              <b>{this.props.category.name}</b>
              <span
                className="float-right ion-ios-arrow-right"
                style={{ color: 'whitesmoke' }}
              ></span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class Categories extends React.Component {
  componentDidMount() {
    //this.props.category(2);
  }

  render() {
    const categories = this.props.categories.map(function(category, i) {
      return <Category key={i} category={category} name={'Art'} />;
    });

    return (
      <div className="row">
        {categories}
        {/*<Category name={'Art'} />
                <Category name={'Blogging and Writing'} />
                <Category name={'Fashion and Design'} />
                <Category name={'Video and Photocategoryy'} />
                <Category name={'Poetry'} />
                <Category name={'Music'} />
                <Category name={'Beauty and Fitness'} />
                <Category name={'Cullinary and Restaurants'} */}
      </div>
    );
  }
}

class CategoryComponent extends React.Component {
  componentDidMount() {
    this.props.category(4);
  }

  render() {
    const {
      categories,
      isCategoryPending,
      isCategorySuccess,
      categoryError,
      categoryFailure,
    } = this.props;

    return (
      <div className="row">
        <div
          className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 mb-3"
          style={{ margin: '0 auto', float: 'none' }}
        >
          {isCategoryPending && <Spinner />}
          {isCategorySuccess && <Categories categories={categories} />}
          {categoryError && (
            <Error message={ErrorMessages.generalErrorMessage} />
          )}
          {categoryFailure && <Error message={ErrorMessages.connectionError} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.category,
    isCategoryPending: state.category.isCategoryPending,
    isCategorySuccess: state.category.isCategorySuccess,
    categoryError: state.category.categoryError,
    categoryFailure: state.category.categoryFailure,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //reset: () => dispatch(reset()),
    category: id => dispatch(category(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryComponent);

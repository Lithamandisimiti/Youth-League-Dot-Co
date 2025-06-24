import React from 'react';
import { connect } from 'react-redux';
import { search, follow } from '../../../redux/actions/actions';

import Spinner from '../../Common/Spinner/Spinner.jsx';
import { Users } from '../../Common/User/User.jsx';

class PeopleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.params.term,
    };
  }

  componentDidMount() {
    this.state.search !== null && this.props.search(2, this.state.search);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.params.term !== this.state.search) {
      this.setState(
        {
          search: nextProps.params.term,
        },
        function() {
          this.props.search(4, this.state.search);
        },
      );
    }
  }

  render() {
    const {
      data,
      isSearchPending,
      isSearchSuccess,
      searchError,
      searchFailure,
    } = this.props;

    return (
      <div className="row">
        <div
          className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 mb-3"
          style={{ margin: '0 auto', float: 'none' }}
        >
          {isSearchPending && <Spinner />}
          {isSearchSuccess && <Users users={data} follow={this.props.follow} />}
          {searchError && (
            <div className="text-center">
              <span>{searchError.message}</span>
            </div>
          )}
          {searchFailure && (
            <span className="text-center">{searchFailure.message}</span>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.search.search,
    isSearchPending: state.search.isSearchPending,
    isSearchSuccess: state.search.isSearchSuccess,
    searchError: state.search.searchError,
    searchFailure: state.search.searchFailure,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //reset: () => dispatch(reset()),
    search: (id, term) => dispatch(search(id, term)),
    follow: (id, isFollow) => dispatch(follow(id, isFollow)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeopleComponent);

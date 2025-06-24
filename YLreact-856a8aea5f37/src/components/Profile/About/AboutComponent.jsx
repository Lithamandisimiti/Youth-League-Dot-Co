import React from 'react';
import { connect } from 'react-redux';

//import { Users } from '../../Common/User/User.jsx';
import Spinner from '../../Common/Spinner/Spinner.jsx';
//import CategoryComponent from '../../Search/Category/CategoryComponent.jsx';
import BasicInfo from './Components/BasicInfo';
import WorkInfo from './Components/WorkInfo';
import Skills from './Components/Skills';

import { profile } from '../../../redux/actions/actions';

class AboutComponent extends React.Component {
    constructor(props) {
        super(props);
        const { username, id} = this.props.params;
        
        this.state = {
            username,
            id,
        }
    }
    
    render() {
        let { data, isProfilePending, isProfileSuccess } = this.props;

        return (
            <div>
                {isProfilePending && <div className="mt-3"><Spinner /></div>}
                {isProfileSuccess && (
                    <div className="row">
                        <div className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 py-0" 
                            style={{margin: '0 auto', float: 'none'}} 
                        >
                            <BasicInfo />
                            <WorkInfo />
                            <Skills />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.profile.profile,
        isProfilePending: state.profile.isProfilePending,
        isProfileSuccess: state.profile.isProfileSuccess,
        profileError: state.profile.profileError,
        profileFailure: state.profile.profileFailure
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        //reset: () => dispatch(reset()),
        profile: (id) => dispatch(profile(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutComponent);
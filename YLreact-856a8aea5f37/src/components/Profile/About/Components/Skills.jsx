import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { category } from '../../../../redux/actions/actions';

import Spinner from '../../../Common/Spinner/Spinner.jsx';
import { TextButton } from '../../../Common/Button';


const PUBLIC_URL = process.env.PUBLIC_URL;
const img = {
    height: '2.5em',
    width: '2.5em',
}

const Skill = (props) => (
    <div className="py-1 col-lg-3 col-lg-3 col-sm-4 col-6">
        <div className="text-center" >
            <img className="align-self-center" 
                src={PUBLIC_URL + props.skill.image} 
                alt="" 
                style={img} 
            />
            <p>{props.skill.name}</p>
        </div>
    </div>
);

class SkillsComponent extends React.Component {
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
        
        const skillList = categories || [];
        const skills = skillList.map((skill, i) => <Skill key={i} skill={skill} name={'Art'} />);

        return(
            <div className="row" >
                <div className="col-12 px-0 py-0 p-sm-1 p-md-2 gallery-tile-p" 
                    style={{padding: '0.05rem'}}
                >
                    <div className="p-2 pt-0">
                        <span><b>Skills</b></span>  
                        <span className="float float-right">
                            <TextButton text="Edit" />
                        </span>
                    </div>
                </div>
                <div className="col-12" style={{margin: '0 auto', float: 'none'}} >
                    {isCategoryPending && <Spinner />}
                    {isCategorySuccess && (
                        <div className="row">
                            {skills}
                        </div>
                    )}
                    {categoryError && <div>{categoryError.message}</div>}
                    {categoryFailure && <div>{categoryFailure.message}</div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.category.category,
        isCategoryPending: state.category.isCategoryPending,
        isCategorySuccess: state.category.isCategorySuccess,
        categoryError: state.category.categoryError,
        categoryFailure: state.category.categoryFailure
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        //reset: () => dispatch(reset()),
        category: (id) => dispatch(category(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillsComponent);
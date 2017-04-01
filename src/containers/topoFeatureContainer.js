import { connect } from 'react-redux';
import { showProvinceResult, hideProvinceResult } from '../actions';
import TopoFeature from '../components/topoFeature';

const mapStateToProps = (state, ownProps) => {
    return { selected: state.provinceResultVisible == ownProps.index, projection: ownProps.projection, feature: ownProps.feature }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMouseEnter: () => {
            dispatch(showProvinceResult(ownProps.index));
        },
        onMouseLeave: () => {
            dispatch(hideProvinceResult(ownProps.index));
        }
    }
};

const TopoFeatureContainer = connect(mapStateToProps, mapDispatchToProps)(TopoFeature);

export default TopoFeatureContainer;
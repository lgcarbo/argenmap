import { connect } from 'react-redux';
import ProvinceResults from '../components/provinceResults';

const mapStateToProps = (state, ownProps) => {
    return { visible: state.provinceResultVisible == ownProps.index, x: ownProps.x, y: ownProps.y, province: ownProps.province, votes: ownProps.votes }
};

const mapDispatchToProps = null;

const ProvinceResultsContainer = connect(mapStateToProps, mapDispatchToProps)(ProvinceResults);

export default ProvinceResultsContainer;
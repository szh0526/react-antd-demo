import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Footer from '../components/Footer'

const mapStateToProps = (state, ownProps) => ({
  filter: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilterChange: (filter) => {
    dispatch(setVisibilityFilter(filter));
  }
})

const FooterFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)

export default FooterFilter
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Snackbar from "material-ui/Snackbar";

class SubmitFormStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
    };
  }

  render() {
    const { form } = this.props;
    return (
      <Snackbar
        open={form.displaySnackbar}
        message="Success"
        autoHideDuration={this.state.autoHideDuration}
      />
    );
  }
}
SubmitFormStatus.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    form: state.submit_form,
  };
};

export default connect(mapStateToProps)(SubmitFormStatus);

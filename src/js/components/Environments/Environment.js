import React, { Component } from "react"
import { Card } from "../common/Card"
import { connect } from "react-redux"
import { DeleteElementForm, ToolButtons } from "../common/"
import { /*displayModal,*/ deleteElement } from "../../actionCreators/common"
import { validAuthorization } from "../../utils/"
import EnvironmentClusters from "./EnvironmentClusters"
import { fetchEnvironment } from "../../actionCreators/environment"
import { styles } from "../../commonStyles/commonInlineStyles"

export class Environment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displaySubmitForm: false,
      displayDeleteForm: false,
      editMode: false,
    }
  }

  toggleComponentDisplay(component) {
    this.setState({ [component]: !this.state[component] })
  }

  handleDelete(id, form, comment, component) {
    const { dispatch } = this.props

    this.toggleComponentDisplay("displayDeleteForm")

    dispatch(deleteElement(id, "environment"))
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    const envName = match.params.environment
    dispatch(fetchEnvironment(envName))
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, match } = this.props
    const envName = match.params.environment

    this.setState({
      comment: "",
    })
    if (Object.keys(nextProps.environment).length > 0) {
      this.setState({ adgroups: nextProps.environment.accesscontrol.adgroups })
    }
    if (nextProps.match.params.environment != envName) {
      dispatch(fetchEnvironment(nextProps.name))
    }
  }

  render() {
    const { environment, user, dispatch, resourceModalVisible } = this.props

    const { comment, editMode } = this.state
    const envName = environment.name
    const envClass = environment.environmentclass
    let lifecycle = {}

    let authorized = false
    if (Object.keys(environment).length > 0) {
      authorized = validAuthorization(user, environment.accesscontrol)
      lifecycle = environment.lifecycle
    }

    return (
      <div>
        <div className="col-md-6" style={styles.cardPadding}>
          <Card
            title={`${envName ? envName.toUpperCase() : ""}`}
            subtitle={`Environment class: ${envClass}`}
          >
            <ToolButtons
              disabled={!authorized || resourceModalVisible}
              onDeleteClick={() =>
                this.toggleComponentDisplay("displayDeleteForm")
              }
            />
          </Card>
        </div>
        <div className="col-xs-12">
          <EnvironmentClusters environment={envName} />
        </div>
        <DeleteElementForm
          displayDeleteForm={this.state.displayDeleteForm}
          onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
          onSubmit={() => this.handleDelete(envName)}
          id={envName}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    environment: state.environment_fasit.data,
    environmentClasses: state.environments.environmentClasses,
    resourceModalVisible: state.resources.showNewResourceForm,
  }
}

export default connect(mapStateToProps)(Environment)

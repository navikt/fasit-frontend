import React from "react"
import { shallow } from "enzyme"
import { expect } from "chai"
import sinon from "sinon"
import { Modal } from "react-bootstrap"
import {
  FormComment,
  FormString,
} from "../../../../src/js/components/common/Forms"
import { NewApplicationForm } from "../../../../src/js/components/Applications/NewApplicationForm"

describe("(Component) NewApplicationForm", () => {
  it('renders "NewApplicationForm" without exploding', () => {
    const wrapper = shallow(<NewApplicationForm {...props} />)
    expect(wrapper).to.have.length(1)
  })

  it("sets initial state", () => {
    const wrapper = shallow(<NewApplicationForm {...props} />)
    expect(wrapper.state().name).to.equal("")
    expect(wrapper.state().artifactid).to.equal("")
    expect(wrapper.state().groupid).to.equal("")
    expect(wrapper.state().portoffset).to.equal("0")
    expect(wrapper.state().comment).to.equal("")
  })

  it('(function) "handleChange" sets new state', () => {
    const wrapper = shallow(<NewApplicationForm {...props} />)
    wrapper.instance().handleChange("a", "b")
    expect(wrapper.state().a).to.equal("b")
  })

  it('(function) "handleSubmitForm" dispatches action based on props.mode copy', () => {
    const dispatch = sinon.spy(() => {})
    const wrapper = shallow(
      <NewApplicationForm {...props} dispatch={dispatch} />
    )
    wrapper.setState({
      name: "1",
      artifactid: "2",
      groupid: "3",
      portoffset: "4",
      comment: "5",
    })
    wrapper.instance().handleSubmitForm()
    expect(dispatch.callCount).to.equal(1)
    expect(dispatch.args[0][0].type).to.equal("SUBMIT_FORM")
    expect(dispatch.args[0][0].form.name).to.equal("1")
    expect(dispatch.args[0][0].form.artifactid).to.equal("2")
    expect(dispatch.args[0][0].form.groupid).to.equal("3")
    expect(dispatch.args[0][0].form.portoffset).to.equal("4")
    expect(dispatch.args[0][0].comment).to.equal("5")
    expect(dispatch.args[0][0].component).to.equal("newApplication")
  })

  it('(function) "showSubmitButton" disables submit button if incomplete form data', () => {
    const wrapper = shallow(<NewApplicationForm {...props} />)
    expect(wrapper.find("button").nodes[1].props.className).to.equal(
      "btn btn-primary pull-right disabled"
    )
    wrapper.setState({
      name: "1",
      artifactid: "2",
      groupid: "3",
      portoffset: "4",
    })
    expect(wrapper.find("button").nodes[1].props.className).to.equal(
      "btn btn-primary pull-right"
    )
  })

  it('renders "Modal" if showNewApplicationForm = true', () => {
    const wrapper = shallow(<NewApplicationForm {...props} />)
    expect(wrapper.find(Modal)).to.have.length(1)
    expect(wrapper.find(Modal).props().show).to.equal(true)
  })

  it('(button) should call function "closeForm" when clicked', () => {
    const dispatch = sinon.spy(() => {})
    let wrapper = shallow(<NewApplicationForm {...props} dispatch={dispatch} />)
    wrapper.find("#resetBtn").simulate("click")
    expect(dispatch.args[0][0].type).to.equal("SHOW_NEW_APPLICATION_FORM")
    expect(dispatch.args[0][0].value).to.equal(false)
  })

  it('renders "FormString" correctly with props', () => {
    const wrapper = shallow(<NewApplicationForm {...props} />)
    expect(wrapper.find(FormString)).to.have.length(4)
    expect(wrapper.find('[label="name"]')).to.have.length(1)
    expect(
      wrapper.find('[label="name"]').props().handleChange
    ).to.be.instanceof(Function)
    wrapper.setState({ name: "mikke mus" })
    expect(wrapper.find('[label="name"]').props().value).to.equal("mikke mus")
  })

  it('renders "FormComment" correctly with props', () => {
    const wrapper = shallow(<NewApplicationForm {...props} />)
    expect(wrapper.find(FormComment)).to.have.length(1)
    expect(wrapper.find(FormComment).props().handleChange).to.be.instanceof(
      Function
    )
    wrapper.setState({ comment: "mikke mus was here" })
    expect(wrapper.find(FormComment).props().value).to.equal(
      "mikke mus was here"
    )
  })
})

const props = {
  showNewApplicationForm: true,
  application: {
    name: "a-inntekt",
    groupid: "no.nav",
    artifactid: "a-inntekt-config",
    portoffset: 0,
    id: 618258,
    revision: 618260,
    created: "2014-10-07T13:23:21.972",
    updated: "2014-10-07T13:24:01.43",
    lifecycle: {},
    accesscontrol: {
      environmentclass: "t",
      adgroups: [],
    },
    links: {
      instances:
        "https://e34jbsl01655.devillo.no:8443/api/v2/applicationinstances?application=a-inntekt",
      self:
        "https://e34jbsl01655.devillo.no:8443/api/v2/applications/a-inntekt",
      revisions:
        "https://e34jbsl01655.devillo.no:8443/api/v2/applications/a-inntekt/revisions",
    },
  },
}

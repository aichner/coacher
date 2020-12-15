//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> Additional
// Time management
import "moment/locale/de";

//> Redux
// Allows React components to read data, update data and dispatch actions
// from/to a Redux store.
import { connect } from "react-redux";

//> Actions
// Functions to send data from the application to the store
import { createContact } from "../../../store/actions/authActions";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBAlert,
  MDBFormInline,
  MDBInput,
  MDBRangeInput,
  MDBSpinner,
  MDBProgress,
} from "mdbreact";
//#endregion

//#region > Config
const AVAILABLE_SKILLS = [
  {
    label: "3D Modelling",
    value: "dmodelling",
    type: "3d",
  },
  {
    label: "Interior design",
    value: "dinterior",
    type: "3d",
  },
  {
    label: "Exterior design",
    value: "dexterior",
    type: "3d",
  },
  {
    label: "Postproduction",
    value: "postproduction",
    type: "video",
  },
  {
    label: "Film shooting",
    value: "videoproduction",
    type: "video",
  },
  {
    label: "VFX (Visual Effects)",
    value: "vfx",
    type: "video",
  },
  {
    label: "CGI (Computer Generated Imagery)",
    value: "cgi",
    type: "video",
  },
  {
    label: "Film planning",
    value: "filmplanning",
    type: "video",
  },
  {
    label: "Graphics design",
    value: "graphicsdesign",
    type: "design",
  },
  {
    label: "Vector art",
    value: "vector",
    type: "design",
  },
  {
    label: "Social media posts",
    value: "smposts",
    type: "design",
  },
  {
    label: "Sales (calls, email)",
    value: "sales",
    type: "sales",
  },
  {
    label: "Affiliate",
    value: "affiliate",
    type: "sales",
  },
  {
    label: "Web backend",
    value: "webbackend",
    type: "web",
  },
  {
    label: "Web frontend",
    value: "webfrontend",
    type: "web",
  },
  {
    label: "Wordpress",
    value: "webwordpress",
    type: "web",
  },
];
//#endregion

//#region > Components
class CreateContact extends React.Component {
  state = { company: "", zip: "", city: "", address: "" };

  submitForm = async (e) => {
    e.preventDefault();

    e.target.className += " was-validated";

    this.setState({
      loading: true,
    });

    if (this.state.first_name && this.state.last_name && this.state.email) {
      const res = await this.props.createContact(this.state);

      if (res) {
        this.setState(
          {
            loading: false,
            error: false,
          },
          () => {
            this.props.toggle();
            this.props.refetch();
          }
        );
      } else {
        this.setState({
          loading: false,
          error: true,
        });
      }
    }
  };

  render() {
    const { profile } = this.props;

    return (
      <MDBModal
        isOpen={true}
        toggle={this.props.toggle}
        size={this.state.loading ? "sm" : "lg"}
        centered
        animation="left"
      >
        <MDBModalBody className="py-4">
          {this.state.loading ? (
            <MDBSpinner />
          ) : (
            <>
              <div>
                <p className="font-weight-bold lead mb-0">
                  Create human ressource
                </p>
                <p className="text-muted small">
                  What skills does this person hold and how can he/she
                  contribute to our efforts?
                </p>
              </div>
              {this.state.error && this.state.error.code === 0 && (
                <MDBAlert color="danger" className="mt-2">
                  {this.state.error.msg}
                </MDBAlert>
              )}
              <form
                onSubmit={this.submitForm}
                className="text-left needs-validation"
                method="POST"
                noValidate
              >
                <div className="my-4">
                  <MDBRow className="mb-2">
                    <MDBCol lg="4">
                      <p className="mb-0">Firstname</p>
                      <input
                        type="text"
                        name="firstname"
                        className="form-control"
                        value={this.state.first_name}
                        onChange={(e) =>
                          this.setState({ first_name: e.target.value })
                        }
                        required
                      />
                    </MDBCol>
                    <MDBCol lg="4">
                      <p className="mb-0">Lastname</p>
                      <input
                        type="text"
                        name="lastname"
                        className="form-control"
                        value={this.state.last_name}
                        onChange={(e) =>
                          this.setState({ last_name: e.target.value })
                        }
                        required
                      />
                    </MDBCol>
                    <MDBCol lg="4">
                      <p className="mb-0">
                        Company{" "}
                        <small className="text-muted">(if applicable)</small>
                      </p>
                      <input
                        type="text"
                        name="company"
                        className="form-control"
                        value={this.state.company}
                        onChange={(e) =>
                          this.setState({ company: e.target.value })
                        }
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mt-2">
                    <MDBCol lg="4">
                      <p className="mb-0">E-Mail</p>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                        required
                      />
                    </MDBCol>
                    <MDBCol lg="4">
                      <p className="mb-0">Phone</p>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={this.state.phone}
                        onChange={(e) =>
                          this.setState({ phone: e.target.value })
                        }
                      />
                    </MDBCol>
                    <MDBCol lg="4">
                      <p className="mb-0">City</p>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={this.state.city}
                        onChange={(e) =>
                          this.setState({ city: e.target.value })
                        }
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mt-2">
                    <MDBCol lg="4">
                      <p className="mb-0">Current job</p>
                      <input
                        type="text"
                        name="status"
                        className="form-control"
                        value={this.state.status}
                        onChange={(e) =>
                          this.setState({ status: e.target.value })
                        }
                      />
                    </MDBCol>
                    <MDBCol lg="4">
                      <p className="mb-0">
                        Time available p.w.{" "}
                        <small className="text-muted">(max 140h)</small>
                      </p>
                      <input
                        type="text"
                        name="time"
                        className="form-control"
                        value={this.state.time}
                        onChange={(e) =>
                          this.setState({ time: e.target.value })
                        }
                      />
                    </MDBCol>
                    <MDBCol lg="4">
                      <p className="mb-0">
                        Average cost per hour{" "}
                        <small className="text-muted">(in €)</small>
                      </p>
                      <input
                        type="text"
                        name="cost"
                        className="form-control"
                        value={this.state.cost}
                        onChange={(e) =>
                          this.setState({ cost: e.target.value })
                        }
                      />
                    </MDBCol>
                  </MDBRow>
                  <p className="mb-0 mt-3">Base trust value</p>
                  <p className="small mb-0 text-muted">
                    Based on previous experience, how much trust do you put into
                    this person? (Default: 50)
                  </p>
                  <MDBRangeInput
                    min={0}
                    max={100}
                    value={this.state.trust}
                    getValue={(value) => this.setState({ trust: value })}
                  />
                  <p className="mb-0 mt-3">Base leadership type</p>
                  <p className="small mb-2 text-muted">
                    In what leadership form is the person most productive?
                  </p>
                  <div>
                    <MDBFormInline>
                      <MDBInput
                        label="Autocratic"
                        filled
                        type="checkbox"
                        id="autocratic"
                        onChange={() =>
                          this.setState({
                            autocratic: this.state.autocratic
                              ? !this.state.autocratic
                              : true,
                          })
                        }
                        checked={this.state.autocratic}
                        containerClass="mr-5"
                      />
                      <MDBInput
                        label="Democratic"
                        filled
                        type="checkbox"
                        id="democratic"
                        onChange={() =>
                          this.setState({
                            democratic: this.state.democratic
                              ? !this.state.democratic
                              : true,
                          })
                        }
                        checked={this.state.democratic}
                        containerClass="mr-5"
                      />
                      <MDBInput
                        label="Transformational"
                        filled
                        type="checkbox"
                        id="transformational"
                        onChange={() =>
                          this.setState({
                            transformational: this.state.transformational
                              ? !this.state.transformational
                              : true,
                          })
                        }
                        checked={this.state.transformational}
                        containerClass="mr-5"
                      />
                      <MDBInput
                        label="Laissez-faire"
                        filled
                        type="checkbox"
                        id="laissezfaire"
                        onChange={() =>
                          this.setState({
                            laissezfaire: this.state.laissezfaire
                              ? !this.state.laissezfaire
                              : true,
                          })
                        }
                        checked={this.state.laissezfaire}
                        containerClass="mr-5"
                      />
                    </MDBFormInline>
                  </div>
                  <p className="lead mt-3">Skills</p>
                  <div>
                    <MDBRow>
                      <MDBCol lg="4">
                        <p className="font-weight-bold mb-1">3D</p>
                        {AVAILABLE_SKILLS.filter(
                          (tmp) => tmp.type === "3d"
                        ).map((skill, s) => {
                          return (
                            <MDBInput
                              key={s}
                              label={skill.label}
                              filled
                              type="checkbox"
                              id={skill.value}
                              onChange={() =>
                                this.setState({
                                  [skill.value]: this.state[skill.value]
                                    ? !this.state[skill.value]
                                    : true,
                                })
                              }
                              checked={this.state[skill.value]}
                              containerClass="mr-5"
                            />
                          );
                        })}
                      </MDBCol>
                      <MDBCol lg="4">
                        <p className="font-weight-bold mb-1">Video</p>
                        {AVAILABLE_SKILLS.filter(
                          (tmp) => tmp.type === "video"
                        ).map((skill, s) => {
                          return (
                            <MDBInput
                              key={s}
                              label={skill.label}
                              filled
                              type="checkbox"
                              id={skill.value}
                              onChange={() =>
                                this.setState({
                                  [skill.value]: this.state[skill.value]
                                    ? !this.state[skill.value]
                                    : true,
                                })
                              }
                              checked={this.state[skill.value]}
                              containerClass="mr-5"
                            />
                          );
                        })}
                      </MDBCol>
                      <MDBCol lg="4">
                        <p className="font-weight-bold mb-1">Graphics</p>
                        {AVAILABLE_SKILLS.filter(
                          (tmp) => tmp.type === "design"
                        ).map((skill, s) => {
                          return (
                            <MDBInput
                              key={s}
                              label={skill.label}
                              filled
                              type="checkbox"
                              id={skill.value}
                              onChange={() =>
                                this.setState({
                                  [skill.value]: this.state[skill.value]
                                    ? !this.state[skill.value]
                                    : true,
                                })
                              }
                              checked={this.state[skill.value]}
                              containerClass="mr-5"
                            />
                          );
                        })}
                      </MDBCol>
                      <MDBCol lg="4" className="mt-3">
                        <p className="font-weight-bold mb-1">Sales</p>
                        {AVAILABLE_SKILLS.filter(
                          (tmp) => tmp.type === "sales"
                        ).map((skill, s) => {
                          return (
                            <MDBInput
                              key={s}
                              label={skill.label}
                              filled
                              type="checkbox"
                              id={skill.value}
                              onChange={() =>
                                this.setState({
                                  [skill.value]: this.state[skill.value]
                                    ? !this.state[skill.value]
                                    : true,
                                })
                              }
                              checked={this.state[skill.value]}
                              containerClass="mr-5"
                            />
                          );
                        })}
                      </MDBCol>
                      <MDBCol lg="4" className="mt-3">
                        <p className="font-weight-bold mb-1">Web</p>
                        {AVAILABLE_SKILLS.filter(
                          (tmp) => tmp.type === "web"
                        ).map((skill, s) => {
                          return (
                            <MDBInput
                              key={s}
                              label={skill.label}
                              filled
                              type="checkbox"
                              id={skill.value}
                              onChange={() =>
                                this.setState({
                                  [skill.value]: this.state[skill.value]
                                    ? !this.state[skill.value]
                                    : true,
                                })
                              }
                              checked={this.state[skill.value]}
                              containerClass="mr-5"
                            />
                          );
                        })}
                      </MDBCol>
                    </MDBRow>
                    <MDBFormInline></MDBFormInline>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <MDBBtn
                    color="blue"
                    size="md"
                    type="submit"
                    rounded
                    disabled={this.state.loading}
                  >
                    <MDBIcon icon="check-circle" />
                    add ressource
                  </MDBBtn>
                  <MDBBtn color="trans" onClick={this.props.toggle}>
                    Later
                  </MDBBtn>
                </div>
              </form>
            </>
          )}
        </MDBModalBody>
      </MDBModal>
    );
  }
}

//#endregion
//#region > Redux Mapping
const mapDispatchToProps = (dispatch) => {
  return {
    createContact: (contact) => dispatch(createContact(contact)),
  };
};
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default connect(null, mapDispatchToProps)(CreateContact);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */

//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Redirect, withRouter } from "react-router-dom";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import { signOut, getContacts } from "../../../store/actions/authActions";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
} from "mdbreact";

//> Components
import { CreateContact } from "../../molecules";

//> CSS
// To be added here

//> Images
// To be added here
//#endregion

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

//#region > Components
class ProfilePage extends React.Component {
  state = { search: "", activeTab: 0, createContact: false };

  componentDidMount = async () => {
    const res = await this.props.getContacts();

    this.setState({
      users: res,
    });
  };

  render() {
    const { auth, profile } = this.props;
    // Check if firebase has loaded profile data
    if (!profile.isLoaded) {
      return (
        <MDBContainer className="flex-center my-5 py-5">
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </MDBContainer>
      );
    } else {
      // Check if logged in
      if (auth.uid === undefined) return <Redirect to="/" />;

      return (
        <MDBContainer className="text-center my-5 py-5">
          <MDBRow>
            <MDBCol lg="3" className="text-left">
              <div>
                <MDBBtn
                  rounded
                  color="blue"
                  onClick={() => this.setState({ createContact: true })}
                >
                  <MDBIcon icon="plus-circle" />
                  Add contact
                </MDBBtn>
              </div>
              <div>
                <MDBInput
                  type="search"
                  className="form-control"
                  label="Search"
                  onChange={(e) => this.setState({ search: e.target.value })}
                  value={this.state.search}
                  outline
                />
              </div>
              <MDBListGroup className="menu my-4">
                <MDBListGroupItem
                  className={this.state.activeTab === 0 ? "active" : undefined}
                  onClick={() => this.setState({ activeTab: 0 })}
                >
                  <MDBIcon icon="id-card" />
                  Contacts
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={this.state.activeTab === 1 ? "active" : undefined}
                  onClick={() => this.setState({ activeTab: 1 })}
                >
                  <MDBIcon far icon="clock" />
                  Frequently
                </MDBListGroupItem>
                <hr />
                <MDBListGroupItem
                  className={this.state.activeTab === 2 ? "active" : undefined}
                  onClick={() => this.setState({ activeTab: 2 })}
                >
                  <MDBIcon icon="cube" />
                  3D
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={this.state.activeTab === 3 ? "active" : undefined}
                  onClick={() => this.setState({ activeTab: 3 })}
                >
                  <MDBIcon icon="film" />
                  Video
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={this.state.activeTab === 4 ? "active" : undefined}
                  onClick={() => this.setState({ activeTab: 4 })}
                >
                  <MDBIcon icon="pen-nib" />
                  Graphics
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={this.state.activeTab === 5 ? "active" : undefined}
                  onClick={() => this.setState({ activeTab: 5 })}
                >
                  <MDBIcon icon="headset" />
                  Sales / Affiliate
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={this.state.activeTab === 6 ? "active" : undefined}
                  onClick={() => this.setState({ activeTab: 6 })}
                >
                  <MDBIcon icon="server" />
                  Web Backend
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={this.state.activeTab === 7 ? "active" : undefined}
                  onClick={() => this.setState({ activeTab: 7 })}
                >
                  <MDBIcon icon="desktop" />
                  Web Frontend
                </MDBListGroupItem>
              </MDBListGroup>
              <div>
                <MDBBtn color="white" onClick={this.props.signOut}>
                  Sign out
                </MDBBtn>
              </div>
            </MDBCol>
            <MDBCol lg="9">
              <MDBListGroup>
                <MDBListGroupItem className="font-weight-bold">
                  <MDBRow className="flex-center">
                    <MDBCol className="text-left">
                      <p>Name</p>
                    </MDBCol>
                    <MDBCol className="text-left">
                      <p>Contact</p>
                    </MDBCol>
                    <MDBCol className="text-right">
                      <p>Labels</p>
                    </MDBCol>
                  </MDBRow>
                </MDBListGroupItem>
                {this.state.users &&
                  this.state.users.map((user, u) => {
                    const data = user.data;

                    return (
                      <MDBListGroupItem>
                        <MDBRow className="flex-center">
                          <MDBCol className="text-left" lg="3">
                            <p className="font-weight-bolder">
                              {data.first_name} {data.last_name}
                            </p>
                            {data.insight?.currentJob && (
                              <p className="small blue-text">
                                {data.insight.currentJob}
                              </p>
                            )}
                            {data.company && (
                              <p className="small text-muted">{data.company}</p>
                            )}
                          </MDBCol>
                          <MDBCol className="text-left" lg="6">
                            <p className="mb-0">
                              {data.contact && (
                                <a href={"mailto:" + data.contact.email}>
                                  {data.contact.email}
                                </a>
                              )}
                            </p>
                            <p>
                              {data.contact && (
                                <a href={"tel:" + data.contact.phone}>
                                  {data.contact.phone}
                                </a>
                              )}
                            </p>
                          </MDBCol>
                          <MDBCol className="text-right" lg="3">
                            {data.skills &&
                              Object.keys(data.skills).map((skill) => {
                                if (data.skills[skill]) {
                                  console.log(skill);
                                  return (
                                    <MDBBadge color="primary" className="m-1">
                                      {
                                        AVAILABLE_SKILLS.filter(
                                          (s) => s.value === skill
                                        )[0]?.label
                                      }
                                    </MDBBadge>
                                  );
                                }
                              })}
                          </MDBCol>
                        </MDBRow>
                      </MDBListGroupItem>
                    );
                  })}
              </MDBListGroup>
            </MDBCol>
          </MDBRow>
          {this.state.createContact && (
            <CreateContact
              toggle={() =>
                this.setState({
                  createContact: !this.state.createContact,
                })
              }
            />
          )}
        </MDBContainer>
      );
    }
  }
}
//#endregion

//#region > Functions
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    getContacts: () => dispatch(getContacts()),
  };
};
//#endregion

//#region > Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfilePage));
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */

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

//#region > Functions
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const trustA = a.data.insight.trust;
  const trustB = b.data.insight.trust;

  let comparison = 0;

  if (trustA < trustB) {
    comparison = 1;
  } else if (trustA > trustB) {
    comparison = -1;
  }

  return comparison;
}
//#endregion

//#region > Components
class ProfilePage extends React.Component {
  state = { search: "", activeTab: "all", createContact: false };

  componentDidMount = () => {
    this.init();
  };

  init = async () => {
    const res = await this.props.getContacts();

    this.setState({
      users: res,
      allUsers: res,
    });
  };

  calculateTrust = (trust) => {
    console.log(trust);

    switch (true) {
      case trust < 25 && trust >= 0:
        return (
          <p className="text-danger">
            <MDBIcon icon="angle-double-down" /> {trust}
          </p>
        );
      case trust < 50:
        return (
          <p className="text-warning">
            <MDBIcon icon="angle-down" /> {trust}
          </p>
        );
      case trust >= 50 && trust < 80:
        return (
          <p className="text-info">
            <MDBIcon icon="angle-up" /> {trust}
          </p>
        );
      case trust >= 80:
        return (
          <p className="text-success">
            <MDBIcon icon="angle-double-up" /> {trust}
          </p>
        );
      default:
        return (
          <p className="text-warning">
            <MDBIcon icon="slash" /> NULL
          </p>
        );
    }
  };

  cleanString = (str) => {
    return str.split(" ").join("").trim().toLowerCase();
  };

  search = (value) => {
    const users = this.state.allUsers;
    let res = undefined;

    if (value && users) {
      res = users.filter(
        (user) =>
          (user.data.first_name &&
            this.cleanString(user.data.first_name).includes(
              this.cleanString(value)
            )) ||
          (user.data.last_name &&
            this.cleanString(user.data.last_name).includes(
              this.cleanString(value)
            )) ||
          (user.data.contact.email &&
            this.cleanString(user.data.contact.email).includes(
              this.cleanString(value)
            )) ||
          (user.data.contact.phone &&
            this.cleanString(user.data.contact.phone).includes(
              this.cleanString(value)
            )) ||
          (user.data.company &&
            this.cleanString(user.data.company).includes(
              this.cleanString(value)
            ))
      );
    }

    this.setState({
      search: value,
      users: value ? res : this.state.allUsers,
    });
  };

  changeSelection = (selection) => {
    let users = this.state.allUsers;
    const select = AVAILABLE_SKILLS.filter(
      (skill) => skill.type === selection
    )[0];

    if (select) {
      users = users.filter((user) => user.data.skills[select.value] === true);
    }

    this.setState({
      activeTab: selection,
      users,
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
                  onChange={(e) => this.search(e.target.value)}
                  value={this.state.search}
                  outline
                />
              </div>
              <MDBListGroup className="menu my-4">
                <MDBListGroupItem
                  className={
                    this.state.activeTab === "all" ? "active" : undefined
                  }
                  onClick={() => this.changeSelection("all")}
                >
                  <MDBIcon icon="id-card" />
                  Contacts
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={
                    this.state.activeTab === "freq" ? "active" : undefined
                  }
                  onClick={() => this.changeSelection("freq")}
                >
                  <MDBIcon far icon="clock" />
                  Frequently
                </MDBListGroupItem>
                <hr />
                <MDBListGroupItem
                  className={
                    this.state.activeTab === "3d" ? "active" : undefined
                  }
                  onClick={() => this.changeSelection("3d")}
                >
                  <MDBIcon icon="cube" />
                  3D
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={
                    this.state.activeTab === "video" ? "active" : undefined
                  }
                  onClick={() => this.changeSelection("video")}
                >
                  <MDBIcon icon="film" />
                  Video
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={
                    this.state.activeTab === "design" ? "active" : undefined
                  }
                  onClick={() => this.changeSelection("design")}
                >
                  <MDBIcon icon="pen-nib" />
                  Graphics
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={
                    this.state.activeTab === "sales" ? "active" : undefined
                  }
                  onClick={() => this.changeSelection("sales")}
                >
                  <MDBIcon icon="headset" />
                  Sales / Affiliate
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={
                    this.state.activeTab === "web" ? "active" : undefined
                  }
                  onClick={() => this.changeSelection("web")}
                >
                  <MDBIcon icon="server" />
                  Web
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
                    <MDBCol className="text-right">
                      <p>Ranking</p>
                    </MDBCol>
                  </MDBRow>
                </MDBListGroupItem>
                {this.state.users &&
                  this.state.users.sort(compare).map((user, u) => {
                    const data = user.data;

                    return (
                      <MDBListGroupItem>
                        <MDBRow className="flex-center">
                          <MDBCol className="text-left" lg="3">
                            <p className="font-weight-bolder">
                              {data.first_name} {data.last_name}
                            </p>
                            {data.company && (
                              <p className="small text-muted font-weight-bold">
                                {data.company}
                              </p>
                            )}
                            {data.insight?.currentJob && (
                              <p className="small blue-text">
                                {data.insight.currentJob}
                              </p>
                            )}
                          </MDBCol>
                          <MDBCol className="text-left" lg="5">
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
                          <MDBCol className="text-left" lg="3">
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
                          <MDBCol className="text-right" lg="1">
                            {data.insight && (
                              <>{this.calculateTrust(data.insight.trust)}</>
                            )}
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
              refetch={this.init}
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

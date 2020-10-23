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
import { signOut } from "../../../store/actions/authActions";

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
} from "mdbreact";

//> Components
import { CreateContact } from "../../molecules";

//> CSS
// To be added here

//> Images
// To be added here
//#endregion

//#region > Components
class ProfilePage extends React.Component {
  state = { search: "", activeTab: 0, createContact: false };

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
                <MDBListGroupItem>
                  <MDBRow className="flex-center">
                    <MDBCol className="text-left">
                      <p>Test</p>
                    </MDBCol>
                    <MDBCol>
                      <p>Test</p>
                    </MDBCol>
                    <MDBCol className="text-right">
                      <p>Test</p>
                    </MDBCol>
                  </MDBRow>
                </MDBListGroupItem>
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

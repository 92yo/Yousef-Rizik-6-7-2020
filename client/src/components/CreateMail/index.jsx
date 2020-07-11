import React, { Component } from "react";
import * as mailActions from "../../store/actions/mail";
import { connect } from "react-redux";
import Loader from "../Loader";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import "./style.css";

class CreateMail extends Component {
  state = {
    createMail: false,
  };

  handleForm = (event) => {
    event.preventDefault();

    const mail = {
      receiver: this.state.receiver,
      sender: this.state.sender,
      subject: this.state.subject,
      body: this.state.body,
    };
    this.props.handleForm({ mail });
  };

  handleReceiver = (event) => {
    this.setState({
      receiver: event.target.value,
    });
  };

  // Testing Purposes - CHANGE IT
  handleSender = (event) => {
    this.setState({
      sender: event.target.value,
    });
  };

  handleSubject = (event) => {
    this.setState({
      subject: event.target.value,
    });
  };

  handleBody = (event) => {
    this.setState({
      body: event.target.value,
    });
  };

  createMailHandler = () => {
    this.setState((prevState) => {
      return {
        createMail: !prevState.createMail,
      };
    });
  };
  render() {
    let content;
    let errorMessageArr;

    if (this.props.loading) {
      content = <Loader />;
    } else if (this.props.error) {
      errorMessageArr = this.props.errorMessageArr;
    } else if (this.props.mailSent) {
      content = <Alert severity="success">Mail sent successfully!</Alert>;
    }
    content = (
      <form onSubmit={this.handleForm} className="createMailForm">
        <div className="formControl">
          <TextField
            id="sender"
            label="Sender"
            type="text"
            name="sender"
            placeholder="Username of sender"
            onChange={this.handleSender}
          />
        </div>
        <div className="formControl">
          <TextField
            id="receiver"
            label="Receiver"
            type="text"
            name="receiver"
            placeholder="Username of receiver"
            onChange={this.handleReceiver}
          />
        </div>
        <div className="formControl">
          <TextField
            label="Subject"
            type="text"
            name="subject"
            placeholder="Subject"
            id="subject"
            onChange={this.handleSubject}
          />
        </div>
        <div className="formControl">
          <TextField
            id="body"
            name="body"
            label="Body of the Mail"
            multiline
            rows={6}
            onChange={this.handleBody}
          />
        </div>
        <button className="createMailSendBtn">
          <SendIcon />
        </button>
        {errorMessageArr ? (
          <Alert severity="error">{errorMessageArr}</Alert>
        ) : (
          ""
        )}
      </form>
    );
    return (
      <>
        <div className="createMailContainer" onClick={this.createMailHandler}>
          <button className="createMailCreateBtn">
            <AddIcon
              className={`${
                this.state.createMail ? "createMailCreateBtn--close" : ""
              }`}
            />
          </button>
        </div>
        <div
          className={`createMailFormContainer ${
            this.state.createMail
              ? "formContainer--visible"
              : "formContainer--hidden"
          }`}
        >
          {content}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.mail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleForm: (mailObj) => dispatch(mailActions.mailInit(mailObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMail);

import React, {Component} from 'react';
import{Button, ButtonToolbar, Modal, FormControl, Alert} from 'react-bootstrap';

class DeleteBiz extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false,
      password: "",
      message: undefined,
      messageFail: undefined,
      disabled: false
    };
  }
  
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { password } = this.state;  
    const business_id = event.target.businessId.value;
    this.setState({disabled: "disabled"});

    const deleteBiz = response => {
      if (response.hasOwnProperty('message') && response.message === "Business deleted successfully"){
        this.handleHide();
        window.location.assign('/dashboard')
        // this.props.history.push('/dashboard');
      }
      else if (response.hasOwnProperty('msg')){
        this.handleHide();
        this.props.history.push({
            pathname: '/login',
            state: {
                'success': "Please log in to continue",
            }
        });
      }
      else{
        this.setState ({
          message: response.hasOwnProperty('message') && response['message'],
          messageFail: response.hasOwnProperty('password-error') && response['password-error'],
          disabled: false
      });
      }
    }

    await fetch('https://wc-app-api.herokuapp.com/api/v1/businesses/'+ business_id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.loggedIn()
          },
          body: JSON.stringify(
          {
            "password": password
          }
      )
      })
      .then((resp) => resp.json())
      .then(deleteBiz);
    }

    handleShow() {
      this.setState({ show: true });
    }
  
    handleHide() {
      this.setState({ show: false });
    }
  
    loggedIn() {
      // Checks if there is a saved token
      const token = localStorage.getItem('wcToken');
      if (token === null) {
        this.props.history.push({
          pathname: '/login',
          state: {
            'success': "Please log in to continue",
          }
        });
        } else{
            return token;
        }
    }

  render() {
  return (
    <tbody>
      <tr>
        <td> {this.props.name}</td>
        <td> {this.props.location}</td>
        <td>
          <ButtonToolbar>
            <Button 
              bsStyle="link"
              onClick={() => this.props.history.push('/businesses/'+ this.props.id)}
            >view
            </Button>
            <Button bsStyle="link"
                    onClick={() => this.props.history.push({
                                      pathname:'/businesses/update/'+ this.props.id,
                                      state: {
                                        'name': this.props.name,
                                        'desc': this.props.desc,
                                        'loc': this.props.location,
                                        'cat': this.props.category
                                      }
                                    })
                                  }
            >edit</Button>
            <Button bsStyle="link" onClick={this.handleShow}>delete</Button>
            <Modal
              {...this.props}
              show={this.state.show}
              onHide={this.handleHide}
              dialogClassName="custom-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">
                  Enter your password to delete the selected business
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.state.message && 
                (
                  <Alert bsStyle="danger">
                    <strong>{this.state.message}</strong>
                  </Alert>
                )}
                {this.state.messageFail && 
                (
                  <Alert bsStyle="danger">
                    <strong>{this.state.messageFail}</strong>
                  </Alert>
                )}
                <form onSubmit={this.handleSubmit}>
                  <FormControl
                    type="password"
                    name="password"
                    label="Text"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <FormControl
                    name="businessId"
                    type="hidden"
                    value={this.props.id}
                    readOnly
                  />
                  <br />
                  <Button onClick={this.handleHide}>Close</Button>
                  {this.state.disabled ?
                    <Button type="submit" bsStyle="primary" disabled>Deleting...</Button>
                  : <Button type="submit" bsStyle="primary">Delete</Button>}
                </form>
              </Modal.Body>
              <Modal.Footer />
            </Modal>
          </ButtonToolbar>
        </td>
      </tr>
    </tbody>
  );  
}}

export default DeleteBiz;
import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends React.Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg });
            }else {
                this.setState({msg: null});
            }
        }
        if(this.state.modal) {
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    // onChange = (e) => {
    //     this.setState({
    //         name: e.target.value
    //         email: e.target.value
    //         pa
    //     });
    //     // this.setState([e.target.name]);
    // }

    handleChangeName = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        //user objek
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        // alert(`${newUser.name},${newUser.email},${newUser.password}`);
        this.props.register(newUser);

        // matiin modal
        // this.toggle();
    }
    
    render() {
        return (
            <div>
                <NavLink
                    onClick={this.toggle} href="#"
                >
                    Register
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                        
                    >
                        Register
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null }
                        <Form 
                            onSubmit={this.onSubmit}
                        >
                            <FormGroup>
                                <Label
                                    for="name"
                                >
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="name"
                                    style={{marginBottom: '1.5rem'}}
                                    onChange={this.handleChangeName}
                                />
                                <Label
                                    for="email"
                                >
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    style={{marginBottom: '1.5rem'}}
                                    onChange={this.handleChangeEmail}
                                />
                                <Label
                                    for="password"
                                >
                                    Password
                                </Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    style={{marginBottom: '1.5rem'}}
                                    onChange={this.handleChangePassword}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps, 
    { register, clearErrors }
)(RegisterModal);
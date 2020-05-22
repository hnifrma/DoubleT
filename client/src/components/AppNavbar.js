import React, { Fragment } from 'react';
import  {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    //NavItem,
    NavLink,
    Container,
    NavItem
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class AppNavbar extends React.Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
                <span className="navbar-text mr-3">
                    <strong>
                        {
                            user ? `Welcome ${user.name}`: ''
                        }
                    </strong>
                </span>
                <Logout />
            </Fragment>
        );
        const guestLinks = (
            <Fragment>
                <RegisterModal />
                <LoginModal />
            </Fragment>
        );
        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">
                            Double T
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {
                                    isAuthenticated ? authLinks : guestLinks
                                }
                                <NavLink href="https://github.com/hnifrma/DoubleT">
                                        Github Repo
                                </NavLink>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
)(AppNavbar);
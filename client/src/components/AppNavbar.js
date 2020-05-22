import React from 'react';
import  {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    //NavItem,
    NavLink,
    Container
} from 'reactstrap';

export default class AppNavbar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
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
                                <NavLink href="https://github.com/hnifrma">
                                    Github
                                </NavLink>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
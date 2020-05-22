import React from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemList extends React.Component {
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         items: [
    //             { id: uuidv4(), name: 'Eggs'},
    //             { id: uuidv4(), name: 'Milk'},
    //             { id: uuidv4(), name: 'Steak'},
    //             { id: uuidv4(), name: 'Water'}
    //         ]
    //     };

    // }   
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup 
                        className="item-list"
                    >
                        {items.map(({_id, name}) => (
                            <CSSTransition 
                                key={_id} 
                                timeout={500} 
                                classNames="fade"
                            >
                                <ListGroupItem>
                                    {
                                        this.props.isAuthenticated ?
                                        (<Button 
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this,_id)}
                                        >
                                            &times;
                                        </Button>) :
                                        (null)
                                    }
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
                {/* {this.state.items.map(item => (
                    console.log(item)
                ))} */}
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ getItems, deleteItem })(ItemList);
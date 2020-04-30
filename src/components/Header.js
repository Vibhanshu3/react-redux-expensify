import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth.js';

const Header = (props) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Expensify</h1>
                </Link>
                {/* <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink> */}
                {/* <NavLink to="/help" activeClassName="is-active">Help Page</NavLink> */}
                <button onClick={props.startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => (
    {
        startLogout: () => dispatch(startLogout())
    }
);

export default connect(undefined, mapDispatchToProps)(Header);
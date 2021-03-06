import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import { checkLoggedInStatus } from "../functions/userFunctions";

import NavBar from "./utils/mainNav";
import Footer from "./utils/footer";

import Home from "./pages/home";
import SignIn from "./pages/forms/signIn";
import SignUp from "./pages/forms/signUp";
import Results from "./search/queryResults";
import BookDetail from "./pages/bookDetail";
import Search from "./search/search";
import Account from "./pages/account/account";
import BookForm from "./pages/forms/bookForm";
import NoMatch from "./pages/noMatch";
import Icons from "./utils/icons";

class App extends Component {
	constructor() {
		super();

		Icons();
	}

	componentDidMount() {
		checkLoggedInStatus(this.props.logged_in, this.props.setUserInfo);
	}

	render() {
		return (
			<div className="app">
				<NavBar />
				<div className="content">
					<Switch>
						<Route path="/account" component={Account} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
						<Route path="/search/:search" component={Search} />
						<Route path="/detail/:id" component={BookDetail} />
						{this.props.user_role == "admin" ? (
							<Route path="/book/create" component={BookForm} />
						) : (
							""
						)}
						<Route path="/" exact component={Home} />
						<Route component={NoMatch} />
					</Switch>
				</div>
				{this.props.logged_in ? <Footer /> : null}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { id, user_role, logged_in } = state.user;
	return { id, user_role, logged_in };
}

App = withRouter(connect(mapStateToProps, actions)(App));

export default App;

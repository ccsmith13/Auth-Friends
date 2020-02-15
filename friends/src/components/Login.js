import React from 'react';
import { axiosWithAuth } from '../utilities/axiosWithAuth';

class Login extends React.Component {
    state = {
        credentials: {
            username: "",
            password: ""
        }
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    }

    login = e => {
        e.preventDefault();
        axiosWithAuth()
            .post("/login", this.state.credentials)
            .then(res => {
                localStorage.setItem("token", res.data.payload);
                this.props.history.push("/friends");
            })
            .catch(err => {
                localStorage.removeItem("token");
                console.log("invalid login: ", err);
            });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <input
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <button>Log In</button>
                </form>
                <button onClick={localStorage.clear}>Log Out</button>
            </div>
        )
    }
}

export default Login;
import React from 'react';
import { axiosWithAuth } from '../utilities/axiosWithAuth';

class AddFriends extends React.Component {
    state = {
        friends: [],
        newFriend: {
            id: 0,
            name: "",
            age: 0,
            email: ""
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axiosWithAuth()
            .get("/friends")
            .then(res => {
                //console.log('getData function in Friends component results', res)
                this.setState({
                    friends: res.data
                })
            })
            .catch(err => {
                console.log('error occurred getting friends data', err)
            })
    }

    updateNewFriendID = () => {
        this.setState({
            newFriend: {
                ...this.state.newFriend,
                id: this.state.friends.length + 1
            }
        })

    }

    addFriend = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('/friends', this.state.newFriend)
            .then(res => console.log('post result', res))
            .catch(err => console.log('error in post request', err))

        this.setState(
            {
                newFriend: {
                    id: 0,
                    name: "",
                    age: 0,
                    email: ""
                }
            })
    }

    handleChange = e => {
        this.setState({
            newFriend: {
                ...this.state.newFriend,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.addFriend}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.newFriend.name}
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={this.state.newFriend.age}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.newFriend.email}
                    onChange={this.handleChange}
                />

                <button onClick={this.updateNewFriendID}>Add Friend</button>
            </form>
        )
    };
}

export default AddFriends;
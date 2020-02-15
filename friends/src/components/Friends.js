import React from 'react';
/* import moment from 'moment';
import Loader from 'react-loader-spinner'; */
import { axiosWithAuth } from '../utilities/axiosWithAuth';

class Friends extends React.Component {
    state = {
        friends: []
    };

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

    render() {
        let friendsList = this.state.friends;
        return (
            friendsList.map(f => {
                return (
                    <div key={f.id}>
                        <p>Name: {f.name}</p>
                        <p>Age: {f.age}</p>
                        <p>Email: {f.email}</p>
                    </div>
                )

            })
        )
    }
}

export default Friends;
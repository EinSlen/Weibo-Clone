import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import { fetchUser } from './redux/actions/index'
import { StyleSheet } from 'react-native'

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        const { currentUser } = this.props;
        if(currentUser==undefined){
            return(
                <View></View>
            )
        }
        console.log(currentUser)
        return (
            <View style={styles.view}>
                <Text>{currentUser.name} connected</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
});
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch); 

export default connect(mapStateToProps, mapDispatchProps)(Main);

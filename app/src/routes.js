import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { Login, Main } from './screens'

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })
)

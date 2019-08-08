import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { Login, Main } from './pages'

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })
)

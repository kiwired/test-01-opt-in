import { Link } from 'react-router-dom'
import { Text } from '../components'

export const SettingsRoute = () => {
	return (
		<>
			<Text as={'h1'} variant={'h1'}>
				Settings page
			</Text>
			<Link to={'/settings'}>
				back to home
			</Link>
		</>
	)
}
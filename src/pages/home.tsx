import { Link } from 'react-router-dom'
import { Text } from '../components'

export const HomeRoute = () => {
	return (
		<>
			<Text as={'h1'} variant={'h1'}>
				Home Page
			</Text>
			<Link to={'/settings'}>
				go to settings
			</Link>
		</>
	)
}
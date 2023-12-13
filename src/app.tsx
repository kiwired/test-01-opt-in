import { Route, Routes } from 'react-router-dom'
import { RequireOptIn } from './libs/optIn'

import { Layout } from './layouts/layout'

import { HomeRoute } from './pages/home'
import { OptRoute } from './pages/opt'
import { SettingsRoute } from './pages/settings'

import './app.css'

export const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					
					<Route path='/' element={<HomeRoute />} />

					<Route path='/opt' element={<OptRoute />} />
					
					<Route
						path='/settings'
						element={(
							<RequireOptIn fallback={'/opt'}>
								<SettingsRoute />
							</RequireOptIn>
						)}
						/>

				</Route>
			</Routes>
		</>
	)
}

import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
	return (
		<div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
			<Header />
			<div className="flex-1">
				<Outlet />
			</div>
			<footer className="border-t border-white/10 px-4 py-6 text-center text-xs text-zinc-500">
				PC Parts Demo Store
			</footer>
		</div>
	);
}

export default Layout;

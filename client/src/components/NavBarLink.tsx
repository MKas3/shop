import {Link} from 'react-router-dom';

type NavBarLinkProps = {
	children?: React.ReactNode,
	link?: string,
	isAlt?: boolean,
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function NavBarLink({children, link = '/', isAlt, onClick}: NavBarLinkProps) {
	return (
		<Link onClick={onClick} to={link} className={'py-1 pb-2 px-2 border-2 rounded-lg text-sm hover:text-indigo-500 transition' + (isAlt ? ' bg-gradient-to-br from-indigo-950 to-indigo-900 border-indigo-950' : ' border-transparent')}>{children}</Link>
	);
}

export default NavBarLink;
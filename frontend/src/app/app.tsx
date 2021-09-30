import React, { useEffect, useState, Fragment } from 'react';

import { Login } from '../login/login';
import { Profile } from '../profile/profile';
import { Auth } from '../type';

// import {
// 	Button,
// 	Divider,
// 	Fab,
// 	Drawer,
// 	List,
// 	ListItem,
// } from '@material-ui/core';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../assets/base.scss';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
	fab,
	faFacebook,
	faTwitter,
	faVuejs,
	faReact,
	faHtml5,
	faGoogle,
	faInstagram,
	faPinterest,
	faYoutube,
	faDiscord,
	faSlack,
	faDribbble,
	faGithub
} from '@fortawesome/free-brands-svg-icons';

import {
	far,
	faSquare,
	faLifeRing,
	faCheckCircle,
	faTimesCircle,
	faDotCircle,
	faThumbsUp,
	faComments,
	faFolderOpen,
	faTrashAlt,
	faFileImage,
	faFileArchive,
	faCommentDots,
	faFolder,
	faKeyboard,
	faCalendarAlt,
	faEnvelope,
	faAddressCard,
	faMap,
	faObjectGroup,
	faImages,
	faUser,
	faLightbulb,
	faGem,
	faClock,
	faUserCircle,
	faQuestionCircle,
	faBuilding,
	faBell,
	faFileExcel,
	faFileAudio,
	faFileVideo,
	faFileWord,
	faFilePdf,
	faFileCode,
	faFileAlt,
	faEye,
	faChartBar
} from '@fortawesome/free-regular-svg-icons';

import {
	fas,
	faAngleDoubleRight,
	faAngleDoubleLeft,
	faSmile,
	faHeart,
	faBatteryEmpty,
	faBatteryFull,
	faChevronRight,
	faSitemap,
	faPrint,
	faMapMarkedAlt,
	faTachometerAlt,
	faAlignCenter,
	faExternalLinkAlt,
	faShareSquare,
	faInfoCircle,
	faSync,
	faQuoteRight,
	faStarHalfAlt,
	faShapes,
	faCarBattery,
	faTable,
	faCubes,
	faPager,
	faCameraRetro,
	faBomb,
	faNetworkWired,
	faBusAlt,
	faBirthdayCake,
	faEyeDropper,
	faUnlockAlt,
	faDownload,
	faAward,
	faPlayCircle,
	faReply,
	faUpload,
	faBars,
	faEllipsisV,
	faSave,
	faSlidersH,
	faCaretRight,
	faChevronUp,
	faPlus,
	faLemon,
	faChevronLeft,
	faTimes,
	faChevronDown,
	faFilm,
	faSearch,
	faEllipsisH,
	faCog,
	faArrowsAltH,
	faPlusCircle,
	faAngleRight,
	faAngleUp,
	faAngleLeft,
	faAngleDown,
	faArrowUp,
	faArrowDown,
	faArrowRight,
	faArrowLeft,
	faStar,
	faSignOutAlt,
	faLink
} from '@fortawesome/free-solid-svg-icons';

library.add(
	far,
	faSquare,
	faLifeRing,
	faCheckCircle,
	faTimesCircle,
	faDotCircle,
	faThumbsUp,
	faComments,
	faFolderOpen,
	faTrashAlt,
	faFileImage,
	faFileArchive,
	faCommentDots,
	faFolder,
	faKeyboard,
	faCalendarAlt,
	faEnvelope,
	faAddressCard,
	faMap,
	faObjectGroup,
	faImages,
	faUser,
	faLightbulb,
	faGem,
	faClock,
	faUserCircle,
	faQuestionCircle,
	faBuilding,
	faBell,
	faFileExcel,
	faFileAudio,
	faFileVideo,
	faFileWord,
	faFilePdf,
	faFileCode,
	faFileAlt,
	faEye,
	faChartBar
);

library.add(
	fab,
	faFacebook,
	faTwitter,
	faVuejs,
	faReact,
	faHtml5,
	faGoogle,
	faInstagram,
	faPinterest,
	faYoutube,
	faDiscord,
	faSlack,
	faDribbble,
	faGithub
);

library.add(
	fas,
	faAngleDoubleRight,
	faAngleDoubleLeft,
	faSmile,
	faHeart,
	faBatteryEmpty,
	faBatteryFull,
	faChevronRight,
	faSitemap,
	faPrint,
	faMapMarkedAlt,
	faTachometerAlt,
	faAlignCenter,
	faExternalLinkAlt,
	faShareSquare,
	faInfoCircle,
	faSync,
	faQuoteRight,
	faStarHalfAlt,
	faShapes,
	faCarBattery,
	faTable,
	faCubes,
	faPager,
	faCameraRetro,
	faBomb,
	faNetworkWired,
	faBusAlt,
	faBirthdayCake,
	faEyeDropper,
	faUnlockAlt,
	faDownload,
	faAward,
	faPlayCircle,
	faReply,
	faUpload,
	faBars,
	faEllipsisV,
	faSave,
	faSlidersH,
	faCaretRight,
	faChevronUp,
	faPlus,
	faLemon,
	faChevronLeft,
	faTimes,
	faChevronDown,
	faFilm,
	faSearch,
	faEllipsisH,
	faCog,
	faArrowsAltH,
	faPlusCircle,
	faAngleRight,
	faAngleUp,
	faAngleLeft,
	faAngleDown,
	faArrowUp,
	faArrowDown,
	faArrowRight,
	faArrowLeft,
	faStar,
	faSignOutAlt,
	faLink
);

const LS_KEY = 'login-with-metamask:auth';

interface State {
	auth?: Auth;
}

export const App = (): JSX.Element => {
	const [state, setState] = useState<State>({});

	useEffect(() => {
		// Access token is stored in localstorage
		const ls = window.localStorage.getItem(LS_KEY);
		const auth = ls && JSON.parse(ls);
		setState({ auth });
	}, []);

	const handleLoggedIn = (auth: Auth) => {
		localStorage.setItem(LS_KEY, JSON.stringify(auth));
		setState({ auth });
	};

	const handleLoggedOut = () => {
		localStorage.removeItem(LS_KEY);
		setState({ auth: undefined });
	};

	const { auth } = state;

	return (
		<div className="App">
			<Fragment>
				<div className="header-nav-wrapper header-nav-wrapper-lg bg-night-sky bg-composed-wrapper">
					<div className="bg-composed-img-5 bg-composed-wrapper--image" />
					<div className="bg-composed-wrapper--content text-light">
						<div className="header-nav-logo">
							<div className="nav-logo">
								{/* <a
								href="#/"
								onClick={e => e.preventDefault()}
								title="Carolina React Admin Dashboard with Material-UI PRO">
								<i className="bg-white">
									<img alt="Alexandria Decentralized-File-Upload-and-Sharing" src={projectLogo} />
								</i>
								<span>Alexandria</span>
							</a> */}
							</div>
						</div>
						<div className="header-nav-menu d-none d-lg-block">
							<div className="d-flex justify-content-center">
								<span className="w-100 d-flex justify-content-center pb-0">
									<h1 className="display-3 text-center mb-3 mt-3 font-weight-bold text-white">
										Alexandria
									</h1>
									{/* <p className="font-size-lg text-center mb-0 text-white-50">
										Sua biblioteca de documentos descentralizada
									</p> */}
								</span>
							</div>
						</div>
						<div className="header-nav-actions flex-grow-0 flex-lg-grow-1">
							<span className="d-none d-lg-block"> </span>
						</div>
					</div>
				</div>
			</Fragment>

			<div className="App-intro">
				{auth ? (
					<Profile auth={auth} onLoggedOut={handleLoggedOut} />
				) : (
					<Login onLoggedIn={handleLoggedIn} />
				)}
			</div>
		</div>
	);
};
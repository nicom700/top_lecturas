export default function Icon({icon}) {

    const playIcon = <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 hover:text-white" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 5h12l3 5l-8.5 9.5a0.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5" />
        <path d="M10 12l-2 -2.2l.6 -1" />
    </svg>

    const rankingIcon = <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 hover:text-white" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="9" r="6" />
        <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(-30 12 9)" />
        <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(30 12 9)" />
    </svg>

    const aboutIcon = <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 hover:text-white" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
        <polyline points="11 12 12 12 12 16 13 16" />
    </svg>

    const profileIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 relative top-1">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>

    const icons = {playIcon, rankingIcon, aboutIcon, profileIcon};

    return (
        <>{icons[icon]}</>
    );
}

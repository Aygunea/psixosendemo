import React from 'react'
interface SearchPropTypes {
    className?: string;
}

const GoogleIcon = (props: SearchPropTypes) => {
    return (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8493 11.1H12.6793V13.83H19.1893C18.8593 17.64 15.6893 19.27 12.6893 19.27C8.8593 19.27 5.4993 16.25 5.4993 12C5.4993 7.9 8.6993 4.73 12.6993 4.73C15.7893 4.73 17.5993 6.7 17.5993 6.7L19.4993 4.72C19.4993 4.72 17.0593 2 12.5993 2C6.9193 2 2.5293 6.8 2.5293 12C2.5293 17.05 6.6593 22 12.7493 22C18.0993 22 21.9993 18.33 21.9993 12.91C21.9993 11.76 21.8493 11.1 21.8493 11.1Z" fill="#F5F5F5" />
        </svg>
    )
}

export default GoogleIcon


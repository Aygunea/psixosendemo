import React from 'react'
interface SearchPropTypes {
    className?: string;
}

const EducationIcon = (props: SearchPropTypes) => {
    return (
        <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5391 9.48047C18.8594 10.043 19.0977 10.6289 19.2539 11.2383C19.4102 11.8477 19.4922 12.4766 19.5 13.125V14.332L12 18.0938L4.5 14.332C4.5 13.8633 4.50391 13.4258 4.51172 13.0195C4.51953 12.6133 4.55469 12.2188 4.61719 11.8359C4.67969 11.4531 4.77344 11.0703 4.89844 10.6875C5.02344 10.3047 5.21094 9.90234 5.46094 9.48047L3 8.25V15.1289C3.22656 15.207 3.42969 15.3164 3.60938 15.457C3.78906 15.5977 3.94922 15.7617 4.08984 15.9492C4.23047 16.1367 4.33203 16.3398 4.39453 16.5586C4.45703 16.7773 4.49219 17.0078 4.5 17.25V21H0V17.25C0 17.0156 0.0351562 16.7891 0.105469 16.5703C0.175781 16.3516 0.277344 16.1445 0.410156 15.9492C0.542969 15.7539 0.699219 15.5898 0.878906 15.457C1.05859 15.3242 1.26562 15.2148 1.5 15.1289V7.5L0 6.75L12 0.75L24 6.75L18.5391 9.48047ZM3 17.25C3 17.0469 2.92578 16.8711 2.77734 16.7227C2.62891 16.5742 2.45312 16.5 2.25 16.5C2.04688 16.5 1.87109 16.5742 1.72266 16.7227C1.57422 16.8711 1.5 17.0469 1.5 17.25V19.5H3V17.25ZM3.35156 6.75L12 11.0742L20.6484 6.75L12 2.42578L3.35156 6.75ZM18 13.4062C18 12.8047 17.9414 12.2461 17.8242 11.7305C17.707 11.2148 17.5 10.6875 17.2031 10.1484L12 12.75L6.79688 10.1484C6.53906 10.6016 6.34375 11.0781 6.21094 11.5781C6.07812 12.0781 6.00781 12.5938 6 13.125V13.4062L12 16.4062L18 13.4062Z" fill="#EBEBEB" />
        </svg>
    )
}

export default EducationIcon


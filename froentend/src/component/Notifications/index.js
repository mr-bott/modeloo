import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './notifications.css';
import Loader from '../Loader';
import NoData from "../NoData";

// PrevArrow Component
const PrevArrow = ({ onClick }) => (
    <button className="notifications-custom-prev" onClick={onClick}>{"<"}</button>
);

// NextArrow Component
const NextArrow = ({ onClick }) => (
    <button className="notifications-custom-next" onClick={onClick}>{">"}</button>
);

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const url = process.env.REACT_APP_BACKEND_URL;
                const response = await fetch(`${url}/notifications`);
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();

                // Update with the data from recent_notifications
                setNotifications(data.data);
            } catch (error) {
                setError(`Error fetching data: ${error.message}`);
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: false,
                    nextArrow: false,
                }
            }
        ]
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const renderSlider = (images) => (
        <>
            {images.length > 0 ? (
                <Slider {...settings}>
                    {images.map((notification) => (
                        <div key={notification.id} className="notifications-image-card" onClick={() => navigate('/bigimage', { state: { notification } })}>
                            <h3 className="notifications-image-card-title">{formatDate(notification.posting_date)}</h3>
                            <img src={notification.img} alt={notification.regulation} className="notifications-image-card-img" />
                        </div>
                    ))}
                </Slider>
            ) : (
                <NoData />
            )}
        </>
    );

    return (
        <section className="notifications-all-images-section" id="notifications-all-images-section">
            <h2 className="notifications-section-title">Recent Notifications</h2>
            <div className="notifications-all-images-container">
                {isLoading ? (
                    <div className="loader_container">
                        <Loader />
                    </div>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    renderSlider(notifications)
                )}
            </div>
        </section>
    );
};

export default Notifications;

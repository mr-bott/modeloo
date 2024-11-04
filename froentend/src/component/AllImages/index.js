import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './allimages.css';
import Footer from '../Footer';
import Loader from '../Loader';
import NoData from "../NoData";

// PrevArrow Component
const PrevArrow = ({ onClick }) => (
    <button className="custom-prev" onClick={onClick}>{"<"}</button>
);

// NextArrow Component
const NextArrow = ({ onClick }) => (
    <button className="custom-next" onClick={onClick}>{">"}</button>
);

const AllImages = () => {
    const [mid1Images, setMid1Images] = useState([]);
    const [mid2Images, setMid2Images] = useState([]);
    const [semImages, setSemImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { item } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const url = process.env.REACT_APP_BACKEND_URL;
                const response = await fetch(`${url}/get_paper/${item.code}`);
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();

                // Set images for each type without duplicates
                setMid1Images(data.filter(img => img.Type === 'MID-1').sort((a, b) => new Date(a.Exam_date) - new Date(b.Exam_date)));
                setMid2Images(data.filter(img => img.Type === 'MID-2').sort((a, b) => new Date(a.Exam_date) - new Date(b.Exam_date)));
                setSemImages(data.filter(img => img.Type === 'SEM').sort((a, b) => new Date(a.Exam_date) - new Date(b.Exam_date)));
            } catch (error) {
                setError(`Error fetching data: ${error.message}`); // Display the specific error message
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (item && item.code) { // Check if item and item.code are defined
            fetchData();
        }
    }, [1]); // Add item to the dependency array

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:false,
        autoplaySpeed: 5000,
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

     console.log("mid1",mid1Images)
     console.log("mid2",mid2Images)
     console.log("sem",semImages)
    const renderSlider = (title, images) => (
        <>
            <h2 className="project-category-title">{title}</h2>
            {images.length > 0 ? (
                <Slider {...settings}>
                    {images.map((project) => (
                        <div key={project.id} className="image-card" onClick={() => navigate('/bigimage', { state: { project } })}>
                            <img src={project.img} alt={project.sub_name} className="image-card-img" />
                            <h3 className="image-card-title">{formatDate(project.Exam_date)}</h3>
                        </div>
                    ))}
                </Slider>
            ) : (
                <NoData />
            )}
        </>
    );

    return (
        <>
            <section className="all-images-section" id="all-images-section">
                <h2 className="section-title">Model Papers</h2>
                {/* <span className="section-subtitle">What we have</span> */}
                <div className="all-images-container">
                    {isLoading ? (
                        <div className="loader_container">
                        <Loader/>
                        {/* <p>wait until upload complete...</p> */}
                      </div>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <>
                            {renderSlider("MID-1", mid1Images)}
                            {renderSlider("MID-2", mid2Images)}
                            {renderSlider("SEM", semImages)}
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AllImages;

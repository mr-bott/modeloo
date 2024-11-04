// BranchSubjects.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './branchsubjects.css';
import Footer from '../Footer';
import Loader from "../Loader";
import NoData from '../NoData';

const BranchSubjects = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state?.formData;

    const [gridItems, setGridItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const generateRandomSize = () => {
        const sizes = [
            { gridColumn: 'span 1', gridRow: 'span 1' },
            { gridColumn: 'span 2', gridRow: 'span 1' },
            { gridColumn: 'span 1', gridRow: 'span 2' },
            { gridColumn: 'span 2', gridRow: 'span 2' },
        ];
        return sizes[Math.floor(Math.random() * sizes.length)];
    };

    const fetchSubjects = async (regulation, year, branch) => {
        try {
            setLoading(true);
            const url=process.env.REACT_APP_BACKEND_URL
            const response = await fetch(`${url}/branch?regulation=${regulation}&year=${year}&branch=${branch}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const items = data.rows.map((subject, index) => ({
                id: index + 1,
                size: generateRandomSize(),
                name: subject.sub_name,
                code: subject.sub_code
            }));

            setGridItems(items);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (formData) {
            fetchSubjects(formData.regulation, formData.year, formData.branch);
        }
    }, [formData]);

    const handleClick = (item) => {
        navigate('/allimages', { state: { item } });
    };

    return (
        <>
            <div className="unique-grid-container">
            {loading && <div className="loader_container">
        <Loader/>
        {/* <p>wait until upload complete...</p> */}
      </div>
        
        }
                
                    {gridItems.length > 0 ? (
                        <ul className="unique-grid-list">
                       { gridItems.map((item) => (
                            <li
                                key={item.id}
                                className="unique-grid-item"
                                style={{
                                    gridColumn: item.size.gridColumn,
                                    gridRow: item.size.gridRow,
                                    maxHeight: '50vh',
                                    cursor: "pointer",
                                }}
                                onClick={() => handleClick(item)}
                            >
                                <h1 className="unique-grid-heading">{item.name}</h1>
                                <p className="unique-grid-paragraph">{item.code}</p>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <div className="">
                        <NoData />
                        </div>
                    )}
             
            </div>
            <Footer />
        </>
    );
};

export default BranchSubjects;

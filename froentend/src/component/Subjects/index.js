
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './subjects.css'; 
import Loader from "../Loader";
import NoData from '../NoData';

const Subjects = ({ data }) => {
    const [gridItems, setGridItems] = useState([]);
    const [subjectCount, setSubjectCount] = useState(0); 
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate(); 
    const location = useLocation();
    const { search } = location.state || {};
    const url=process.env.REACT_APP_BACKEND_URL

    const generateRandomSize = () => {
        const sizes = [
            { gridColumn: 'span 1', gridRow: 'span 1' },
            { gridColumn: 'span 2', gridRow: 'span 1' },
            { gridColumn: 'span 1', gridRow: 'span 2' },
            { gridColumn: 'span 2', gridRow: 'span 2' },
        ];
        return sizes[Math.floor(Math.random() * sizes.length)];
    };

    const fetchSearch = async (search) => {
        try {
            const response = await fetch(`${url}/search/${search}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setSubjectCount(data.details.length);

            const items = data.details.map((subject, index) => ({
                id: index + 1,
                size: generateRandomSize(),
                name: subject.sub_name,
                code: subject.sub_code,
            }));

            setGridItems(items);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubjects = async () => {
        try {
            const { regulation, year, branch } = data;
            const response = await fetch(`${url}/relevent?regulation=${regulation}&year=${year}&branch=${branch}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const dataa = await response.json();
            setSubjectCount(dataa.subjects.length);

            const items = dataa.subjects.map((subject, index) => ({
                id: index + 1,
                size: generateRandomSize(),
                name: subject.sub_name,
                code: subject.sub_code,
            }));

            setGridItems(items);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (search === undefined) {
            fetchSubjects();
        } else {
            fetchSearch(search);
        }
    }, [search, data]);

    const handleItemClick = (item) => {
        navigate('/allimages', { state: { item } });
    };

    if (loading) {
        return (
            <div className="loader_container">
            <Loader/>
            {/* <p>wait...</p> */}
          </div>
        );
    }

    return (
        gridItems.length > 0 ? (
            <div className={`subjects-grid-container ${search !== undefined ? 'search' : ''}`}>
                <h2 className='quote_subjects'>Relevant Subjects : {subjectCount}</h2>
                <ul className="subjects-grid-list">
                    {gridItems.map((item) => (
                        <li
                            key={item.id}
                            className="subjects-grid-item" 
                            style={{
                                gridColumn: item.size.gridColumn,
                                gridRow: item.size.gridRow,
                                maxHeight: "100vh",
                                cursor: "pointer",
                            }}
                            onClick={() => handleItemClick(item)}
                        >
                            <h1 className="subjects-grid-heading">{item.name}</h1>
                            <p className="subjects-grid-paragraph">{item.code}</p>
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <NoData />
        )
    );
};

export default Subjects;
